/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { IoMenu } from 'react-icons/io5'
import { Link } from 'gatsby'

import { layout, openColor } from '../../libs/config'
import { ThemeToggle } from './ThemeToggle'

const { main, header, mobile_768px } = layout
const { gray5 } = openColor
const items = [
  { name: "Portfolio", link: "/portfolio" },
  { name: "Posts", link: "/posts"},
  { name: "Github", link: "https://github.com/HwangJiseob"}
]

export const Header = () => {
  const clicked = useRef(false)
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

  return (
    <Wrapper>
      <Container>
        <Logo>
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
                  css={menu_item}
                  to={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <div css={more_featrues}>
              <ThemeToggle/>
            </div>
          </ul>
          <button css={more_menu}> More </button>
        </nav>
      </Container>
    </Wrapper>
  )
}

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
  height: 100%;
  max-width: ${main.max_width};
  padding: 5px 10px;
  transition: all ease 2s;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const nav = css`
  display: flex;
  align-items: center;
  overflow: hidden;

  div[class*="click"]{
    top: ${header.pc_height};
    transition: all ease-out 0.5s;
    visibility: visible;
    opacity: 1;
    display: block;
    
    ${mobile_768px}{
      position: static;

    }
  }

  ${mobile_768px}{
    ul {
    left: 100%;
    transition: all ease-out 0.5s;
    }
    ul[class*="click"]{
      left: 0;
      transition: all ease-out 0.5s;
    }
  }
`
const more_menu = css`
  all: unset;
  cursor: pointer;
  height: 100%;
  &:hover {
    color: blue;
  }
`

const more_featrues = css`
  position: absolute;
  right: 10vw;
  top: calc(${header.pc_height} / 3 * 2);
  visibility: hidden;
  opacity: 0;
  transition: all ease-out 0.5s;
  ${mobile_768px}{
    visibility: visible;
    display: block;
    transition: all ease-out 0.5s;
  }
`

const menu_items = css`
  display: flex;
  margin: 0 10px 0 0;
  padding: 0;
  gap: 10px;
  /* justify-content: space-around; */
  align-items: center;
  list-style: none;
  ${mobile_768px}{
    margin: 0;
    padding: 0;
    display: block;
    position: fixed;
    transition: all ease-out 0.5s;
    background: rgb(255, 255, 255);
    top: ${header.mobile_height};
    width: 100%;
    height: 100%;
  }
`

const menu_item = css`
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
  }
`