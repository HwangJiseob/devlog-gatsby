import { useContext } from 'react'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'


export const Layout = ({ children }) => { 
  const global = css`
    body {
      margin: 0;
      padding: 0;
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