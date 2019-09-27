/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */


import React from "react";
export function onRenderBody(
  { setHeadComponents }
) {
 setHeadComponents([
  <script src='//cdn.freshmarketer.com/464989/1423120.js'></script>
  ]);
}


/* Hotjar

const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  if (process.env.NODE_ENV === `production`) {
    const {id, sv, host} = pluginOptions
    return setPostBodyComponents([
      <script
        key={`gatsby-plugin-hotjar`}
        dangerouslySetInnerHTML={{
          __html: `
          <!-- Hotjar Tracking Code for www.ayr.no -->
          <script>
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${id},hjsv:${sv}};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          </script>
          `,
        }}
      />,
    ])
  }

  return null
} 

export default onRenderBody */