/** @jsx jsx */
// 출처: https://whywhyy.me/blog/2020/06/10/%EA%B3%A0%EC%98%A4%EA%B8%89%20%EB%AA%A9%EC%B0%A8(Table%20of%20Contents)%EC%9D%84%20%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90

import React from 'react'
import { Link } from "gatsby"
import { jsx, css } from '@emotion/react'

import { useActiveHash } from "../libs/useActiveHash"
import { layout, nightSky, openColor } from '../libs/config'

const { header, posts } = layout

const getHeadingIds = (
  toc,
  traverseFullDepth = true,
  recursionDepth = 1
) => {
  const idList = []
  const hashToId = str => str.slice(1)

  if (toc) {
    for (const item of toc) {
      if (item.url) {
        idList.push(hashToId(item.url))
      }
      if (item.items && traverseFullDepth && recursionDepth ) {
        // 재귀적인 items 를 하나의 리스트로 Push 한다.
        // return 이 idList 로  ...function 이 잘 동작한다!
        idList.push(
          ...getHeadingIds(item.items, true, recursionDepth + 1)
        )
      }
    }
  }
  return idList
}

const createItems = (items, activeHash, ulStyle) => {
  return (
    items &&
    items.map((item, index) => {
      const isActive = item.url === `#${activeHash}`
      return (
        <li
          key={item.url}
        >
          {item.url && (
              <Link
                  to={item.url}
                  style={ isActive ? { fontWeight: 'bold', color: nightSky.ChineseViolet  } : {}} 
                  // isActive 인지 확인하여 'bold' 할지 말지 결정한다.
              >     
                  {item.title}
              </Link>
          )}
          {/* item.items 가 list 이니 마찬가지로 재귀적으로 풀어 ul을 render 한다. */}
          {item.items &&  (
            <ul style={ulStyle}>
              {createItems(
                item.items,
                activeHash,
                ulStyle,
              )}
            </ul>
          )}
        </li>
      )
    })
  )
}

export const ToC = ({ items }) => {
  const activeHash = useActiveHash(getHeadingIds(items, true))
  const ulStyle = {
    listStyleType: 'none',
    margin: '0 0 10 0',
    padding: 0,
    paddingInlineStart: '.5rem',
    marginBlockStart: '.3rem',
    marginBlockEnd:'.3rem',
    marginLeft:'.5rem',
    '&:hover': {
      fontWeight: 'bold'
    },
  };
  return items ? (
    <nav css={css`
      color: ${openColor.gray6};
      box-sizing: border-box;
      word-break: break-all;
      padding: 0 10px;
      position: fixed;
      right: 0;
      width: calc((100% - ${posts.max_width}) / 2);
      top: calc(${header.pc_height} + 30px);

      @media screen and (max-width: 1024px) {
        display: none;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    `}>
    <ul style={ulStyle}>
        {createItems(items, activeHash,ulStyle)}
    </ul>
    </nav>
) : null
}
