#     3. mdx

layout의 초안을 완성하였으니 이제 mdx를 연동할 차례입니다.

##    외부 리소스 연동
###   youtube
youtube 영상을 iframe에 연동하려면 embed url을 따로 써야하지만, 일반 view url을 입력하면 embed url로 변환하는 로직을 추가하였습니다. 또한 size를 full과 half로 나누어 각각 post max width 수치에 따라 동적인 비율을 유지할 수 있도록 parameter를 구현했습니다. 또한 youtube embed에 대해 [responsive size](https://webclub.tistory.com/308)를 구현하였습니다.
추후에 유튜브 동영상 리스트처럼 썸네일만 표시하다가 마우스를 대면 영상이 일정 부분 재생되는 hover, 그리고 클릭하면 재생되면 효과를 구현해보고 싶습니다만, 나중에 여유가 되면 구현해볼 생각입니다.

###   gist
####  migration from gatsby-remark-embed-gist to super-react-gist
기존에 사용하던 `gatsby-remark-embed-gist`를 버리고 `super-react-gist`를 사용하기로 결정했습니다.

####  gatsby-remark-embed-gist
`gatsby-config.is`를 바꾸는 내용은 [1. settings](./1_settings.md)에 나와있습니다.
remark가 아니라 mdx를 사용할 때 플러그인에서 css를 불러오지 못하는 버그가 있습니다. 따라서 우회적으로 플러그인 문서에 있는 css 파일을 import합니다. 단, 항상 import를 하게 되므로 성능은 무조건 하락합니다. dynamic import를 page Component 안에 하면 새로 고침 시 디자인이 적용되는데 시간이 걸려서 아예 전역 import를 하였습니다. 성능 하락을 방지하려면 gist 호출 syntax가 있는 post에만 아래 `link` 태그를 넣어줘야 하는데, 이걸 글 작성 때마다 넣어주는 건 너무 불편하므로 저는 전역으로 import하는 방법을 선택했습니다.

이 플러그인은 gist 페이지처럼 코드 상단에 파일명을 넣지 않습니다. gist와 완전히 똑같은 디자인을 적용하지 않은 게 약간 아쉽습니다. 또한 플러그인이 자체적으로 마크업을 하다보니 플러그인을 뜯어고치지 않는 이상 gist 데이터를 토대로 한 커스터마이징이 거의 불가능합니다. 그래서 `react-embed-gist`도 써보려고 하는데, 파일명을 h1으로 마크업할 것을 강제하기 때문에 본 프로젝트에서는 사용하지 않기로 결정했습니다.

gist가 추가될 때 padding이 viewport를 벗어나는 문제를 `box-sizing`으로 해결했습니다. 다만 모든 padding을 가지는 layout에 줄 필요는 없습니다.

```html
<link rel="stylesheet" type="text/css" defer href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css" />
```

###   katex
katex를 mdx에 연동하는 것 역시 만만치 않았습니다. 처음에는 `remark-plugin-katex`를 썼는데 렌더링이 되지 않았습니다. 확인해보니 `remark-plugin-katex`가 mdxAST까지는 진입하지만 그 이후에 마크업을 전혀 하지 못했습니다. 이를 해결하려면 `remark-plugin-katex` 대신 `remark-math`와 `remark-html-katex`를 직접 `require()`로 import 해야 합니다. [출처](https://github.com/gatsbyjs/gatsby/issues/20538#issuecomment-721845436)에서는 `remark-math`의 버전을 3으로 downgrade하라고 하지만 2020-02-24 기준으로 4.0.0도 정상 작동합니다.

추가: 개발을 하던 도중에 갑자기 katex style이 적용이 되지 않았습니다. 확인해보니 마크업은 정상적으로 되지만 css가 적용되지  않는 문제였습니다. 그리고 제 프로젝트에서만 그런지는 모르겠지만 `remark-plugin-katex`를 제거하니까 mdxAST에 math type 자체를 인식을 못하는 문제가 발생했습니다. 따라서 `reemark-plugin-katex`도 쓰고 katex css 파일도 import하여 해결하였습니다.

mdx와 katex를 연동하면서 이렇게까지 mdx를 써야하나 자괴감을 많이 느꼈습니다...

###   codesandbox
추후 연동 예정

##    내부 스타일링
###   Code highlight
[공식문서](https://mdxjs.com/guides/syntax-highlighting),
[Migrating from gatsby-remark-prismjs to prism-react-renderer](https://prince.dev/prism-react-renderer)

테마까지 하고 싶으면 공식문서 대신 포스트를 참고하면 됩니다.

여기에 line numbering과 line highlight까지 추가할 예정입니다.

###   단 나누기
단을 컴포넌트로 나누면서 컴포넌트 안에서는 md를 비롯한 remark도 전부 먹히지 않는다는 것을 뒤늦게 깨달았습니다. gist는 `react-gist`, katex는 `react-katex`로 migration하였습니다. 단 `gatsby-remark-katex`를 폐기하진 않았기 때문에 katex syntax는 사용 가능합니다. gist는 폐기하였습니다.

추가로 `react-gist`는 스크롤바가 임의로 붙는 문제가 있어 `super-react-gist`로 갈아탔습니다.

하지만 이는 근본적인 해결책이 아닙니다. `Column` gist와 katex를 특정 컴포넌트로 대체한다면 결국 컴포넌트 안에 들어가는 children들을 모두 mdx 문법에 따라 html로 마크업해야 합니다. 하지만 직접 parsing 및 마크업 과정을 조작하는 건 매우 복잡하므로 children으로 들어오는 string을 `remark`를 통해 마크업한 다음, `dangerouslySetInnerHTML`으로 주입하는 방법이 그나마 현실적입니다. 
하지만 구현 과정에서 `remark`로 마크업하지 않고 차세대 마크다운 파서인 `micromark`를 사용했습니다. 그리고 katex나 gist를 고려하는 것도 힘들어서 그냥 GFM Syntax만 지원하게끔 구성하였습니다. 구현방법은 `Column` 컴포넌트에 들어오는 children의 속성값을 점검해서 text인 경우 `micromark`를 통해 html 마크업 string으로 변환한 다음 `div`에 `dangerouslySetInnerHTML`로 주입하고 React Component면 그냥 반환하게 만들었습니다. 깔끔하지는 않지만 렌더링 시점이나 seo 측면에서나 사실 기능적으로 더 건드릴 게 없어서 이 방법을 사용하였습니다.

###   슬라이드 포맷
추후 연동 예정