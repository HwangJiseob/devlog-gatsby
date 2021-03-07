/** @jsx jsx */
import React, { useContext } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';

import { Layout } from '../components/layout/Layout'
import { SEO } from '../components/SEO'

const IndexPage = () => {
  let theme = useContext(ThemeManagerContext);

  const Test = styled.div`
    color: ${theme.isDark ? "blue" : "black"};
  `
  return (
    <>
    <SEO />
    <Layout>
      사이트 준비 중
    </Layout>
    </>
  )
}

export default IndexPage