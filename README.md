# webpack前端项目搭建

## 目录结构

```
webpack-vue
│   README.md //项目说明
│   postcss.config.js //css前缀 
│   package.json //依赖包
|   index.html //页面
|   .gitignore //git不提交的文件
|   .eslintrc.js //eslint配置，规范代码
|   .eslintignore //eslint不检测的文件 
|   .editorconfig //编辑器配置
|   .babelrc //babel配置
|
└───src 
│   │   
│   │   
│   │
│   └───
│       │   
│       │   
│       │   
│   
└───config //生产环境和开发环境配置
|   │   dev.env.js //开发环境
|   │   prod.env.js //生产环境
|
└───build // webpack配置
    | webpack.base.conf.js //全局配置
    | webpack.dev.conf.js //开发环境配置
    | webpack.prod.conf.js //生产环境配置
```

代码里都有注释，跟vue-cli构建项目差不多，参考[webpack](https://www.webpackjs.com/concepts/)
