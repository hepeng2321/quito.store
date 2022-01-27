
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/APIs',
    createProxyMiddleware({
      target: 'http://localhost:8003/',
      changeOrigin: true,
      pathRewrite: {
        '^/APIs': '',
      }
    })
  );
};