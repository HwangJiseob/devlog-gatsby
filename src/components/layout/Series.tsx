/** @jsx jsx */
import React from 'react'
import { Link } from "gatsby"
import { jsx, css } from '@emotion/react'
import GatsbyImage from 'gatsby-image'

import { Layout } from '../../components/layout/Layout'
import { layout, nightSky } from '../../libs/config'
import { Tags } from './Post'
import { makePostPath } from '../../libs/makePath'
import { SEO } from '../SEO'

// const tests = [0, 0, 0, 0, 0, 0, 0, 0, 0]

const Series = ({ pageContext }) => {
  const { posts, fluid, series } = pageContext
  return (
    <>
    <SEO title={`시리즈: ${series}`} />
    <Layout>
      <div css={container}>
        <div>
          <div>
            {fluid ? <GatsbyImage fluid={fluid} /> : null}
            {/* 시리즈 중 가장 최근 포스트의 thumbnail을 시리즈 thumbnail로 사용 */}
          </div>
          <h1>
            {series.series}
          </h1>
        </div>
        <div>
          {posts.map((post, index) => {
            return(
              <article css={post_style}>
                <h2>
                  <Link to={`/posts/${makePostPath(post.frontmatter.series, post.frontmatter.title)}`}>
                    {index + 1}. {post.frontmatter.title}
                  </Link>
                </h2>
                <div>
                  <Tags tags={post.frontmatter.tags} />
                  <span>
                    {post.frontmatter.date}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Layout>
    </>
  )
}

const container = css`
  display: flex;
  flex-wrap: nowrap;
  margin-top: 20px;
  & > div:nth-child(1) {
    width: 100%;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    & > h1 {
      font-size: 32px;
      word-break: break-all;
    }
    & > div {
      // flex 안에서도 gatsby image fluid를 보이도록 해주는 속성
      flex-basis: 1;
      max-width: 320px;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    padding: 0 20px;
    border-left: 2px solid ${nightSky.ChineseViolet};
  }

  ${layout.mobile_768px}{
    flex-wrap: wrap;
    & > div:nth-child(2) {
      padding: 0;
      border-left: none;
    }
  }
`

const post_style = css`
  & > h2 {
    & > a {
      color: inherit;
      text-decoration: none;
  /* transition: color ease 0.5s; */
      &:hover{
        color: ${nightSky.ChineseViolet};
        transition: color ease 0.5s;
      }
    }
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 2px solid ${nightSky.ChineseViolet };
    & > ul {
      display: block;
      margin: 0;
      padding: 0;
      list-style: none;
      & > li {
        display: inline;
      }
    }
  }
`

export default Series
