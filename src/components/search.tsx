import React, { useState, useCallback } from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"

import { makePostPath } from '../libs/makePostPath'

// 출처: https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial
export const Search = ({ props }) => {
  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })
  
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
    setState({
      query,
      filteredData,
    })
  }, [])

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  return (
    <>
      <input
        key='seacrhInput'
        className="searchInput"
        type="text"
        aria-label="Search"
        placeholder="Type to filter posts..."
        onChange={handleInputChange}
        value={state.query}
      />
      <div>
        Found {hasSearchResults ? filteredData.length : 'all' }
      </div>
      {posts.map((node, idx) => {
      const { excerpt } = node
      const { title, tags, series, date, description } = node.frontmatter
      return (
        <article key={idx}>
          <header>
            <h2>
              <Link to={makePostPath(series, title)}>{title}</Link>
            </h2>
            <p>{date}</p>
          </header>
          <div>
            {tags.map((tag, index)=>{
              return(<span style={{marginRight: "10px"}}
                onClick={()=>handleInputChange({ target: { value: tag } } )}
                key={index}>{tag}</span>)
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
    </>
  )
}