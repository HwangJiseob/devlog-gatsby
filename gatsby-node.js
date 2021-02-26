const path = require(`path`)
const slugify = require('@sindresorhus/slugify');

const { makePostPath } = './src/libs/makePostPath'

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
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
        edges {
          node {
            id
            body
            frontmatter {
              title
              tags
              series
              date(formatString: "MMMM DD, YYYY")
              description
              thumbnail {
                childImageSharp {
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
          previous {
            id
            frontmatter {
              title
              tags
              series
              date(formatString: "MMMM DD, YYYY")
              description
              thumbnail {
                childImageSharp {
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
          next {
            id
            frontmatter {
              title
              tags
              series
              date(formatString: "MMMM DD, YYYY")
              description
              thumbnail {
                childImageSharp {
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const series_set = new Set()
    // const tags_set = new Set()

    // Create blog post pages.
    result.data.allMdx.edges.forEach(edge => {
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      const { series, title, tags } = edge.node.frontmatter

      // tag 추출 로직
      // if(Array.isArray(tags)){
      //   tags.forEach(tag =>{
      //     tags_set.add(tag)
      //   })
      // } else {
      //   tags_set.add(tags)
      // }
      // series 추출 로직
      if(Array.isArray(series)){
        series.forEach( _series =>{
          series_set.add(_series)
        })
      } else {
        series_set.add(series)
      }
      

      const sluggedTitlte = korean.test(title) ? title : slugify(title)
      const sluggedSeries = series ? (korean.test(series) ? series : slugify(series) ) : null
      const path = series ? `posts/${sluggedSeries}/${sluggedTitlte}` : `posts/${sluggedTitlte}`
      // const path = makePostPath(series, title
      createPage({
        // Path for this page — required
        path: path,
        component: layout,
        context: edge
      })
    })

    // 개별 tag 페이지는 제작하지 않습니다.
  })
}