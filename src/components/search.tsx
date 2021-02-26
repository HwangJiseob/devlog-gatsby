/** @jsx jsx */
import React, { useState, useCallback } from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"
import { debounce } from 'lodash'
import { jsx, css } from '@emotion/react'

import { makePostPath } from '../libs/makePostPath'
import { openColor, nightSky } from '../libs/config'

const { gray5 } = openColor

// 출처: https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial
export const Search = ({ props }) => {
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
  
  const allPosts = props.data.allMdx.nodes

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
            <article key={idx}>
              <header>
                <p>{date}</p>
                <h2>
                  <Link to={makePostPath(series, title)} css={post_title}>{title}</Link>
                </h2>
              </header>
              <div>
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
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description || excerpt,
                  }}
                />
              </section>
              <hr />
            </article>
          )
        })}
      </div>
    </>
  )
}

export const post_container = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: masonry;
  grid-gap: 10px;
`

export const post_title = css`
  color: inherit;
  text-decoration: none;
  transition: all ease 0.3s;
`

export const tag_button = css`
  cursor: pointer;
  font-weight: bold;
  color: ${gray5};
  margin-right: 10px;
  transition: all ease 0.3s;
  &:hover {
    color: ${nightSky.St_Patrick_Blue};
    transition: all ease 0.3s;
  }
`