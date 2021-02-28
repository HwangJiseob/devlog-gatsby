#     2. layout
##    dark theme 적용하기
[1. settings](./1_settings.md)에 `gatsby-emotion-dark-mode` 대한 설치 내용을 기록했습니다. 설치할 당시 기준으로 다운로드 수가 11밖에 안 돼서 의심스럽긴 하지만, theme 변수를 useContext로 전달해주기 때문에 css in js를 쓰는 stack에서는 이 plugin을 쓰는 게 편하다고 생각합니다.

처음에는 편했지만, 문제는 테마 변경에 따른 transition이 먹히지 않았습니다. 이틀 동안 사투를 벌인 끝에 결국 `gatsby-emotion-dark-mode`를 포기했습니다. 우선 `gatsby-emotion-dark-mode`는 React Context 기반으로 context 변수의 동기화를 위해 Mount되어 있는 모든 컴포넌트들의 rerendering을 강제합니다. 이 plugin이 잘못되었다는 것이 아니라, 애초에 컴포넌트에 context 변수를 동기화시키리면 리렌더링을 해야 하고 그렇게 되면 CSS transition syntax는 결국 사용할 수 없습니다. `react-transition-group`을 사용하더라도 결국 컴포넌트 자체가 다시 렌더링되기 때문에 자연스러운 테마 변경은 거의 불가능합니다.
따라서 `gatsby-plugin-dark-mode`를 사용하여, emotion의 `Global` 스타일 컴포넌트에서 필요한 부분만 CSS를 제어하기로 결정했습니다.

또한 `transition`을 편하게 `all`로 남발하면 테마 변경 시 transition time이 누적되어 요소 별로 테마 변경 시간이 불일치하는 문제가 발생합니다. 따라서 transition은 정확하게 필요한 요소에만 적용되도록 수정하였습니다. 그리고 사이트 최초 접속 혹은 새로고침 시 테마가 onload 이후에 적용되는 현상이 발견되었습니다. `light`나 `dark`에 관계없이 테마 트랜지션이 발생하기 때문에 이는 굉장히 심각한 버그였습니다.

하지만 해결방법은 의외로 간단했습니다. 그냥 body의 transition property를 style로 뺀 다음 일정 시간 이후에 주입시켜주면 됩니다. 참고로 dark mode 플러그인에서 테마 정보를 Local Storage에서 가져오기 때문에 useEffect callback에서 body에 동기적으로 transitoin을 주입하면 플러그인이 테마를 적용하기 전에 코드가 실행됩니다. 따라서 해당 코드는 비동기로 작성하였습니다.

##    emotion 사용하기
javascript를 쓸 때는 `emotion.js`에서 이런 코드가 가능했습니다.
```javascript
const Component = styled.div`
  color: ${props => props.color};
`
```

그런데 typescript에서는 이런 코드가 안 먹힙니다. 애초에 `css` tagged template 함수의 인자 type에 함수가 존재하지 않아서 함수를 내려보내는 순간 에러가 납니다. (물론 에러를 무시하고 함수로 내려보내도 작동은 해요. 대신 정말 tslint가 미친듯이 울리죠.) 따라서 컴포넌트에 직접 props를 주입하는 방식이 아니라 외부 목록을 바로 가져오는 방식이 권장됩니다.

```typescript
const color = "color"
const Component = styled.div`
  color: ${color};
`
```

Javascript를 사용할 때에는 React Component 밖에서 styled Component를 정의해도 됐지만, 만약 RC 내의 변수를 사용해야 한다면 얄짤없이 RC 안에 SC를 정의해야 합니다. 이게 성능에 어떤 영향을 미칠지는 잘 모르겠지만, 미적으로는 보기가 좋지 않네요...

##    design system 적용하기
design system이라고 해봐야 거창한 것 없습니다. 원래 storybook을 사용하려고 했는데, 아직 storybook에 익숙하지 않아서 추가로 학습하기가 부담스러웠습니다. 여기서 말하는 design system은 그냥 재사용 가능한 디자인 컴포넌트들을 만든다고 보면 됩니다.

###   색상
테마 컬러를 제외하면 거의 대부분 open color를 사용합니다. 그리고 웹 개발 블로그답게(?) vsCode의 default dark mode 색상을 쓰려고 했으나 막상 적용해보니 별로 예쁘지 않아서 dark mode의 색상은 인터넷에 있는 nightSky 색상을 사용했습니다.

또한 테마를 적용할 때 emotion의 `Global`을 사용하니 페이지를 이동할 때마다 css 효과가 다시 적용되는 부작용이 나타났습니다. CSS-in-JS 특성상 이런 식의 일이 잦기 때문에 바로 scss 파일을 적용하였습니다.
이 문제는 위에 [dark theme 적용하기](##dark-theme-적용하기)에서 해결하였습니다.

###   글꼴
vscode에서는 Consolas를 사용하고 있지만 Consolas는 한글을 지원하지 않기 때문에 vs code에서 한글은 굴림체로 출력됩니다.



##   에러 노트
###   Type '{ children: string; css: SerializedStyles; }' is not assignable to type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'. Property 'css' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.

[emotion-typescript](https://emotion.sh/docs/typescript)에서 해결방법을 찾았다. 굳이 `tsconfig.json`을 만들 필요 없이 `@emotion/react`에서 `jsx`를 import한 다음 jsx pragma를 스크립트 최상단에 기재하면 에러가 나지 않는다.