#   Github deploy
나중에 백엔드를 갖춘 next로 블로그를 옮길 예정이기 때문에 netlify나 vercel 대신 github pages를 이용하여 배포하였습니다.

[gatsby 공식문서](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/)에 따르면 github pages에 바로 deploy할 경우, `gatsby-config.js`에서 환경 변수를 다음과 같이 편집해줍니다.

```js
// gatsby-config.js
module.exports = {
  pathPrefix: `/devlog-gatsby`,
  // gatsby에서 github로 deploy할 때 gatsby-config.js에서 Double quotes(")를 인식하지 못하는 이슈가 있어서 모두 쌍타옴표를 모두 백틱으로 변경했습니다.
  // 참고: https://github.com/gatsbyjs/gatsby/issues/20237#issuecomment-568213829
  ...
}
```

##  Adding a Path Prefix
하나의 계정의 여러 저장소에서 페이지를 호스팅한다면, 커스텀 도메인을 쓰지 않으면 같은 도메인 영역을 사용하기 때문에 url이 중복될 수가 있습니다. 이를 방지하기 위해 도메인 뒤에 해당 사이트를 식별할 수 있는 prefix를 설정해줍니다. 또한 prefix를 설정하는 경우에는 master branch를 굳이 deploy branch로 사용할 필요가 없습니다.

참고: [Adding a Path Prefix](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)

또한 `gatsby-config.js`에서 설정한 prefix 옵션을 사용하려면 빌드 시에 해당 플래그를 더해야 합니다. github pages에 배포할 때는 자동으로 prefix를 사용하지만, prefix 옵션을 사용할 때 로컬에서 이를 serve할 때는 build시와 마찬가지로 `--prefix-paths` flag를 커맨드에 더해야 합니다. 따라서 다음과 같이 `package.json`의 `scripts` 항목을 수정하시면 됩니다.
```js
"scripts": {
  ...
  "build": "gatsby build --prefix-paths",
  "serve": "gatsby serve --prefix-paths",
  "deploy": "gatsby build --prefix-paths && gh-pages -d public -b gh-pages"
},
```