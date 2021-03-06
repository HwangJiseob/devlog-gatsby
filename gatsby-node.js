const path = require(`path`)
const slugify = require('@sindresorhus/slugify');

const { makePostPath } = './src/libs/makePostPath'

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig()
  config.node = {
      fs: 'empty'
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const Post = path.resolve(`src/components/layout/Post.tsx`)
  const Series = path.resolve(`src/components/layout/Series.tsx`)
  
  const createPostPages = async () => {
    const result = await graphql(`
    query loadPagesQuery{
      allMdx(sort: {order: DESC, fields: frontmatter___date}) {
        edges {
          node {
            id
            body
            excerpt(pruneLength: 200)
            tableOfContents(maxDepth: 6)
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
  `)

    // Create blog post pages.
    return result.data.allMdx.edges.forEach(edge => {
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      const { series, title, tags } = edge.node.frontmatter

      // const sluggedTitlte = korean.test(title) ? title : slugify(title)

      const sluggedTitlte = title.split('').map(letter => {
        if(korean.test(letter)){
          return letter
        } else if(letter === " ") {
          return "-"
        } else {
          return slugify(letter)
        }
      }).join('')

      // const sluggedSeries = series ? (korean.test(series) ? series : slugify(series) ) : null

      const sluggedSeries = series ? series.split('').map(letter => {
        if(korean.test(letter)){
          return letter
        } else if(letter === " ") {
          return "-"
        } else {
          return slugify(letter)
        }
      }).join('') : null
      const path = series ? `posts/${sluggedSeries}/${sluggedTitlte}` : `posts/${sluggedTitlte}`
      // const path = makePostPath(series, title
      return createPage({
        // Path for this page — required
        path: path,
        component: Post,
        context: edge
      })
    })
  }

  const createSeriesPages = async () => {
      const series_s = (await graphql(`
      query loadSeries {
        allMdx {
          group(field: frontmatter___series) {
            series: fieldValue
            totalCount
          }
        }
      }
    `)).data.allMdx.group

    const getLatestThumbnailId = (nodes, idx) => {
      const id = nodes[idx].frontmatter.thumbnail?.children[0]?.id
      if(id){
        return id
      } else {
        if(idx === 0){
          return null
        }
        return getLatestThumbnailId(nodes, idx - 1)
      }
    }
    
    return series_s.forEach(async target => {
      const series = target.series
      const posts = (await graphql(`
        query loadPosts($series: String! ) {
          allMdx(filter: {frontmatter: {series: {eq: $series}}}, sort: {order: DESC, fields: frontmatter___date}) {
            nodes {
              id
              frontmatter {
                title
                tags
                series
                date(formatString: "MMMM DD, YYYY")
                description
                thumbnail {
                  children {
                    id
                  }
                }
              }
            }
          }
        }
      `, {series: series})).data.allMdx.nodes
      const id = getLatestThumbnailId(posts, posts.length - 1)
      // 시리즈 중 가장 최근 포스트의 thumbnail을 시리즈 thumbnail로 사용
      const { fluid } = (await graphql(`
        query loadThumbnail($id: String! ) {
          imageSharp(id: { eq: $id }) {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      `, {id: id})).data.imageSharp
  
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      const sluggedSeries = series.split('').map(letter => {
        if(korean.test(letter)){
          return letter
        } else if(letter === " ") {
          return "-"
        } else {
          return slugify(letter)
        }
      }).join('')
      const path =  `series/${sluggedSeries}`
  
      const context = {
        series: target,
        posts: posts,
        fluid: fluid
      }
  
      return createPage({
        // Path for this page — required
        path: path,
        component: Series,
        context: context
      })
    })
  }

  return await Promise.all([
    createPostPages(),
    createSeriesPages()
  ])
}