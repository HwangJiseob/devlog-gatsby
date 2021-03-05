/** @jsx jsx */
import React, { useState, useCallback, useEffect } from 'react'
import { Link } from "gatsby"
import { debounce } from 'lodash'
import { jsx, css } from '@emotion/react'
import GatsbyImage from 'gatsby-image'

import { makePostPath } from '../libs/makePath'
import { openColor, nightSky } from '../libs/config'

const { gray5 } = openColor

// 출처: https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial
export const Search = ({ props }) => {
  const allPosts = props.data.allMdx.nodes
  const tag = props?.location?.state?.tag

  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: tag ? tag : emptyQuery,
  })
  const [ inputData, setInputData ] = useState('')
  const [ option, setOption ] = useState(tag ? "tag" : "all")
  // const [ select_all, setSelect_all ] = useState(tag ? false : true)
  // const [ select_tag, setSelect_tag ] = useState(tag ? true : false)

  const debounceSearch = debounce((query, filteredData) => {
    setState({
      query,
      filteredData,
    })
  }, 200);

  const handleOptionChange = useCallback(e => {
    console.log(e.target.value)
    setOption(e.target.value)
    handleInputChange({target: { value: state.query } }, e.target.value)
  }, [ state ])

  const handleInputChange = useCallback((e, option) => {
    const query = e.target.value
    setInputData(query)
    console.log(query, option)
    const { data } = props
    const posts = allPosts || []
    const filteredData = posts.filter(post => {
      const { description, series, title, tags } = post.frontmatter
      const series_result = series?.toLowerCase().includes(query?.toLowerCase())
      const description_result = description?.toLowerCase().includes(query?.toLowerCase())
      const title_result = title?.toLowerCase().includes(query?.toLowerCase())
      const tags_result = tags && tags.join("").toLowerCase().includes(query?.toLowerCase())
      switch(option){
        case "series":
          return series_result
        case "description":
          return description_result
        case "title":
          return title_result
        case "tag":
          return tags_result
        default:
          return series_result || description_result || title_result || tags_result
      }
    })
    debounceSearch(query, filteredData)
  }, [])

  const refreshSearch = useCallback((e)=>{
    const select = document.getElementsByTagName('select')[0]
    const options = [ ...select.getElementsByTagName('option')] // HtmlCollection to Array
    options.forEach(option => {
      option.selected = false
    })
    
    const all = select.querySelector('option[value="all"]')
    all.setAttribute('selected', 'true')

    setInputData("")
    handleInputChange({target: { value: "" } }, 'all')
  }, [])

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  useEffect(()=>{
    const select = document.getElementsByTagName('select')[0]
    const tag_option = select.querySelector('option[value="tag"]')
    tag ? tag_option.setAttribute('selected', 'true') : null
    if(tag){
      handleInputChange({target: { value: tag } }, option)
      setInputData(tag)
    }
  }, [])

  return (
    <>
      <div>
        <h1 
          css={css`display: inline-block; cursor: pointer;`}
          onClick={refreshSearch}
        >
          Posts
        </h1>
      </div>
      <input
        className="searchInput"
        css={searchInput}
        type="text"
        aria-label="Search"
        placeholder="search posts..."
        value={inputData}
        onChange={(e)=>{handleInputChange(e, option)}}
      />
      <select onChange={handleOptionChange} css={select}>
        <option value="all">all</option>
        <option value="tag">tag</option>
        <option value="title">title</option>
        <option value="description">description</option>
        <option value="series">series</option>
      </select>
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
                        const select = document.getElementsByTagName('select')[0]
                        const options = [...select.getElementsByTagName('option')]
                        options.forEach(option => {
                          if(option.value === 'tag'){
                            option.selected = true
                          } else {
                            option.selected = false
                          }
                        })
                        
                        handleInputChange({ target: { value: tag } }, 'tag' )
                        setInputData(tag)
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
const searchInput = css`
  all: unset;
  border-bottom: 2px solid ${nightSky.ChineseViolet};
  line-height: 2;
  padding-left: 5px;
  color: ${nightSky.ChineseViolet};
  &::placeholder{
    padding-left: 5px;
    color: ${nightSky.ChineseViolet};
  }
`

const select = css`
  margin-left: 10px;
  height: 32px;
  background: none;
  color: ${nightSky.ChineseViolet};
  border: 2px solid ${nightSky.ChineseViolet};
  &:hover {
    cursor: pointer;
  }

  option {
    color: ${nightSky.ChineseViolet};
    border: 2px solid ${nightSky.ChineseViolet};
  }
`

export const postcard = css`
  overflow-x: hidden;
  border-radius: 10px;
  transition: transform 0.5s, box-shadow 0.5s;
  &:hover{
    transition: transform 0.5s, box-shadow 0.5s;
    transform: translate3d(0px, -5px, 0px);
    /* box-shadow: ${gray5} 0px 1px 1px, ${gray5} 0px 4px 4px; */
    box-shadow: 0 8px 32px 0 ${gray5};
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
  grid-gap: 15px;
`

export const post_title = css`
  color: inherit;
  text-decoration: none;
  /* transition: color ease 0.5s; */
  &:hover{
    color: ${nightSky.Cetacean_Blue};
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