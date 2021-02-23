import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from '@emotion/styled'

import { Layout } from '../../components/layout/Layout'

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
          <div>호옹이</div>
          <MDXProvider components={components}>
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
  max-width: 720px;
`

const Fuck = props => <pre style={{ color: "red"}} {...props}/>

const Suck = ({children, props}) => {
  return (
    <div style={{color: "green"}}>
      <div>react component</div>
      {children}
    </div>
  )
}


const components = {
  h2:Fuck,
  Test:Suck
}



export default Post