const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://47.93.201.127:5748',
      changeOrigin: true,
    })
  );
};