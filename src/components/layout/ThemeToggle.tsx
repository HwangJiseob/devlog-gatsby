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
  /*
    react-transition-group까지 동원했지만 도저히 reactful한 방법으로는 toggle transition을 구현할 수 없을 것 같아서 useEffect에서 DOM API로
    직접 제어하는 방법을 선택했습니다.
  */
  // let {isDark, toggleDark} = useContext(ThemeManagerContext)

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
      <ToggleContainer>
        <ThemeToggler>
          {({ theme, toggleTheme })=>(
            <>
              <input
                id="themeToggle"
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
              />
              
              <label htmlFor="themeToggle" 
                className="fuck"
              >
                <IoMoon />
                <IoSunny />
              </label>
            </>
          )}
        </ThemeToggler>
      </ToggleContainer>
    )

  // return useMemo(()=>{
  //   const ToggleContainer = styled.div`
  //     input {
  //       display: none;
  //     }
  //     label {
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-around;
  //       width: 60px;
  //       height: 30px;
  //       border-radius: 15px;
  //       background: ${openColor.indigo4};
  //       box-sizing: border-box;
  //       &::after {
  //         content: "";
  //         cursor: pointer;
  //         transition: all ease ${themeDuration};
  //         position: absolute;
  //         transform: translateX(-15px);
  //         height: 25px;
  //         width: 25px;
  //         background: ${gray1};
  //         border-radius: 50%;
  //       }
  //     }
  //     input:checked + label{
  //       background: #0c1145;
  //     }
  //     input:checked + label:after {
  //       transition: all ease ${themeDuration};
  //       transform: translateX(15px);
  //     }

  //     & svg {
  //       font-size: 20px;
  //       color: yellow;
  //     }
  // `
  //   return (
  //     <ToggleContainer>
  //       <input
  //         id="themeToggle"
  //         type="checkbox"
  //       />
        
  //       <label htmlFor="themeToggle" 
  //         className="fuck"
  //       >
  //         <IoMoon />
  //         <IoSunny />
  //       </label>
  //     </ToggleContainer>
  //   )
  // }, [isDark, toggleDark])
}