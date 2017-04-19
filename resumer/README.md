# resumer

> 一个可以在线编辑的简历工具

## 一、有以下功能需求
1. 添加简历内容，包括个人信息、工作经历、学习经历、获奖情况、项目经历和联系方式等；
2. 更新简历内容；
3. 选择简历模板；
4. 预览简历；
5. 发布简历。

## 二、分模块
1. 顶部栏，包含 logo 和一些按钮；
2. 编辑区，包含已按钮（个人信息、工作经历、学习经历获奖情况、项目经历和联系方式等）和一些表单；
3. 预览区，可以展示 HTML 页面，可切换模板。

# 开始项目
## 一、初始化项目
1. 使用 [vue-cli](https://github.com/vuejs/vue-cli) 这个工具
```
$ mkdir resumer
$ cd resumer
$ npm init //使用 npm init 来生成一个 package.json，方便我们添加依赖

...
Press ^C at any time to quit.
name: (resumer)
version: (1.0.0) 0.1.0
description: 简历制作工具
entry point: (index.js)
test command:
git repository:
keywords:
author: xuxiaokun
license: (ISC)
...

```

2. 全局安装 vue-cli，并用 vue-cli 来初始化一个 vue 项目
```
$ npm install -g vue-cli
$ vue init webpack .   // 注意这里的 . 字符

? Generate project in current directory? Yes
  This will install Vue 2.x version of the template.

  For Vue 1.x use: vue init webpack#1.0

? Project name resumer
? Project description A Vue.js project
? Author xuxiaokun <xuxiaokun <996670910@qq.com>>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? No

   vue-cli · Generated "resumer".


$ npm i
$ npm run dev

3. 运行完 ``npm run dev`` 浏览器会自动弹出并访问了[](http://localhost:8080/#/)。

4. webpack 已经在命令行持续运行着，不要关掉它。打开 resumer 目录，看看 vue-cli 生成了什么。

```

## 二、目录结构
```
.
├── README.md
├── build             // build 目录用于存放构建脚本，比如 webpack 配置文件
├── config            // config 目录用于存放一些配置信息，比如配置打包后的 bundle 文件存放在哪里
├── index.html        // 首页
├── node_modules    
├── package.json    
├── src               // 除了首页，其他的源代码都在 src 目录里
├── static            // static 目录用于放置静态资源，比如 favicon.ico 文件等
└── test              // 单元测试等代码放在 test 目录里

```
### index.html
打开 index.html，里面就一个 div#app，但是打开 http://localhost:8080/#/ 的源代码，会发现居然多了一行：
```
<script type="text/javascript" src="/app.js"></script></body>
```
### src/
src 目录的结构如下：
```
src
├── App.vue          // App.vue 是主组件
├── assets           // assets 用于放置代码之外的资源，比如图片、字体等
├── components       // components 用于放置主组件之外的组件，vue 组件的后缀都是 .vue
├── main.js          // JS 入口文件，浏览器执行的第一行代码在这里，所以先看这里
└── router           // 路由

```

### src/main.js
```
import Vue from 'vue'
import App from './App'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

```

## 三、copy --> run --> modify
当我修改文件 App.vue 时，加个 data ，然后再看页面，浏览器报错了：
```
[Vue warn]: The "data" option should be a function that returns a per-instance value in component definitions. 
```
报错说 data 应该是个 function，后面又有报错 ESLint 插件认为我写的代码不符合规范，说：
- 花括号前面要加一个空格
- 函数的圆括号前面要加一个空格

解决方案：
在 build/webpack.base.conf.js 里，把 ESLint 给注释掉，然后重新运行 ``npm run dev``。
```
module: {
    rules: [
      //{
        //test: /\.(js|vue)$/,
        //loader: 'eslint-loader',
        //enforce: "pre",
        //include: [resolve('src'), resolve('test')],
        //options: {
          //formatter: eslintFriendlyFormatter
        //}
      //},
      {
```
现在就可以随意怎么写了~

## 四、新建三个组件
因为应用有三个部分组成：顶部栏、编辑区和预览。
所以新建三个 vue 文件：``Topbar、ResumeEditor、ResumePreview``

## 五、添加样式
1. 添加 reset.css

	```
	在 App.vue 文件中添加：
	import '.assets/reset.css'

	在 resumer/src/assets/reset.css 文件中添加：
	*{margin:0; padding:0; box-sizing: border-box; }
 	*::after, *::before{box-sizing:border-box;}
	```
  
2. 添加 normalize.css

  ```
	在 resumer/package.json 文件中添加：
	"dependencies": {
    +    "normalize.css": "^5.0.0",
         "vue": "^2.1.10",
         "vue-router": "^2.2.0"
    },

    在 resumer/src/App.vue 文件中添加：
    import 'normalize.css/normalize.css'
```

3. 将 normalize.css 和 reset.css 移到最前面

4. 使用 flex 布局

## 六、生成预览链接
首先将 ``config/index.js`` 中的 ``assetsPublicPath`` 改为 ``'/webpack-project/resumer/dist'``
然后运行：

```
$ npm run build
```
最后会生成一个 dist 目录，直接预览页面就可以了（必须是 http 协议）

# 预览

[预览地址](https://xiaokunxu.github.io/webpack-project/resumer/dist/#/)
![](http://i1.piimg.com/567571/4d22734e24497294.jpg)

## Build Setup

``` 
bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

