#     1. settings

##    gatsby 프로젝트
다음 명령어를 실행합니다.
```sh
npm init gatsby
```
CMS, style, 그 외 기타 설정들을 지정하라고 하는데 하나하나 직접 세팅할 것이기 때문에 모두 none으로 선택했습니다.

##    Github  연동
저는 Github Desktop으로 실행하였습니다. gatsby 프로젝트를 setup할 때 이미 git이 설치되어 있기 때문에 **Add local repository**로 추가해줍니다.

##    [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=gatsby-plugin-mdx)
다음 명령어를 실행합니다. 
```sh
npm i gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react gatsby-remark-katex katex
```

그리고 `gatsby-config`에 다음 내용을 입력합니다.
```javascript
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-katex',
          }
        ],
        extensions: [".mdx", ".md"]
      }
    },
  ],
};

```

이제 MDX와 관련하여 더 건드릴 설정은 없습니다. 다만 차후에 `gatsby-remark-draw`이나 `gatsby-remark-plantuml`을 추가할 수는 있습니다.

##    [gatsby-plugin-emotion](https://www.gatsbyjs.com/docs/how-to/styling/emotion/)
다음 명령어를 실행합니다.
```
npm install gatsby-plugin-emotion @emotion/react @emotion/styled
```

`gatsby-config.js`에 plugin 이름만 넣어도 되지만, 문서에서 제시한 권장 설정을 따르겠습니다.

```javascript
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        sourceMap: true,
        autoLabel: "dev-only",
        labelFormat: `[local]`,
        cssPropOptimization: true,
      },
    },
  ],
};

```

##    [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/)
다음 명령어를 실행합니다.
```sh
npm install gatsby-source-filesystem
```

`gatsby-source-filesystem`의 문서에 나와있는 대로 해도 되지만, 일부러 page 내부에서는 mdx만 접근 가능하도록 설정했습니다.
```javascript
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/posts/",
      },
      extensions: [".mdx"],
      __key: "posts",
    },
  ],
};

```
보시면 알겠지만 사실 `gatsby-plugin-mdx`과 순서가 약간 꼬였습니다. 하지만 최종 크드만 같으면 문제 없습니다. 
`gatsby-source-filesystem`은 디렉토리 별로 설정을 다르게 할 수 있습니다. 저는 개별 블로그 포스트 page를 File system API로 라우팅할 예정이기 때문에 실제 post의 컨텐츠가 될 mdx 파일들은 모두 `/page` 밖에 `/post` 디렉토리에서 관리할 겁니다.

##    [gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/)
다음 명령어를 실행합니다.
```sh
npm install gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

mdx 본문에서 마크다운 문법으로 작성한 이미지 url을 **gatsby-image** 객체에 주입할 겁니다.

```javascript
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
```

##    [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)
다음 명령어를 실행합니다.
```sh
npm install gatsby-plugin-react-helmet react-helmet
```

`gatsby-config.js` 파일에 다음과 같이 추가합니다
```javascript
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    `gatsby-plugin-react-helmet`,
  ],
};
```


##    이렇게 초기 설정은 끝났습니다.

##    gatsby develop
gatsby HMR dev 서버는 다음 명령어로 동작할 수 있습니다. 참고로 `gatsby-source-filesystem`에서 `/posts` 디렉토리를 명시해놨기 때문에 `/src` 하위에  `/posts`를 생성해야 한다.

`gatsby develop`과 `npm run develop`

##    [gatsby-emotion-dark-mode](https://www.gatsbyjs.com/plugins/gatsby-emotion-dark-mode/?=Gatsby%20Emotion%20Dark%20Mode/)
다음 명령어를 실행합니다.
```sh
npm install gatsby-emotion-dark-mode
```

```javascript
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-emotion-dark-mode`,
    },
  ],
};
```

##    [gatsby-remark-embed-gist](https://www.gatsbyjs.com/plugins/gatsby-remark-embed-gist/?=gist)
다음 명령어를 실행합니다.
```sh
npm install gatsby-remark-embed-gist
```

```javascript
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins:[
          {
            resolve: "gatsby-remark-embed-gist"
          }
        ]
      }
    },
  ],
};
```


##    기타 세팅(또는 모듈)
*     react-icons
*     gatsby-plugin-sass
*     gatsby-plugin-dark-mode

*     remark-math
*     rehype-katex