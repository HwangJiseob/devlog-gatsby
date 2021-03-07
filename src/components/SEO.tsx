import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"

interface props {
  title?: string
  description?: string
  keywords?: any
  image?: string
}

const author = "Hwang Jiseob"
const defaultTitle = "devlog"
const defaultDescription = "blog and portfolio site of Hwang Jiseob, built with gatsby"
const defaultKeywords = [
  "devlog", "programming", "web programming", "web development", "front end", "backend", "algorithm", 
  "프로그래밍", "웹개발", "포트폴리오", "개발 블로그", "프론트엔드", "백엔드", "알고리즘"
]

export const SEO = ({ title, description, keywords, image }: props) => {
  const { pathname } = useLocation()
  return(
    <Helmet htmlAttributes={{
      lang: 'ko',
    }}>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords ? keywords.join(',') : defaultKeywords.join(',')}/>
      <meta name="copyright" content="Copyright 2021 Hwang Jiseob" />
      <meta name="author" content={author} />
      <meta name="google-site-verification" content="-E7CHMORhcfUhofzQGb5LRku32ldp8XPHUk3SsO6zPo" />
      {image && <meta name="image" content={image}/>}

      {/* facebook */}
      <meta property="og:site_name" content="devlog" />
      <meta property="og:url" content={pathname} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image}/>}

      {/* twitter */}
      <meta name="twitter:card" content="type" />
      <meta name="twitter:title" content={title || defaultTitle }/>
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image}/>}

      {/* disable react devtools */}
      <script>
        {`if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
        }`}
    </script>
    </Helmet>
  )
}
