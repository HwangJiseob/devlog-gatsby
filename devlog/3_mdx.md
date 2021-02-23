#     3. mdx

layout의 초안을 완성하였으니 이제 mdx를 연동할 차례입니다.


##    외부 리소스 연동
###   youtube
youtube 영상을 iframe에 연동하려면 embed url을 따로 써야하지만, 일반 view url을 입력하면 embed url로 변환하는 로직을 추가하였습니다. 또한 size를 full과 half로 나누어 각각 post max width 수치에 따라 동적인 비율을 유지할 수 있도록 parameter를 구현했습니다. 또한 youtube embed에 대해 [responsive size](https://webclub.tistory.com/308)를 구현하였습니다.
추후에 유튜브 동영상 리스트처럼 썸네일만 표시하다가 마우스를 대면 영상이 일정 부분 재생되는 hover, 그리고 클릭하면 재생되면 효과를 구현해보고 싶습니다만, 나중에 여유가 되면 구현해볼 생각입니다.