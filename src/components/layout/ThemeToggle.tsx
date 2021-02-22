/** @jsx jsx */
import React, { useContext, useMemo, useEffect, useLayoutEffect } from 'react'
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';
import { IoSunny, IoMoon } from 'react-icons/io5'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import { vscodeDark, openColor, duration } from '../../libs/config'

const { background } = vscodeDark
const { gray1 } = openColor
const { themeDuration } = duration

export const ThemeToggle = () => {
  const ToggleContainer = styled.div`
      input {
        display: none;
      }
      label {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        background: ${openColor.indigo4};
        transition: all ease ${themeDuration};
        box-sizing: border-box;
        &::after {
          content: "";
          cursor: pointer;
          transition: all ease ${themeDuration};
          position: absolute;
          transform: translateX(-15px);
          height: 25px;
          width: 25px;
          background: ${gray1};
          border-radius: 50%;
        }
      }
      input:checked + label{
        transition: all ease ${themeDuration};
        background: #0c1145;
      }
      input:checked + label:after {
        transition: all ease ${themeDuration};
        transform: translateX(15px);
      }

      & svg {
        font-size: 20px;
        color: yellow;
      }
  `
    return (
      <ThemeToggler>
        {({ theme, toggleTheme })=>(
          <ToggleContainer>
            <input
              id="themeToggle"
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />
            <label htmlFor="themeToggle" >
              <IoMoon />
              <IoSunny />
            </label>
            </ToggleContainer>
        )}
      </ThemeToggler>
      
    )
}