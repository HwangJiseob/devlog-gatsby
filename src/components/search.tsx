/** @jsx jsx */
import React, { useState, useCallback } from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"
import { debounce } from 'lodash'
import { jsx, css } from '@emotion/react'
import GatsbyImage from 'gatsby-image'

import { makePostPath } from '../libs/makePostPath'
import { openColor, nightSky } from '../libs/config'

const { gray5 } = openColor

// 출처: https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial
export const Search = ({ props }) => {
  const allPosts = props.data.allMdx.nodes

  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const debounceSearch = debounce((query, filteredData) => {
    setState({
      query,
      filteredData,
    })
  }, 200);

  const handleInputChange = useCallback((e) => {
    const query = e.target.value
    const { data } = props
    const posts = allPosts || []
    const filteredData = posts.filter(post => {
      const { description, series, title, tags } = post.frontmatter
      return (
        series?.toLowerCase().includes(query?.toLowerCase()) ||
        description?.toLowerCase().includes(query?.toLowerCase()) ||
        title?.toLowerCase().includes(query?.toLowerCase()) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(query?.toLowerCase()))
      )
    })
    debounceSearch(query, filteredData)
  }, [])

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  return (
    <>
      <input
        className="searchInput"
        type="text"
        aria-label="Search"
        placeholder="search posts..."
        onChange={handleInputChange}
      />
      <span style={{marginLeft: "10px"}}>
        Found {hasSearchResults ? filteredData.length : 'all' }
      </span>
      <div css={post_container}>
        {posts.map((node, idx) => {
          const { excerpt } = node
          const { title, tags, series, date, description } = node.frontmatter
          return (
            <article className="postcard" css={postcard} key={idx}>
              <header>
                <GatsbyImage fluid={node.frontmatter?.thumbnail?.childImageSharp?.fluid} />
                <div css={datetime}>{date}</div>
                <h2 css={title_container}>
                  <Link to={makePostPath(series, title)} css={post_title}>{title}</Link>
                </h2>
              </header>
              <div css={css`padding: 0 10px;`}>
                {tags.map((tag, index)=>{
                  return(
                    <span 
                      css={tag_button}
                      onClick={()=>{
                        handleInputChange({ target: { value: tag } } )
                        const search = document.querySelector('.searchInput')
                        search.setAttribute("value", tag)
                      }}
                      key={index}
                    >#{tag}
                    </span>
                  )
                })}
              </div>
              <section css={css`padding: 0 10px;`}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description || excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </div>
    </>
  )
}
export const postcard = css`
  overflow-x: hidden;
  border-radius: 10px;
  /* box-sizing: border-box;
  padding : 10px; */
  transition: transform 0.5s, box-shadow 0.5s;
  &:hover{
    transition: transform 0.5s, box-shadow 0.5s;
    transform: translate3d(0px, -5px, 0px);
    box-shadow: ${gray5} 0px 1px 1px, ${gray5} 0px 4px 4px;
  }
`

export const title_container = css`
  padding: 0 10px;
`

export const datetime = css`
  margin: 10px 0;
  padding: 0 10px;
`

export const post_container = css`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  /* grid-template-rows: masonry; */
  grid-gap: 10px;
`

export const post_title = css`
  color: inherit;
  text-decoration: none;
  transition: color ease 0.5s;
  &:hover{
    color: ${nightSky.St_Patrick_Blue};
    transition: color ease 0.5s;
  }
`

export const tag_button = css`
  cursor: pointer;
  font-weight: bold;
  color: ${gray5};
  margin-right: 10px;
  transition: color ease 0.5s;
  &:hover {
    color: ${nightSky.St_Patrick_Blue};
    transition: color ease 0.5s;
  }
`