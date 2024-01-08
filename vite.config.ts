import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    inject({
      $: "jquery",  // 这里会自动载入 node_modules 中的 jquery
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ],
  server:{
    open:true,//自动打开浏览器
    host:"127.0.0.1",//web服务器可以由哪个地址访问
    port:3001,//服务器启动端口
    cors: true, // 允许跨域
    proxy:{
      '/apiTest': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
        target: 'http://localhost:8080/',
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace('/apiTest', '') //重写匹配的字段，如果不需要放在请求路径上，可以重写为""
      }
  }

  },
  
})
