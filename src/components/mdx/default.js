/** @jsx jsx */
import { layout } from '../../libs/config'
import { jsx, css } from '@emotion/react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark';

const post_width = layout.posts.max_width

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

const Prism = ({children, className}) => {
  const language = className.replace(/language-/, '') || ""
  return (
    <Highlight {...defaultProps}
      code={children}
      language={language}
      theme={vsDark}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const Youtube = (props) => {
  const url = props.url ? props.url : props.src
  const ratio = props.ratio ? isRatio(props.ratio) : 1
  const src = isWatchSrc(url)
  // youtube embed url이 아니어도 연동이 가능하도록
  // 일반 url을 embed url로 바꿔주는 코드를 작성하였습니다.

  const container = css`
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
    )
  } else {
    return <div/>
  }
}

const Math = ({children}) => {
  return(
    <div>
      math
      {children}
    </div>
  )
}

export const components = {
  code: Prism,
  Youtube: Youtube,
  katex: Math
}