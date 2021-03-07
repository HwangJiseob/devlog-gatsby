//  https://velog.io/@iamchanii/build-a-blog-with-gatsby-and-typescript-part-4#%EB%AC%B8%EC%A0%9C%EC%A0%90

import React, { createRef, useLayoutEffect } from 'react';

const src = 'https://utteranc.es/client.js';
const repo = "HwangJiseob/devlog-gatsby"

export const Utterances: React.FC= React.memo(() => {
    const containerRef = createRef<HTMLDivElement>();
    const [theme, setTheme] = React.useState('')

    useLayoutEffect(()=>{
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if(mutation.attributeName === 'class'){
            setTheme(document.body.className)
          }
        });
      });
      const config = { attributes: true };
      observer.observe(document.body, config);

      const utterances = document.createElement('script');
      const attributes = {  
          src,
          repo,
          'issue-term': 'pathname',
          label: 'comment',
          theme: document.body.className === 'dark' ? 'github-dark' : 'github-light',
          crossOrigin: 'anonymous',
          async: 'true'
      };

      Object.entries(attributes).forEach(([key, value]) => {
          utterances.setAttribute(key, value);
      });

      containerRef.current.appendChild(utterances);
    }, [])

    useLayoutEffect(() => {
      // 출처: https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
      const iframes = [...document.getElementsByTagName('iframe')]
      const [ utterances ] = iframes.filter(iframe => iframe.className === 'utterances-frame')
      if(utterances){
        const message = {
          type: 'set-theme',
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        };
        utterances.contentWindow.postMessage(message, 'https://utteranc.es');
      }
    }, [theme]);

    return <div ref={containerRef} />;
})