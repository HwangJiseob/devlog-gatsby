/** @jsx jsx */
import { useContext, useMemo, useEffect, useLayoutEffect } from 'react'
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';
import { IoSunny, IoMoon } from 'react-icons/io5'

import { vscodeDark, openColor } from '../../libs/config'
import "../../styles/test.scss"

const { background } = vscodeDark
const { gray1 } = openColor

export const ThemeToggle = () => {
  /*
    react-transition-group까지 동원했지만 도저히 reactful한 방법으로는 toggle transition을 구현할 수 없을 것 같아서 useEffect에서 DOM API로
    직접 제어하는 방법을 선택했습니다.
  */
  let {isDark, toggleDark} = useContext(ThemeManagerContext)
  useLayoutEffect(()=>{
    /*
      ThemeManagerContext의 context 변수에 변화가 생기면 document가 전부 리렌더링되기 때문에 어쩔 수 없기 context 변수와 실제 트랜지션 로직의 의존성을 
      분리하고 트랜지션이 모두 끝나고 toggleDark를 실행하는 것으로 대체하였습니다.
      이 코드를 useEffect에 넣었더니 isDark 변수가 true인 경우 마크업에서 false였던 값이 Mount 이후에 true로 변경되면서 트랜지션이 발생했습니다.
      따라서 이를 방지하고자 input의 check initializing 코드를 useLayoutEffect에 callback으로 넣었습니다.
    */
    const input = document.querySelector("#themeToggle")
    isDark ? input.setAttribute("checked", `${isDark}`) : ""
  }, [isDark])
  
  useEffect(()=>{
    const input = document.querySelector("#themeToggle")
    input.addEventListener("change", async(e)=>{
      setTimeout(()=>{
        toggleDark(!isDark)
      }, 400)
    })
  }, [isDark, toggleDark])

  return useMemo(()=>{
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
        background: ${openColor.indigo4};
        box-sizing: border-box;
        &::after {
          content: "";
          cursor: pointer;
          transition: all ease 0.4s;
          position: absolute;
          transform: translateX(-15px);
          height: 25px;
          width: 25px;
          background: white;
          border-radius: 50%;
        }
      }
      input:checked + label{
        background: #0c1145;
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
      <ToggleContainer>
        <input
          id="themeToggle"
          type="checkbox"
        />
        
        <label htmlFor="themeToggle" 
          className="fuck"
        >
          <IoMoon />
          <IoSunny />
        </label>
      </ToggleContainer>
    )
  }, [isDark, toggleDark])
}