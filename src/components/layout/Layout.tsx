import { useState, useEffect } from 'react'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'
import { nightSky, openColor, layout } from '../../libs/config'
import { gist_dark } from '../../libs/gist_dark'
import { TocProvider } from '../ToC'

const { mobile_768px } = layout

export const Layout = ({ children }) => {
  useEffect(()=>{
    setTimeout(()=>{setOnLoad(true)}, 0)
  }, [])
  const [onload, setOnLoad] = useState(false)
  const global = css`
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Myeongjo&family=Noto+Sans+KR&family=Shippori+Mincho&display=swap');
    body {
      margin: 0;
      padding: 0;
    }
    body[class="dark"]{
      color: ${openColor.gray1};
      background-color: ${nightSky.Cetacean_Blue};
      transition: ${onload ? `color ease 0.5s, background-color 0.5s` : null};

      /*!
      * Gist DarkCode ver 0.2.0 
      * Copyright (c) 2017 KillerCodes.in
      * License: Free to use with this file header ;)
      */
      ${gist_dark.replace('#000', `#0d1117`)}

      ul[class*="menu_items"]{
        ${mobile_768px}{
          background: ${nightSky.Cetacean_Blue};
        }
      }
      article[class*="postcard"]{
        /* background: rgba( 133, 89, 136, 0.75 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4.5px ); */
        background: rgba( 133, 89, 136, 0.55 );
        backdrop-filter: blur( 16.5px );
        transition: transform 0.5s, box-shadow 0.5s, background-color 0.5s;
        &:hover{
          transition: transform 0.5s, box-shadow 0.5s;
          transform: translate3d(0px, -5px, 0px);
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          /* box-shadow: ${nightSky.Cetacean_Blue} 0px 1px 1px, ${nightSky.Cetacean_Blue} 0px 4px 4px; */
        }
      }
    }
    body[class="light"]{
      color: black;
      background-color: #fafafa;
      transition: ${onload ? `color ease 0.5s, background-color 0.5s` : null};
      
      article[class*="postcard"]{
        background-color: white;
        transition: transform 0.5s, box-shadow 0.5s, background-color 0.5s;
      }
      ul[class*="menu_items"]{
        ${mobile_768px}{
          color: black;
        }
      }
      a[class*="menu_item"], span[class*="menu_item"]{
        transition: border-bottom 0.5s color 0.5s;
        &:hover {
          transition: border-bottom 0.5s color 0.5s;
          border-bottom: 3px solid ${nightSky.ChineseViolet};
          color: ${nightSky.ChineseViolet};
        }
      }
    }
  `
  return (
    <Wrapper>
      <TocProvider>
        <Global styles={global} />
        <Header />
        <Main>
          {children}
        </Main>
        <Footer />
      </TocProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`