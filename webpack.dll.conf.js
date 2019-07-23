const path = require('path');
const webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// dll文件存放的目录
const dllPath = 'vendor'

module.exports = {
  entry: {
    // common
    lodash: ['lodash'],
    rxjs: ['rxjs', 'rxjs-compat'],
    // Vue
    vue: ['vue', 'vue-router', 'vuex'],
    vue_rx: ['vue', 'vue-router', 'vuex', 'vue-rx'],
    element: ['element-ui'],
    // React
    // Angular
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: process.cwd()
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: true,
      logLevel: 'info'
    })
  ]
}
