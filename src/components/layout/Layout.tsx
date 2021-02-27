import { useState, useCallback, useEffect } from 'react'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'
import { nightSky, openColor, layout } from '../../libs/config'
// import "../../styles/layout.scss"

const { mobile_768px } = layout

export const Layout = ({ children }) => {
  useEffect(()=>{
    // const body = document.body
    setTimeout(()=>{setOnLoad(true)}, 0)
    
  }, [])
  const [onload, setOnLoad] = useState(false)
  const global = css`
    body {
      margin: 0;
      padding: 0;
    }
    body[class="dark"]{
      color: ${openColor.gray1};
      background-color: ${nightSky.Cetacean_Blue};
      transition: ${onload ? `color ease 0.5s, background-color ease 0.5s` : null};

      div[class*="header"]{
        background-color: ${nightSky.ChineseViolet};
        transition: background-color 0.5s;
      }
      ul[class*="menu_items"]{
        ${mobile_768px}{
          background-color: #855988;          
        }
      }
      article[class*="postcard"]{
        background-color: #855988;
        transition: transform 0.5s, box-shadow 0.5s, background-color 0.5s;
        &:hover{
          transition: transform 0.5s, box-shadow 0.5s;
          transform: translate3d(0px, -5px, 0px);
          box-shadow: ${nightSky.Cetacean_Blue} 0px 1px 1px, ${nightSky.Cetacean_Blue} 0px 4px 4px;
        }
      }
    }
    body[class="light"]{
      color: black;
      background-color: #fafafa;
      transition: ${onload ? `color ease 0.5s, background-color ease 0.5s` : null};

      div[class*="header"]{
        transition: background-color 0.5s;
      }
      article[class*="postcard"]{
        background-color: white;
        transition: transform 0.5s, box-shadow 0.5s, background-color 0.5s;
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
      <Global styles={global} />
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
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