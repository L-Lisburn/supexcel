module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  indexPath: 'index.html' ,
  devServer: {
    host: "0.0.0.0",
    port: "8080",
    open: false,
    proxy: {
      '/api': {
        target: "http://192.168.1.103:5003",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            "^/api": ''
        }
      }
    }
  },
  lintOnSave: false,
}