/** @jsx jsx */
import { useContext, useMemo, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'

import { layout, openColor } from '../../libs/config'
import { ThemeToggle } from './ThemeToggle'


const { main, header } = layout
const { gray5 } = openColor

export const Header = () => {

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${header.pc_height};
  `
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${main.max_width};
    padding: 5px 10px;
    transition: all ease 2s;
  `

  const Logo = styled.div`
  `

  const nav = css`
    display: flex;
  `

  return (
    <Wrapper>
      <Container>
        <Logo>
          Hwang Jiseob
        </Logo>
        <nav css={nav}>
          About
          Post
          Portfolio
          <ThemeToggle />
        </nav>
      </Container>
    </Wrapper>
  )
}

