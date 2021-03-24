
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置路径映射
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
