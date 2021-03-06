/** @jsx jsx */
import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { Link, navigate } from 'gatsby'

import { layout, openColor, nightSky } from '../../libs/config'
import { ThemeToggle } from './ThemeToggle'
import { TocNavigator } from '../../libs/contexts'

const { main, header, mobile_768px } = layout

const items = [
  { name: "About", path: "/about"},
  { name: "Works", path: "/works" },
  { name: "Posts", path: "/posts"},
  { name: "Github", path: "https://github.com/HwangJiseob/devlog-gatsby"}
]

export const Header = () => {
  const clicked = useRef(false)
  const headerShow = useRef(true)
  const tocClick = React.useContext(TocNavigator)

  const scroll_num = useRef(0)

  useEffect(()=>{
    const [ nav ] = document.getElementsByTagName('nav')
    const [ list ] = nav.getElementsByTagName('ul')
    const [ menu ] = nav.getElementsByTagName('button')
    const [ more ] = nav.getElementsByTagName('div')
    menu.addEventListener('click', (e)=>{
      clicked.current = !clicked.current
      if(clicked.current){
        list.classList.add('clicked')
        more.classList.add('clicked')
      } else {
        list.classList.remove('clicked')
        more.classList.remove('clicked')
      }
    })
  }, [])

  useEffect(()=>{
    let prev = 0
    const hoverSpace = document.querySelector('.hoverSpace')
    document.addEventListener('scroll', (e)=>{
      if( scroll_num.current < 2 ){
        scroll_num.current++
        return
      }
      e.preventDefault()
      const next = document.documentElement.scrollTop
      const headerEl = document.querySelector('.header')
      if(( (next - prev) < 0) && !tocClick.onToc ){
        headerShow.current = true
        headerEl.setAttribute('style', `top: 0px;`)
        hoverSpace.setAttribute('style', 'display: none;')
        tocClick.toggleOnToc(false)
      } else {
        headerShow.current = false
        headerEl.setAttribute('style', `top: -65px;`)
        hoverSpace.setAttribute('style', 'display: block;')
        // calc(-${header.pc_height - 5px})이 동작을 안 한다.
      }
      prev = next
    })
  },[tocClick])

  return (
    <>
    <Wrapper className="header">
      <Container>
        <Logo onClick={()=>{navigate("/")}}>
          Hwang Jiseob
        </Logo>
        <nav css={nav}>
          {/* 하나의 css 안에서 자식 요소들까지 모두 컨트롤 해야 할 듯 */}
          <ul
            css={menu_items}
          >
            {items.map((item, key) => (
              <li key={key}>
                <Link
                  className="menu_item"
                  css={menu_item}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <div css={more_featrues}>
              <ThemeToggle clicked={clicked}/>
            </div>
          </ul>
          <button css={more_menu}> <span className="menu_item" css={menu_item}>More</span> </button>
        </nav>
      </Container>
    </Wrapper>
    <HeaderSpace/>
    <HoverSpace
      className="hoverSpace"
      style={ headerShow.current ? {pointerEvents: 'none'} : null}
      onMouseOver={()=>{
        const hoverSpace = document.querySelector('.hoverSpace')
        const headerEl = document.querySelector('.header')
        const top = (headerEl.getAttribute('style')).split(';')[0].split(':')[1]
        if(headerShow.current){
        } else {
          headerShow.current = true
          headerEl.setAttribute('style', `top: 0px; transition: top 0.5s, background-color 0.5s;`)
          setTimeout(()=>{
            hoverSpace.setAttribute('style', 'display: none;')
          },0)
        }
      }}
    />
    </>
  )
}
const Wrapper = styled.div`
  position: fixed;
  background: linear-gradient(90deg, rgba(133,89,136,1) 18%, rgba(107,73,132,1) 47%, rgba(72,52,117,1) 79%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  top: 0; // 초기값.
  transition: top 0.5s, background-color 0.5s;
  height: ${header.pc_height};
`


const HeaderSpace = styled.div`
  width: 100%;
  height: ${header.pc_height};
`

const HoverSpace = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: ${header.pc_height};
`


const Container = styled.div`
  display: flex;
  z-index: 20;
  color: ${openColor.gray1};
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: ${main.max_width};
  padding: 5px 10px;
  /* transition: all ease 0.5s; */
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transition: color ease 0.5s;
  &:hover{
    transition: color ease 0.5s;
    color: ${nightSky.Cetacean_Blue};
  }
`

const nav = css`
  display: flex;
  align-items: center;
  overflow: hidden;

  div[class*="click"]{
    top: calc(${header.pc_height} + 10px);
    /* transition: all 0.5s; */
    visibility: visible;
    opacity: 1;
    display: block;
    
    ${mobile_768px}{
      /* transition: all 0.5s; */
      position: static;
    }
  }

  ${mobile_768px}{
    ul {
      left: 100%;
      transition: left 0.5s;
      z-index: 10;
      padding: 10px;
      & li {
        font-size: 24px;
        margin-bottom: 10px;
      }
    }
    ul[class*="click"]{
      left: 0;
      transition: left  0.5s, background-color 0.5s;
      transition: left 0.5s, background-color 0.5s;
    }
  }
`
const more_menu = css`
  all: unset;
  cursor: pointer;
  height: 100%;
`

const more_featrues = css`
  position: absolute;
  right: max(5px, calc((100vw - ${main.max_width})/2 - 15px));
  top: calc((${header.pc_height} / 3) * 2);
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;
  ${mobile_768px}{
    transition: all 0.5s;
    visibility: visible;
    display: block;
    position: static;
    opacity: 1;
  }
`

const menu_items = css`
  display: flex;
  margin: 0 20px 0 0;
  padding: 0;
  gap: 20px;
  /* justify-content: space-around; */
  align-items: center;
  list-style: none;
  ${mobile_768px}{
    margin: 0;
    padding: 0;
    display: block;
    position: fixed;
    /* transition: all ease-out 0.5s; */
    background: #fafafa;
    top: ${header.mobile_height};
    width: 100%;
    height: 100%;
  }
`

const menu_item = css`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  padding: 5px 0;
  transition: color 0.5s, border-bottom 0.5s;
  font-weight: bold;
  &:hover {
    transition: color 0.5s, border-bottom 0.5s;
    border-bottom: 3px solid ${nightSky.St_Patrick_Blue};
    color: ${nightSky.St_Patrick_Blue};
  }
`