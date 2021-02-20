/** @jsx jsx */
import { useContext, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { jsx, css, keyframes } from '@emotion/react'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';
import { IoSunny, IoMoon } from 'react-icons/io5'

import { layout, openColor } from '../../libs/config'

const { main, header } = layout
const { gray5 } = openColor

export const Header = () => {
  let theme = useContext(ThemeManagerContext)

  const toggleClick = () => {
    theme.toggleDark()
  }
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${header.pc_height};
  `
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${main.max_width};
    padding: 5px 10px;
  `

  const Logo = styled.div`
  `

  const nav = css`
    display: flex;
  `

  const toggleRight = keyframes`
    from {
      transform: translateX(-15px);
    }
    to {
      transform: translateX(15px);
    }
  `

const toggleLeft = keyframes`
  from {
    transform: translateX(15px);
  }
  to {
    transform: translateX(-15px);
  }
`

  const ToggleContainer = styled.div`
    input {
      display: none;
    }
    label {
      display: flex;
      align-items: center;
      transition: all ease 0.4s;
      justify-content: space-around;
      width: 60px;
      height: 30px;
      border-radius: 15px;
      background: blue;
      box-sizing: border-box;
      &::after {
        content: "";
        transition: all ease 0.4s;
        position: absolute;
        transform: translateX(-15px);
        height: 30px;
        width: 30px;
        background: red;
        border-radius: 50%;
      }
    }
    input:checked + label:after {
      transition: all ease 0.4s;
      transform: translateX(15px);
    }

    & svg {
      font-size: 20px;
      color: yellow;
    }
  `

  return (
    <Wrapper>
      <Container>
        <Logo>
          Hwang Jiseob
        </Logo>
        <nav css={nav}>
          <ToggleContainer>
            <input
              id="themeToggle"
              type="checkbox"
              onChange={(e)=>theme.toggleDark()}
              checked={theme.isDark}
            />
            
            <label htmlFor="themeToggle" 
              className="fuck"
            >
              <IoSunny />
              <IoMoon />
            </label>
          </ToggleContainer>
        </nav>

      </Container>
    </Wrapper>
  )
}