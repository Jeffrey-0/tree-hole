
// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         // 配置路径映射
//         assets: '@/assets',
//         common: '@/common',
//         components: '@/components',
//         network: '@/network',
//         views: '@/views'
//       }
//     }
//   },
//   devServer: {
//     // port: 3000,
//     // proxy: 'https://jsonplaceholder.typicode.com/', // 配置代理
//     hot: true, // 保存自动刷新
//     proxy: {
//       "/baiduApi": {
//           target: "https://aip.baidubce.com/",// 要访问的接口域名
//           ws: true,// 是否启用websockets
//           changeOrigin: true, 
//           pathRewrite: {
//               '^/baiduApi': '' 
//           }
//       }
//     }
//   }
// }
