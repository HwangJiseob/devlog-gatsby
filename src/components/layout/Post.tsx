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
  const fluid = node.frontmatter?.thumbnail?.childImageSharp?.fluid
  return(
    <Layout>
      <PostWrapper>
        <PostContainer>
          <PostTitle
            className="postTitle"
          >{node.frontmatter.title}</PostTitle>
          {fluid ? <GatsbyImage fluid={fluid} /> : null}
          <MDXProvider components={defaultComponents}>
            <MDXRenderer>{node.body}</MDXRenderer>
          </MDXProvider>
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
  font-family: 'Noto Sans KR', sans-serif;
`

const PostTitle = styled.div`
  font-family: 'Nanum Myeongjo',  sans-serif;
  font-size: 2.5em;
  font-weight: bolder;
  box-sizing: border-box;
  padding: 40px 0;
`

export default Post

// mdx.frontmatter__url