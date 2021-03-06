#     6. Table of Contents
toc의 가장 정석적인 구현은 포스트 맨 상단(제목 바로 아래)에 배치하고, 해당 제목을 클릭하면 제목 위치로 이동하는 기능을 구비하는 겁니다. 하지만 요즘 블로그에서는 이런 방식보다는 우측 여백 공간에 toc를 고정시켜놓고, 페이지 위치에 따라 제목을 highlight하는 구현 방법을 많이 채택합니다. 이 블로그에서도 후자를 구현하였습니다.

ToC에 많은 시간을 쏟기가 싫어서 [출처](https://whywhyy.me/blog/2020/06/10/%EA%B3%A0%EC%98%A4%EA%B8%89%20%EB%AA%A9%EC%B0%A8(Table%20of%20Contents)%EC%9D%84%20%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)의 코드를 활용하였습니다. 문제가 있다면 header들이 다닥다닥 붙어 있을 때 header를 정확하게 인식을 못하는데, 이는 IntersectionObserver의 한계라고 짐작하고 있습니다. 정 안 되면 클릭 시에 해당 ToC 제목의 스타일을 변경하는 것으로 대체할 수도 있는데 급한 문제는 아니어서 수정하지는 않았습니다.

대신 이전에 스크롤을 올리면 header를 나타나게 설정했는데, ToC의 링크를 눌러서 해당 제목으로 '올라가면' header가 나타나 제목을 가리게 되었습니다. 이는 이동 간격이 일정 수준 이상이면 header가 나타나지 않도록 분기처리를 하여 해결했습니다.

remark와 mdx에서의 graphql로 toc를 접근하면 다른 반환값을 반환합니다. remark에서는 string으로 반환하지만, mdx에서는 object로 반환합니다. 이 때문에 ToC를 마크업하는 javascript 로직에 차이가 있습니다.


##    버그
테스트를 해보니 heading을 통해서 위치를 이동할 경우, page가 다시 reload되면서 embed가 깜빡거리는 현상이 발생했습니다. 

##    progressbar
블로그의 포스트를 읽으면서 스크롤을 내리면, 상단에 상태바가 점점 차는 효과를 구현한 블로그들이 많습니다. 하지만 개인적으로 포스트를 읽는 입장에서 상태바는 약간 거슬렸습니다. 포스트 컨텐츠에 집중할 수 있도록 header도 내리는 중에는 보이지 않도록 처리했는데 상태바는 말할 것도 없죠. 하지만 toc만으로는 얼만큼 읽었는지 알기가 어렵기 때문에, header가 visible할 때만 progressbar도 보이도록 만들 예정입니다.