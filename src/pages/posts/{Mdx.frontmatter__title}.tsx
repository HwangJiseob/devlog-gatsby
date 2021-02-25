import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from '@emotion/styled'
import "katex/dist/katex.min.css"

import { Layout } from '../../components/layout/Layout'
import { components as defaultComponents } from '../../components/mdx/default'
import { layout } from '../../libs/config'

const post_width = layout.posts.max_width

const Post = (props) => {
  const { mdx } = useStaticQuery(graphql`
    query($id: String) {
      mdx(id: { eq: $id }) {
        body
        frontmatter{
          title
          tags
        }
      }
    }
  `)
  return(
    <Layout>
      <PostWrapper>
        <PostContainer>
          <PostTitle>{mdx.frontmatter.title}</PostTitle>
          <MDXProvider components={defaultComponents}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </PostContainer>
      </PostWrapper>
    </Layout>
  )
}

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const PostContainer = styled.div`
  width: 100%;
  padding: 5px 10px;
  max-width: ${post_width};
`

const PostTitle = styled.h1`

`


export default Post