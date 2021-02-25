#     4. routing

처음에는 gatsby gatsby에서 최신으로 지원하는 file system routing으로 routing을 지정했지만, 테스트 파일을 추가하면서 버그가 있다는 것을 알았습니다. 분명 페이지에서 넘겨받는 id 인자가 다름에도 gatssby는 맨 첫 번째 쿼리 검색 결과(테스트 해본 결과 를 가져오기만 합니다. `gatsby-config.js` 문제도 아니고 그냥 단순 버그인 것 같습니다. 안 그래도 series 편입 여부에 따라 url에 series를 동적으로 편입할까 고민하고 있었는데 아예 routing 자체를 다뤄볼까 합니다.

`file system route API`(줄여서 `fs route`라고 하겠습니다.)와 `createPage API`의 차이는 다음과 같습니다.
1.  path의 customizing: `fs route`는 불가능하지만 `createPage API`는 가능합니다.
2.  page 내 graphql 사용: `fs route`는 page query를 제외하면 가능하지만 `createPage API`는 불가능합니다.(root query를 합치라고 error가 뜹니다.)

2번의 경우 인터넷을 뒤져보니까 어떤 예제에서는 page query를 사용하던데 이게 되는지는 확인해보지 않았습니다. 만약 위에 기재한 내용이 틀렸다면 수정하겠습니다.

직관적으로나 편의성으로나 2번이 1번에 비해 압도적으로 좋지만, 커스터마이징과 안정성을 따지면 결국 기존의 1번 방법을 사용할 수밖에 없었습니다.