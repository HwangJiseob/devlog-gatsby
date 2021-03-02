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
  const Post = path.resolve(`src/components/layout/Post.tsx`)
  
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    query loadPagesQuery {
      allMdx(sort: {order: DESC, fields: frontmatter___date}) {
        edges {
          node {
            id
            body
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
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allMdx.edges.forEach(edge => {
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      const { series, title, tags } = edge.node.frontmatter

      const sluggedTitlte = korean.test(title) ? title : slugify(title)
      const sluggedSeries = series ? (korean.test(series) ? series : slugify(series) ) : null
      const path = series ? `posts/${sluggedSeries}/${sluggedTitlte}` : `posts/${sluggedTitlte}`
      // const path = makePostPath(series, title
      createPage({
        // Path for this page — required
        path: path,
        component: Post,
        context: edge
      })
    })
  })
}

// 개별 tag 페이지
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   const layout = path.resolve(`src/components/layout/Post.tsx`)

//   return graphql(`
//     query loadTags{
//       allMdx {
//         group(field: frontmatter___series) {
//           series: fieldValue
//           totalCount
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       throw result.errors
//     }

//     result.data.allMdx.group.forEach(async tag => {
//       const posts = await graphql(`
//         query loadTagPages($tag: String) {
//           allMdx(filter: {frontmatter: {series: {eq: $series}}}) {
//             nodes {
//               id
//               frontmatter {
//                 title
//                 description
//                 series
//                 date(formatString: "MMMM DD, YYYY")
//                 tags
//                 thumbnail {
//                   childImageSharp {
//                     fluid {
//                       base64
//                       aspectRatio
//                       src
//                       srcSet
//                       sizes
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `, { series: series.series })
//       createPage({
//         // Path for this page — required
//         path: `series/${series.series}`,
//         component: layout,
//         context: posts
//       })
//     })
//   })
// }