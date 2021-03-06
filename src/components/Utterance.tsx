//  https://velog.io/@iamchanii/build-a-blog-with-gatsby-and-typescript-part-4#%EB%AC%B8%EC%A0%9C%EC%A0%90

import React, { createRef, useLayoutEffect } from 'react';

const src = 'https://utteranc.es/client.js';
const repo = "HwangJiseob/devlog-gatsby"

export const Utterances: React.FC= React.memo(() => {
    const containerRef = createRef<HTMLDivElement>();
    const [theme, setTheme] = React.useState(document.body.className)

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
    }, [])

    useLayoutEffect(() => {
      // const container = document.getElementById('utterances')
      const utterances = document.createElement('script');
      const attributes = {  
          src,
          repo,
          'issue-term': 'pathname',
          label: 'comment',
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
          crossOrigin: 'anonymous',
          async: 'true'
      };

      Object.entries(attributes).forEach(([key, value]) => {
          utterances.setAttribute(key, value);
      });

      setTimeout(async ()=>{
        await containerRef.current.appendChild(utterances);
        if(containerRef.current.childNodes.length === 2){
          await containerRef.current.setAttribute('style', 'visibility: hidden;')
          const old = await containerRef.current.childNodes[0]
          await (old && containerRef.current.removeChild(old))
          await containerRef.current.removeAttribute('style') 
        }
      }, 0)
    }, [theme]);

    return <div ref={containerRef} />;
    // return <div id="utterances" />;
})