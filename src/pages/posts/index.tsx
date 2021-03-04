import React from 'react'
import { graphql } from "gatsby"

import { Layout } from '../../components/layout/Layout'
import { makePostPath } from '../../libs/makePath'
import { Search } from '../../components/search'

// 출처: https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial

const Posts = (props) => {
  // re-render issue 때문에 search input과 search에 따른 post render 코드 전체를
  // Search component로 옮겼다.
  return (
    <Layout>
      <h1>
        Posts
      </h1>
      <Search props={props} />
    </Layout>
  )
}

export default Posts

export const query = graphql`
  {
    allMdx(sort: {order: DESC, fields: frontmatter___date}) {
      nodes {
        excerpt(pruneLength: 200)
        id
        frontmatter {
          title
          description
          series
          date(formatString: "MMMM DD, YYYY")
          tags
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
`