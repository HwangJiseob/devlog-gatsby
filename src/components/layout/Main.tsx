import { useContext } from 'react'
import styled from '@emotion/styled'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';

import { layout } from '../../libs/config'

const { main } = layout

export const Main = ({ children }) => {
  let theme = useContext(ThemeManagerContext)

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `
  const Container = styled.main`
    width: 100%;
    padding: 5px 10px;
    max-width: ${main.max_width};
  `
  return (
    <Wrapper><Container>
      {children}
    </Container></Wrapper>
  )
}