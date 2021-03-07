/** @jsx jsx */
import React from 'react'
import { Link } from "gatsby"
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import GatsbyImage from 'gatsby-image'
import "katex/dist/katex.min.css"

import { Layout } from '../../components/layout/Layout'
import { components as defaultComponents } from '../../components/mdx/default'
import { layout, openColor, nightSky } from '../../libs/config'
import { makePostPath, makeSeriesPath } from '../../libs/makePath'
import { ToC } from '../ToC'
import { SEO } from '../SEO'
import { Utterances } from '../Utterance'

const post_width = layout.posts.max_width

export const Tags = ({ tags }) => {
  const Tags_Container = styled.ul`
  all: unset;
  list-style: none;
  display: flex;
  flex-wrap: wrap;

  li {
    a {
      text-decoration: none;
      margin-right: 5px;
      cursor: pointer;
      font-weight: bold;
      color: ${openColor.gray5};
      margin-right: 10px;
      transition: color ease 0.5s;
      word-break: break-all;
      &:hover {
        color: ${nightSky.ChineseViolet};
        transition: color ease 0.5s;
      }
    }
  }
`
  return (
    <Tags_Container>
      {tags.map(tag => {
        return (
          <li>
            <Link to='/posts' state={{tag: tag}}>
              #{tag}
            </Link>
          </li>
        )
      })}
    </Tags_Container>
  )
}

const Post = ({ pageContext }) => {
  const { node, previous, next } = pageContext
  const fluid = node.frontmatter?.thumbnail?.childImageSharp?.fluid

  const { title, description, tags } = node.frontmatter
  return(
    <>
    <SEO
      title={title && title}
      description={description ? description : node?.excerpt}
      image={fluid && fluid.src}
      keywords={ tags && tags}
    />
    <Layout>
      <PostWrapper>
        <div>
          <PostTitle
            className="postTitle"
          >{node.frontmatter.title}</PostTitle>
          <div css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            color: ${openColor.gray5};
          `}>
            <div css={css`display: flex; flex-wrap: wrap;`}>
              {node.frontmatter.series &&
                <div css={css`margin-right: 10px;`}>
                  <Link to={makeSeriesPath(node.frontmatter.series)}
                    css={series_link}
                  >
                    시리즈: {node.frontmatter.series}
                  </Link>
                </div>
              }
              <Tags tags={node.frontmatter.tags} />
            </div>
            {node.frontmatter.date}
          </div>
          <div style={{ marginBottom: "30px"}} />
          {fluid ? <GatsbyImage fluid={fluid} /> : null}
          <ToC items={node.tableOfContents.items} />
          <MDXProvider components={defaultComponents}>
            <MDXRenderer>{node.body}</MDXRenderer>
          </MDXProvider>
          <Navigators>
            {next 
              ? <div>
                  <Link to={`/posts/${makePostPath(next.frontmatter.series, next.frontmatter.title)}`}
                    css={navigator}>Next</Link>
                  <Nav node={next} />
                </div>
              : <Center>Latest</Center>
            }
            {previous 
              ? <div>
                  <Link to={`/posts/${makePostPath(previous.frontmatter.series, previous.frontmatter.title)}`} 
                    css={navigator}>Previous</Link>
                  <Nav node={previous} />
                </div>
              : <Center>First post</Center>
            }
          </Navigators>
          <Utterances/>
        </div>
      </PostWrapper>
    </Layout>
    </>
  )
}



export const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > div {
    width: 100%;
    padding: 5px 10px;
    max-width: ${post_width};
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;

    .header-autolink {
      display: none;
    }
  }
`

const PostTitle = styled.div`
  font-family: 'Nanum Myeongjo',  sans-serif;
  font-size: 2.5em;
  font-weight: bolder;
  box-sizing: border-box;
  padding: 40px 0 10px 0;
`

const Navigators = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 30px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`

const post_title = css`
  color: inherit;
  text-decoration: none;
  &:hover{
    color: ${nightSky.ChineseViolet};
    transition: color ease 0.5s;
  }
`

const series_link = css`
  text-decoration: none;
  margin-right: 5px;
  cursor: pointer;
  font-weight: bold;
  color: ${openColor.gray5};
  margin-right: 10px;
  transition: color ease 0.5s;
  &:hover {
    color: ${nightSky.ChineseViolet};
    transition: color ease 0.5s;
  }
`

const Nav = ({node}) => {
  const { date, title, description, series, tags } = node.frontmatter
  const fluid = node.frontmatter?.thumbnail?.childImageSharp?.fluid
  return(
    <div>
      {fluid ? <GatsbyImage fluid={fluid} /> : null}
      <p>{date}</p>
      <h2>
        <Link
          to={`/posts/${makePostPath(series, title)}`}
          css={post_title}
        >
          {title}
        </Link>
      </h2>
      <Tags tags={tags} />
      <p>
        {description}
      </p>
    </div>
  )
}

export const Center = styled.div`
  font-size: 24px;
  color: ${nightSky.Regalia};
  font-weight: bold;
  display: grid;
  place-items: center;

  @media screen and (max-width: 560px){
    // 240 * 2 + (40 * 2)
    display: none;
  }
`

const navigator = css`
  color: ${nightSky.Regalia};
  display: block;
  width: 100%;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 2px solid ${nightSky.Regalia};
  transition: all ease 0.3s;
  margin-bottom: 20px;
  &:hover{
    color: ${nightSky.ChineseViolet};
    border-bottom: 2px solid ${nightSky.ChineseViolet};
    transition: all ease 0.3s;
    cursor: pointer;
  }
`

export default Post