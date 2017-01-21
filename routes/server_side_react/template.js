export default ({body, title, initialState}) =>
   `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link href="//cdn.muicss.com/mui-0.9.8/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? body : `<div>${body}</div>`}</div>
      </body>

      <script src="/dist/bundle.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.js"></script>
    </html>
  `
