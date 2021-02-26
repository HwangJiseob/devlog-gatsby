import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from '@emotion/styled'
import "katex/dist/katex.min.css"

import { Layout } from '../../components/layout/Layout'
import { components as defaultComponents } from '../../components/mdx/default'
import { layout } from '../../libs/config'
import GatsbyImage from 'gatsby-image'

const post_width = layout.posts.max_width

const Post = ({ pageContext }) => {
  const { node, previous, next } = pageContext
  const { fluid } = node.frontmatter?.thumbnail?.childImageSharp
  return(
    <Layout>
      <PostWrapper>
        <PostContainer>
          <GatsbyImage fluid={fluid}/>
          <PostTitle>{node.frontmatter.title}</PostTitle>
          <MDXProvider components={defaultComponents}>
            <MDXRenderer>{node.body}</MDXRenderer>
          </MDXProvider>
          <div>

          </div>
        </PostContainer>
      </PostWrapper>
    </Layout>
  )
}

export const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const PostContainer = styled.div`
  width: 100%;
  padding: 5px 10px;
  max-width: ${post_width};
`

const PostTitle = styled.h1`

`

export default Post

// mdx.frontmatter__url