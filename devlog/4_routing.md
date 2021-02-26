#     4. routing

처음에는 gatsby gatsby에서 최신으로 지원하는 file system routing으로 routing을 지정했지만, 테스트 파일을 추가하면서 버그가 있다는 것을 알았습니다. 분명 페이지에서 넘겨받는 id 인자가 다름에도 gatssby는 맨 첫 번째 쿼리 검색 결과(테스트 해본 결과 를 가져오기만 합니다. `gatsby-config.js` 문제도 아니고 그냥 단순 버그인 것 같습니다. 안 그래도 series 편입 여부에 따라 url에 series를 동적으로 편입할까 고민하고 있었는데 아예 routing 자체를 다뤄볼까 합니다.

`file system route API`(줄여서 `fs route`라고 하겠습니다.)와 `createPage API`의 차이는 다음과 같습니다.
1.  path의 customizing: `fs route`는 불가능하지만 `createPage API`는 가능합니다.
2.  page 내 graphql 사용: `fs route`는 page query를 제외하면 가능하지만 `createPage API`는 불가능합니다.(root query를 합치라고 error가 뜹니다.)

2번의 경우 인터넷을 뒤져보니까 어떤 예제에서는 page query를 사용하던데 이게 되는지는 확인해보지 않았습니다. 만약 위에 기재한 내용이 틀렸다면 수정하겠습니다.

직관적으로나 편의성으로나 2번이 1번에 비해 압도적으로 좋지만, 커스터마이징과 안정성을 따지면 결국 기존의 1번 방법을 사용할 수밖에 없었습니다.

##   검색 기능(search functionality)
[출처](https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial)에서는 search 페이지에 graphql로 모든 블로그 포스트들을 모은 다음 사용자 입력 조건에 부합하는 포스트만 렌더링하는 방식을 사용합니다. 찾아보니까 거의 대부분의 gatsby 블로그들이 serach functon을 이런 식으로 구현해놨덕누요. 하지만 모든 포스트들을 긁어오는 만큼 rawBody를 통째로 가져오면 성능이 바닥을 칠 게 뻔하니 필수적인 요소들만 가져온다고 쳐도, 결국 포스트의 양이 많아지면 자연스레 효율성이 떨어질 수밖에 없습니다.
하지만 그럼에도 gatsby에는 달리 대안이 없습니다. tag 별로 검색 결과 페이지(정확하게 말하면 분류 페이지)를 만들 수는 있지만 큰 의미는 없습니다. 차라리 series를 기준으로 분류 페이지를 만드는 게 좀 더 목적적합할 겁니다.

참고로 위 출처 페이지대로 코드를 작성하면 re-render 이슈가 발생합니다. page나 layout 컴포넌트 하위 계층의 Search 컴포넌트를 만들어서 그 안에서 로직을 돌려야 re-render 없이 동작합니다.

검색기능에 debounce를 도입하는 것도 검토하고 있습니다. 영어는 괜찮은데 한글을 입력할 때 글자가 완성되지 않으면 검색 결과가 제대로 나오지 않으니 껌뻑거리는 게 UX 절감 요소이기 때문입니다.