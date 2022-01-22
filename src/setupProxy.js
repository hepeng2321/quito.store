
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://xxx.xxx.xxx/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      }
    })
  );
};