import { useState, useCallback } from 'react'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'
import { nightSky, openColor } from '../../libs/config'
import "../../styles/layout.scss"

export const Layout = ({ children }) => {
  const global = css`
    body {
      margin: 0;
      padding: 0;
    }
    body[class="dark"]{
      color: ${openColor.gray1};
      background-color: ${nightSky.Cetacean_Blue};
      transition: color 0.5s, background-color 1s;
      div[class*="header"]{
        background: ${nightSky.ChineseViolet};
        transition: all ease 1s;
      }
    }
    body[class="light"]{
      color: black;
      background-color: white;
      transition: color 0.5s, background-color 1s;
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