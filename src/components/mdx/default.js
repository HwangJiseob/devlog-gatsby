/** @jsx jsx */
import React from 'react'
import { layout, nightSky, openColor  } from '../../libs/config'
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import Highlight, { defaultProps } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark';
import Gist from 'super-react-gist'

import { InlineMath, BlockMath } from 'react-katex';

import micromark from 'micromark'
import gfmSyntax from 'micromark-extension-gfm'
import gfmHtml from 'micromark-extension-gfm/html'

const post_width = layout.posts.max_width
const max_width = layout.main.max_width

const isWatchSrc = (url) => {
  const domain = "www.youtube.com"
  const arr = url.split('/')
  if(arr.includes(domain)){
    if(arr.includes('embed')){
      return url
    } else {
      const target = arr.pop()
      arr.push(target.replace('watch?v=', 'embed/'))
      return arr.join('/')
    }
  } else {
    return false
  }
}

const isRatio = (ratio) => {
  let num
  switch(typeof(ratio)){
    case "string":
      num = parseFloat(ratio)
      if(num===NaN){
        return 1
      }
      break
    case "number":
      num = ratio
      break
    default:
      break
  }
  if(num <= 0){
    return 1
  } else if(num <= 1){
    return num
  } else if(num <= 100){
    return num / 100
  } else {
    return 1
  }
}

const Prism = ({ children, className }) => {
  const wrapper = css`
    overflow-x: auto;
  `
  const container = css`
    min-width: 100%;
    float: left;
    box-sizing: border-box;
    overflow-x: auto;
  `

  const code_title = css`
    display: inline-flex;
    align-items: center;
    color: white;
    padding: 0 1em;
    height: 100%;
    font: 13px monospace;
    width: auto;
    background: #1e1e1e;
  `

  const lineNo = css`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
  `
  const [lang, title] = className.replace(/language-/, '').split(":title=")
  const language = lang || ""
  return (
    <div css={wrapper}>
      <Highlight {...defaultProps}
        code={children.trim()}
        language={language}
        theme={vsDark}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <>
          {title && 
          // code_title의 style은 vsc theme에 종속적이다
          <div style={{...style, margin: '1em 0 0 0', background: '#252526', height: '2.4em'}}>
            <div css={code_title}>
              {title}
            </div>
          </div>
        }
          <pre className={className} style={{...style, padding: '20px', margin: title ? '0 0 1em 0' : null}}
            css={container}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                <span css={lineNo}>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </pre>
          </>
        )}
      </Highlight>
    </div>
  )
}

const Code = ({ script, language, title }) => {
  const className = `language-${language ? language : ''}` + (title ? `:title=${title}` : '')
  return <Prism className={className}>{script.trim()}</Prism>
}

const Youtube = (props) => {
  const url = props.url ? props.url : props.src
  const ratio = props.ratio ? isRatio(props.ratio) : 1
  const src = isWatchSrc(url)
  // youtube embed url이 아니어도 연동이 가능하도록
  // 일반 url을 embed url로 바꿔주는 코드를 작성하였습니다.
  const wrapper = css`
    width: 100%;
    display: grid;
    place-items: center;
  `
  const container = css`
    width: 100%;
    max-width: calc(${post_width} * ${ratio});
  `
  const youtube = css`
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
  `
  const iframe = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `
  if(src){
    return (
      <div css={wrapper}>
        <div css={container}>
          <div css={youtube}>
            <iframe
              css={iframe}
              src={src}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <div/>
  }
}

const Columns = ({ children, vr }) => {
  const isVR = vr ? true : false
  const columns = children.filter(child => {
    return child?.props?.mdxType === "Column"
  })
  const container = css`
    display: grid;
    margin: 20px 0;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-gap: 10px;
  `
  return(
    <div css={container}>
      {columns}
    </div>
  )
}

const transpileMDXorNot = (target) => {
  if(!target?.type?.displayName){
    const result = micromark(target, {
      extensions: [gfmSyntax()],
      htmlExtensions: [gfmHtml]
    })
    return { __html: result }
  } else {
    return target
  }
}

const Column = ({ children }) => {
  let result, results
  if(Array.isArray(children)){
    results = children.map(child => {
      return transpileMDXorNot(child)
    })
  } else {
    result = transpileMDXorNot(children)
  }
  return(
    <div>
      {
        result && result?.type?.displayName
        ? <>{result}</>
        : <div dangerouslySetInnerHTML={result} />
      }
      {
        results && results.map(result => {
          return result?.type?.displayName
          ? <>{result}</>
          : <div dangerouslySetInnerHTML={result} />
        })
      }
    </div>
  )
}
const Table = ({children}) => {
  const thead = children[0]?.props?.children?.props?.children?.length
  const container = css`
    width: auto;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  `
  const table = css`
    table-layout: fixed;
    width: 100%;
  `
  return (
    <div css={container}>
      <table css={table}>
        {children}
      </table>
    </div>
  )
}

const Blockquote = styled.blockquote`
  padding: 5px 0 5px 20px;
  margin: auto 0;
  color: inherit;
  line-height: 1.8;
  background: ${nightSky.ChineseViolet}44;
  /* background: ${openColor.gray1}; */
  border-left: 10px solid ${nightSky.ChineseViolet};
`

const InlineCode = styled.code`
  all: unset;
  font-size: 12px;
  padding: 0 5px;
  padding-bottom: 2px;
  margin: 0 2px;
  background: ${nightSky.ChineseViolet};
  color: ${openColor.gray1};
  border-radius: 5px;
`

const Link = styled.a`
  text-decoration: none;
  color: ${nightSky.ChineseViolet};
  padding: 0 1px;
  border-bottom: 2px solid ${nightSky.ChineseViolet};
  transition: color ease 0.5s, background-color ease 0.5s;
  &:hover{
    transition: color ease 0.5s, background-color ease 0.5s;
    color: ${openColor.gray1};
    background-color: ${nightSky.ChineseViolet};
  }
`

const Line = styled.hr`
  border: none;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(133,89,136,1) 18%, rgba(107,73,132,1) 47%, rgba(72,52,117,1) 79%);

`

export const components = {
  inlineCode: InlineCode,
  a:Link,
  hr:Line,
  code: Prism,
  Code: Code,
  Youtube: Youtube,
  Gist: Gist,
  InlineMath: InlineMath, 
  BlockMath: BlockMath,
  Columns: Columns,
  Column: Column,
  table: Table,
  blockquote:Blockquote
}