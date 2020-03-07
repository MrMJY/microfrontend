---

---

## 微前端项目实践

### 前端微服务化后的优势

+ 复杂度可控: 每一个UI业务模块由独立的前端团队开发,避免代码巨无霸,保持开发时的高速编译,保持较低的复杂度,便于维护与开发效率。
+ 独立部署: 每一个模块可单独部署,颗粒度可小到单个组件的UI独立部署,不对其他模块有任何影响。
+ 技术选型灵活: 也是最具吸引力的,在同一项目下可以使用如今市面上所有前端技术栈,也包括未来的前端技术栈。
+ 容错: 单个模块发生错误,不影响全局。
+ 扩展: 每一个服务可以独立横向扩展以满足业务伸缩性，与资源的不必要消耗

### 我们何时需要前端微服务化?

+ 项目技术栈过于老旧,相关技能的开发人员少,**功能扩展吃力,重构成本高,维护成本高.**
+ **项目过于庞大,代码编译慢,开发体验差,需要一种更高维度的解耦方案**.
+ **单一技术栈无法满足你的业务需求**

### 技术栈

+ [SystemJS](https://github.com/systemjs/systemjs)    一个模块加载器
+ [Single-spa](https://single-spa.js.org/)  一款前端微服务框架
+ Vue 相关的技术栈（Vue-cli, vuex, vue-router）
+ 相关的一些插件（systemjs-webpack-interop、single-spa-vue）

### 单体应用对比前端微服务化

**普通的前端单体应用**

一个前端模块对于多个后端微服务

![](https://static.alili.tech/images/micro/current.png)

**微前端架构**

![](https://static.alili.tech/images/micro/mf.png)

### 项目目录

#### root-config文件夹

```
|-- src
    |-- activity-functions.js	   路由匹配是否加载
    |-- index.html
    |-- root-config.js			   注册子应用，包括应用唯一标识，资源加载，路由匹配是否加载
    |-- config
    |  |-- importmap.json  		   应用加载地址与应用标识符的映射
    |-- systemjs				   SystemJS 静态资源
       |-- amd.js
       |-- import-map-overrides.js
       |-- named-exports.js
       |-- system.js			主要通过System.import()加载模块，原理是创建script标签来加载模块
 |-- webpack.config.js				webpack配置
```



```js
// root-config.js
import { registerApplication, start } from 'single-spa'
import isActive from './activity-functions'

// 注册子应用 registerApplication 具体使用详情见官方文档
registerApplication('frame', () => System.import('frame'), isActive.frame)
registerApplication('gcjs', () => System.import('gcjs'), isActive.gcjs)
registerApplication('ghjh', () => System.import('ghjh'), isActive.ghjh)
// 启动
start()
```

```js
// webpack.config.js
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src/root-config.js"),
  output: {
    filename: "root-config.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "sourcemap",
  devServer: {
    headers: {
       // 允许跨域很重要
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  // 打包时不打包single-spa使用外联资源
  externals: ["single-spa"]
}

```

#### frame文件夹

```
|-- src
    |-- App.vue
    |-- main.js				对子应用进行处理，导出模块，使root-config可以加载
    |-- assets
    |-- router				base设置一下，对路由统一添加应用唯一标识的公共路径
    |   |-- index.js
```

```

```

