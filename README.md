# MOF/COF膜材料性质数据库网页开发



### 技术栈

- 数据库：mysql

- 后端：node.js

- 前端：

  Vite + Vue3+ TypeScript ，不是纯typescript，有javascript

  Element Plus 组件库，实现界面布局

- 分子可视化：3dmol.js



### **运行命令**

- 保证数据库开启

- 后端 

  cd src/server_web

  node app.js

- 前端 

  pnpm dev




### 源码

- web  根目录，所有源码都在此目录下

- dist 从本地项目打包到服务器上时生成的静态资源

- node_modules 依赖包，部署项目时使用pnpm install/npm install生成

- public/data  cif文件

  - public/data/cof cof材料，还未使用

  - **public/data/mof mof材料的cif文件，一共10w+个**

  - public/data/test 测试使用数据

- src

  - assets 静态资源，实现分子可视化的3dmol.js包就存储在这里

  - **router/index.ts 设置路由，即.vue文件和页面地址的映射**

  - **server_web 存放后端代码**

    1. .env 连接mysql数据库时的信息
    2. insert_mol.js **把通用数据库数据插入到mysql中**
       - 读取public/data/mof中的.cif文件信息到mysql的表mol中
       - 把src/server_web/data中jichu.csv(通用数据库性质)插入到mysql的表mol中
    3. insert_property.js **把专用数据库数据插入到mysql中**
       - 把src/server_web/data中rd1,rd2,rd3,hun1d,hun2d,hun3d(专用数据库性质)分别插入到mysql的表rd1,rd2,rd3,hun1d,hun2d,hun3d中
       - 调用了db.property.js中的函数，db.property.js把数据库sql语句封装在函数中
    4. app.js **后端启用代码，实现前后端对接，提供后端访问地址**
       - 调用了db.js中的函数，db.js把数据库sql语句封装在函数中

  - views

    home.vue 封面

    showall.vue 所有数据的列表

    showone.vue 展示某个材料的结构和性质

- vite.config.ts 提供前端访问地址，使用cors实现跨域访问使前后端数据互通



### 开发思路

- 数据

  1. 10w+个.cif文件，存储在public/data中

  2. 11个.csv文件，用了7个(jichu,rd1,rd2,rd3,hun1d,hun2d,hun3d)，存储在src/server_web/data中

     > .csv文件是怎么来的？
     >
     > 老师给了excel文件，我们使用get_excel_data.ipynb分别读取7个文件，一共11个表（其中混合组分中每个excel文件包含2-3个子表），生成了11个.csv文件。

- 将数据导入到mysql数据库中

  1. mysql建表
  2. 把数据导入到对应的表中，核心代码见src/server_web目录下insert_mol.js和insert_property.js

- 后端开发

  1. 使用sql语句操作数据库，存取数据  src/server_web/db.js
  2. 发送/接收前端数据，实现前后端对接 src/server_web/app.js
  3. 提供后端访问地址，启动后端       src/server_web/app.js

- 前端开发 src/views



### 前端搭建项目操作步骤

Vite + Vue3+ TypeScript

- 创建项目

  ```
  pnpm create vite@latest web
  ```

- 初始化项目，生成node_modules

  ```
  pnpm install
  ```

- 启动项目 

  ```
  pnpm dev
  ```

- 安装路由并配置路由，修改/router/index.ts,main.ts,App.vue

  ```
  pnpm install vue-router@4
  ```

- 安装element-plus并按需导入，安装和导入图标

  ```
  pnpm install element-plus
  ```



### 把项目部署到服务器上

升级node和npm:

- 在Ubuntu20.04LTS上，官方默认的软件仓库中提供的Node.js和npm的软件包版本为

  node v10.x.x，npm6.x.x

- 使用apt获取不到较新的版本

- 使用NodeSource PPA安装较新版本

将nodejs项目部署到服务器上

- 复制除node_modules的文件到服务器
- 保证服务器有nodejs环境，最好是相同版本
- 在项目文件目录下输入npm install生成node_modules

*为什么没有前后端分离：*

- 后端文件夹server主要负责与数据库交互，需要访问data文件并保存路径到数据库中。
- data文件必须在前端文件夹web目录之下，才能被读取内容。

本机远程访问服务器启动项目：

- 设置防火墙规则开放使用的端口号
- 修改app.js vite.config.ds里地址，将localhost/127.0.0.1修改为服务器地址或者0.0.0.0

nvm:

- 管理nodejs的工具，可以安装不同版本的nodejs
- nvm安装的nodejs不是全局安装

mysql命令：

- 登录 mysql -uroot -p
- 查看所有数据库 show databases;
- 使用数据库 use mol_sys;
- 查看所有表 show tables；
- 查看表内容 select * from mol_attri;
- 退出 ctrl+D

运行

- 后端 node app.js
- 前端 pnpm dev





