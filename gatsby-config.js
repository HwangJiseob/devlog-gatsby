module.exports = {
  pathPrefix: `/devlog-gatsby`,
  siteMetadata: {
    title: `devlog`,
    siteUrl: `https://hwangjiseob.github.io/devlog-gatsby`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devlog-gatsby`,
        short_name: `devlog`,
        start_url: `/devlog-gatsby`,
        background_color: `#fafafa`,  // light background
        theme_color: `#855988`, // 
        display: `standalone`,
        icon: `src/images/icon.png`,
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-X3YNSHRHBT`], // 측정 ID
        pluginConfig: {
          head: true
        }
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`, 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./src/posts/`,
      },
      extensions: [`.mdx`, `.md`],
      // __key: `posts`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        remarkPlugins: [
          require('remark-math'),
          require('remark-html-katex')
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-autolink`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
              elements: [`h1`, `h2`, `h3`,`h4`,`h5`, `h6`],
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: `1200px`,
            }
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },
        ],
        extensions: [`.mdx`, `.md`]
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        sourceMap: true,
        autoLabel: `dev-only`,
        labelFormat: `[local]`,
        cssPropOptimization: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    'gatsby-plugin-dark-mode'
  ],
};
