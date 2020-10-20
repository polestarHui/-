import { defineConfig } from 'umi';
let base = 'http://192.168.31.15:9201/';

export default defineConfig({
  publicPath: '/static/',
  title: '河北省地矿局第八地质大队云计算平台',
  theme: {
    'primary-color': '#F5AF33',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  proxy: {
    '/api': {
      target: base + '/api',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
    '/rest': {
      target: base + '/rest',
      pathRewrite: { '^/rest': '' },
      changeOrigin: true,
    },
    '/layout': {
      target: base + '/layout',
      pathRewrite: { '^/layout': '' },
      changeOrigin: true,
    },
  },
});
