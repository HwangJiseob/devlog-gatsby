/** @jsx jsx */
import { useContext } from 'react'
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';

import { Layout } from '../components/layout/Layout'

// markup
const IndexPage = () => {
  let theme = useContext(ThemeManagerContext);

  const Test = styled.div`
    color: ${theme.isDark ? "blue" : "black"};
  `
  return (
    <Layout>
      사이트 정비 중
    </Layout>
    
  )
}

export default IndexPage
