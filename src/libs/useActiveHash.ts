// 출처: https://whywhyy.me/blog/2020/06/10/%EA%B3%A0%EC%98%A4%EA%B8%89%20%EB%AA%A9%EC%B0%A8(Table%20of%20Contents)%EC%9D%84%20%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90

import { useEffect, useState } from "react"

export const useActiveHash = (itemIds, rootMargin = undefined) => {
  const [activeHash, setActiveHash] = useState(``)
  // activeHash = 변수, setActiveHash = activeHash 의 값을 set 하는 함수, useState 상태값
  useEffect(() => {
  // useEffect 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다
  // 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방합니다.
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 콜백으로 새 요소가 나타나면 매번 실행됨!
            setActiveHash(entry.target.id)
          }
        })
      },
      { rootMargin: rootMargin || `0% 0% -80% 0%` }
      // root 는 내가 보는 viewport 임. bottom -80% 만큼 위로 올려서 Tag가 위쪽으로 와야 isIntersecting 됨
      // -80% 하지 않았다면 Tag 가 화면의 맨밑에있어도 isIntersecting 가 실행됨!
    )

    itemIds.forEach(id => { 
      // 컴포넌트가 변경될때만 실행됨 ! 즉 setActiveHash(entry.target.id) 로 인해 bold 처리가 실행될때
      observer.observe(document.getElementById(id))
    }) 


    return () => {
      itemIds.forEach(id => {
        // observer.observe(document.getElementById(id)) 실행되기전 실행됨 clean up 과정임
        observer.unobserve(document.getElementById(id))
      })
    }
  }, [itemIds,rootMargin])

  return activeHash
}