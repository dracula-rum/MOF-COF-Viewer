# structure

--web 
      --dist 
            --assets
            --data    //存数据?
      --node_modules  //依赖模块
      --public 
            --data    //存数据?
      --src 
            --assets  //js包
            --components
            --router  
                  --index.ts //设置路由
            --server_web     //服务端
                  --app.js   //服务端主函数
                  --db.js    //数据库
                  --import_data.js  //数据导入
                  --test.js  //测试
            --views          //页面
                  --conv.html
                  --display.vue
                  --display2.vue
                  --edit.vue
                  --tst.html
                  --viewer_3dmoljs.vue
            --App.vue        //vue主页面  
            --main.ts        //客户端主函数
            --style.css      //主样式
            --vite-env.d.ts  //使用vite打包工具
      --auto-imports.d.ts
      --components.d.ts      
      --index.html      //html主页面
      --package.json
      --pnpm-lock.yaml
      --readme.md       //说明文档
      --tsconfig.json
      --tsconfig.node.json
      --vite.config.ts  //在这里配置跨域访问


# run
powershell_1
D:\workspace\VueProjects\web> cd src/server_web 
D:\workspace\VueProjects\web\src\server_web> node app.js
powershell_2
D:\workspace\VueProjects\web> pnpm dev


# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
