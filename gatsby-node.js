const path = require(`path`)
const slugify = require('@sindresorhus/slugify');

const { makePostPath } = './src/libs/makePostPath'

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  console.log(makePostPath)
  const config = getConfig()
  config.node = {
      fs: 'empty'
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const layout = path.resolve(`src/components/layout/Post.tsx`)
  
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    query loadPagesQuery ($limit: Int!) {
      allMdx(limit: $limit) {
        nodes {
          id
          body
          frontmatter {
            title
            tags
            series
            date
            description
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allMdx.nodes.forEach(node => {
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      const { series, title } = node.frontmatter
      const sluggedTitlte = korean.test(title) ? title : slugify(title)
      const sluggedSeries = series ? (korean.test(series) ? series : slugify(series) ) : null
      const path = series ? `posts/${sluggedSeries}/${sluggedTitlte}` : `posts/${sluggedTitlte}`
      // const path = makePostPath(series, title
      createPage({
        // Path for this page — required
        path: path,
        component: layout,
        context: node
      })
    })
  })
}