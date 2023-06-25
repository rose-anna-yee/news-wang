const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
           //表示存储当前数据的目标路径
            target: 'https://i.maoyan.com',
            changeOrigin: true,
        })
    );
}