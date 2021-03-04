#   Github deploy
나중에 백엔드를 갖춘 next로 블로그를 옮길 예정이기 때문에 netlify나 vercel 대신 github pages를 이용하여 배포하였습니다.

[gatsby 공식문서](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/)에 따르면 github pages에 바로 deploy할 경우, `gatsby-config.js`에 환경변수를 편집할 필요가 없지만, 대신 master branch를 deploy할 것을 강제합니다.

