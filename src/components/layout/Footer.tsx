import { useContext } from 'react'
import styled from '@emotion/styled'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';

import { layout, openColor } from '../../libs/config'

const { main, footer } = layout
const { gray2, gray7 } = openColor

export const Footer = () => {
  let theme = useContext(ThemeManagerContext)

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto 0 0 0;
    min-height: ${footer.pc_height};
    background: ${gray7};
    color: ${gray2};
  `
  const Container = styled.div`
    width: 100%;
    padding: 5px 10px;
    max-width: ${main.max_width};
  `
  return (
    <Wrapper><Container>
      © Hwang Jiseob 2021. powered by gatsby
    </Container></Wrapper>
  )
}