---
title: Test title 테스트 제목
date: 2020-02-23
tags: ["test", "테스트"]
series: test 시리즈
thumbnail: "../images/Javascript.jpg"
description: md syntax와 mdx custom component 렌더링의 적용 여부 테스트
---

# MD Syntax
대부분의 마크다운 요소들은 custom component로 override하지 않았습니다. 디자인 측면 외에

## heading and toc
모든 deps의 heading이 ToC(Table of Contents)로 구성됩니다. 이 ToC는 화면의 Y축 위치에 따라 `intersectionObserver`가 어느 heading의 컨텐츠를 사용자가 보고 있는지 판단하여 해당 부분의 heading을 highlight합니다. 또한 `gatsby-remark-autolink-headers`를 이용하여 문서 내에서 해당 heading으로 이동할 수 있는 navigator 기능도 구현하였습니다.

## Inline Code
아래는 MD Syntax 중 `code`를 `prism-react-renderer`을 이용해 redesign한 것입니다. language별 syntax highlight은 해당 모듈에서 기본으로 제공하지만, title 표시나 line numbering은 custom으로 추가하였습니다. 후에 line highlight까지 추가할 예정입니다.
```js:title=example-file.js
const hello = (param) => {if(param){ return param++ }}
// 주석
```

##  katex
katex는 사실 MD Syntax는 아니지만 remark plugin을 이용한 확장 문법이기 때문에 여기에 넣었습니다.

$$
a^2 + b^2 = c^2
$$

## others

만약 heading을 다닥다닥 붙여놓으면 `intersectionObserver`가 판단을 하기가 어려워져서 highlight가 제대로 작동하지 않습니다.

다음은 MD Syntax 중 `link`의 style을 오버라이드한 것입니다 : [구글 홈페이지](https://www.google.com)

다음은 MD Syntax 중 `inlineCode`의 style을 오버라이드한 것입니다: `javascript`

아래는 MD Syntax 중 `hr`의 style을 오버라이드한 것입니다.
***

아래는 `gatsby-remark-images`를 이용하여 MD Image를 Gatsby Image로 렌더링한 것입니다.

![alt description](../images/freeImage_maybe.webp)


`ul`, `ol`은 그냥 넣었습니다.
* list item 1
  * list item 2
    * list item 3

1. first
2. second
3. third

- [x] Write the press release

> 인용구

footnote[^1]

<br/>

# MDX Custom Components

## Youtube
Youtube는 ratio를 이용해 레이아웃 내의 크기를 조절할 수 있습니다. 또한 원래 Youtube embed를 사용하려면 embed url을 사용해야 하지만, 복붙하기 편하게 url string을 embed로 변환하는 코드를 추가하였습니다.

<Youtube src="https://www.youtube.com/watch?v=Ta6ERXcsBYE" ratio="50" />

##  Code
mdx syntax에서는 component child에 curly bracket이 operator로 취급되기 때문에 props로 넘겨야 하는 단점이 있습니다.
<Code
  language="javascript"
  title="example-file.js"
  script={`
const hello = (param) => {if(param){ return param++ }}
const hello = (param) => {if(param){ return param++ }}
`}
/>

## Columns
예전부터 디자인이 아닌 document model로서의 column을 구현하고 싶었습니다. 그래서 mdx로 비슷하게 구현을 했지만, 여전히 한계점이 많습니다. 특히 두 section을 비교하는데 너비가 충분하지 않아 scrollbar가 생기는 걸 post layout보다 columns의 너비를 키우는 방식으로 해결하려고 했지만, 생각보다 쉽지 않았습니다.

<Columns>
  <Column>
    <Youtube src="https://www.youtube.com/watch?v=Ta6ERXcsBYE" ratio="50" />
  </Column>
  <Column>
    ## test title<div/>
    ### 흐름<div/>
    문단
    <Code 
  language="javascript"
  script={`
const hello = (pram) => {if(param){ return param++ }}
const hello = (pram) => {if(param){ return param++ }}
  `}
    />
    <BlockMath>
      a^2 + b^2
    </BlockMath>
  </Column>
</Columns>



##  Gist
원래 gist 확장 문법이 있었으나 디자인을 수정하기 어렵다는 점에서 `super-react-gist`로 구현하였습니다. `Youtube` 컴포넌트와 마찬가지로 일반 url을 붙여넣으면 자동으로 parsing해서 embed를 가져옵니다.

<Gist url='https://gist.github.com/GeorgeGkas/5f55a83909a3f5b766934ffe802d30df#file-start-js' />


# others
##  Table? Column?
사실 MD Syntax의 table을 override하는 방식으로 Column을 구현할 수 있습니다. 하지만 table을 사용해야 하는 다른 상황에서도 column의 사용양식을 강제해야 하기 때문에 column 컴포넌트는 table과 별도로 필요합니다.

|    |
| :---:        |    :---:   |
| <Gist  url='https://gist.github.com/GeorgeGkas/5f55a83909a3f5b766934ffe802d30df#file-start-js' />      | <Youtube src="https://www.youtube.com/watch?v=Ta6ERXcsBYE" size="half" ratio="100" /> |

##  나중에 추가할 mdx 컴포넌트
`social card`나 `codesandbox`는 의외로 빨리 끝날 것 같은데, 아무래도 `slideshow` 이게 좀 힘들 것 같습니다.
* social card
* codesandbox
* slideshow



Reference
footnote는 어디에 배치하던 항상 문서의 마지막에 위치하게 됩니다.

[^1]:  first footnote