# create-admin-template

## 开发工具

##### VsCode

> VsCode 需要安装插件：eslint、Prettier-Code formatter、vetur、koroFileHeader，iconTheme 的主题插件可自行选择安装

> 工具插件说明

- eslint、Prettier-Code formatter、vetur 主要是针对代码格式方面的控制；
- koroFileHeader （可以不用此插件） 主要是对头部注释的添加，在新建、修改、保存的时候会自动更新头部注释，安装完毕后需要修改配置，将 Author、LastEditors 修改成自己的英文名即可，如下：

```javascript
"fileheader.customMade": {
   "Author": "baosheng", // 创建作者（需要修改）
   "Date": "Do not edit", // 创建时间
   "LastEditors": "baosheng", // 最后修改作者(需要修改)
   "LastEditTime": "Do not Edit" // 最后修改时间
 }
```

> 使用说明：开发之前需要引入配置文件 setting.json，主要是依据当前项目的 eslint 规则进行的配置

> 下载地址：[settings.json](http://192.168.0.83:8880/baosheng/create-admin-template/blob/master/settings.json 'settings.json')

## 开发规范

#### ESlint

> 请勿修改或禁用 eslint 的规范检测

> eslint 规则参考：[.eslintrc.js](http://192.168.0.83:8880/baosheng/create-admin-template/blob/master/.eslintrc.js)

#### 目录结构

```bash
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│         └── home             # 首页页面
│               ├── components # 首页组件的子组件
│               ├── style.scss # 首页页面的样式
│               └── home.vue   # 首页页面的整体结构
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

#### 目录文件说明

1. assets 文件夹需要按页面进行放置，**<font color=red>命名方式必须与 views 文件夹的名称一一对应</font>**
2. 所有的工具类的函数必须写在 utils 文件夹的 index.js 文件内(即使函数只有一处使用)，并加上注释，然后完善 [util.md](http://192.168.0.83:8880/baosheng/create-admin-template/blob/master/util.md)，markdown 的书写规则见 [util.md](http://192.168.0.83:8880/baosheng/create-admin-template/blob/master/util.md)；
3. 所有的请求接口需放在 api 文件夹内统一管理，**<font color=red>命名方式必须与 views 文件夹的名称一一对应</font>**，页面的请求函数放置于二级目录，公共组件的请求函数放置于 components 文件夹内，公共请求函数放置在 api 文件夹的一级目录即可；

Demo:

```bash
├── api                         # api文件夹
│   └── home                    # 首页
        └── home.js             # 首页的请求接口
│   ├── news                    # 新闻页面
        ├── list.js             # 新闻列表的请求
        └── detail.js           # 新闻详情的请求
    ├── components              # 公共组件内的请求
        ├── pointUp.js          # 点赞组件内的请求
        └── star.js             # 评级组件内的请求
│   └── upload.js               # 公共上传的请求
```

4. 开发之前必须要配置响应的 css

- <font color="green">element-variables.scss</font>：element-ui 的 slider 和 menu 部分的主题色常量的配置
- <font color="green">element-ui.scss</font>：element-ui 全局样式的重定义，细节可在开发过程中逐步修改
- <font color="green">variables.scss</font>：颜色和字体的配置，所有使用的公用的主题色、常用灰色、字体色、字体大小都需要使用它
- <font color="green">mixin.scss</font>：经常需要使用的样式的函数（比如 position 和 flex）,在定义 mixin.scss 的时候，变量必须赋默认值，方便灵活应用，书写完毕后并完善 [mixincss.md](http://192.168.0.83:8880/baosheng/create-admin-template/blob/master/mixincss.md) 文档

Demo:

```scss
@mixin flexer(
  $display: flex,
  $direction: row,
  $justify: flex-start,
  $align: stretch,
  $flex: none
) {
  // flex布局基础
  display: $flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  flex: $flex;
}
```

5. 所有 icon 的 svg 都存放于 icon 文件夹内，icon 均需来之 iconfont

#### 组件化开发（views 文件夹）

理论上每个页面需要由各个小组件组成，最后小组件拼成一个页面，所以每个页面下面都应该存在 components 文件夹，因此只要组件的耦合性不强的都需要独立拆分至 components 文件夹内，并且各个组件的样式在各个组件内，如果比较复杂则组件是独立的文件夹存在于 components 文件夹内

Demo：

方式一：

```bash
├── views                       # views文件夹
│   └── home                    # 首页
        ├── components          # 首页的组件
            ├── header.vue      # 头部组件
            ├── slider.vue      # 侧栏组件
            └── footer.vue      # 底部组件
        ├── index.vue           # 首页页面结构和逻辑
        └── index.scss          # 首页的样式
```

方式二（子组件复杂时推荐使用）：

```bash
├── views                       # views文件夹
│   └── home                    # 首页
        ├── components          # 首页的组件
            ├── header          # 头部组件文件夹
                ├── header.vue  # 头部组件结构和逻辑
                └── header.scss # 头部组件样式
            ├── slider          # 侧栏组件文件夹
                ├── slider.vue  # 侧栏组件结构和逻辑
                └── slider.scss # 侧栏组件样式
            ├── footer          # 底部组件文件夹
                ├── footer.vue  # 底部组件结构和逻辑
                └── footer.scss # 底部组件样式
        ├── index.vue           # 首页页面
        └── index.scss          # 首页的样式
```

#### 基本命名书写规范

1. js 命名只能驼峰格式，首字母禁止大写，私有变量需要加“\_”, 事件方法（即 methods 方法里面）如果涉及到用户操作的函数需要加“handle”前缀，比如 click 事件、touch 事件、Submit 事件，正常的函数正常命名即可；

Demo:

```javascript
methods: {
    _setArraryType() { //私有函数
        ...
    },
    handleToggleTab() { //事件函数
        ...
    },
    getUserInfo() { //正常的函数
        ...
    }
}
```

2. 声明变量或常量使用 let、const，而不使用 var
3. css 命名只能用"-"格式进行连接，如果遇到公共样式需要提取出来，每个组件内部的固定格式<style lang="scss" scoped></style>，全部设为私有样式，如果样式超过 200 行的则需要独立提取至外部；
4. 无特殊需求，禁止使用 float 布局方式，只使用：flex、栅格、position（优先级由高到低）
5. 无特殊情况禁止使用!important；

Demo:

```scss
.app-content {
    &-header {
        ...
    }
    &-body {
        ...
    }
    &-footer {
        ...
    }
    .my-btn {
        ...
    }
}
```

#### 目录别名

现在在 webpack 配置了 alias 方便引用资源，举个例子当你在某个视图组件中需要引用公共组件；不管你与那个组件的相对路径是怎样的，可以直接 import AddButton from 'components/AddButton'

目前可以这样引用的有：

> @: 对应 src 目录，vue 默认的标识

> utils: 对应'src/utils/'

> components: 对应'src/components/'

> asserts: 对应'src/asserts/'

> api: 对应'src/api/'

> style: 对应'src/style/'

## 路由配置

```javascript
{
hidden: true, //如果设置为true，则在边栏中将不会显示项目（默认值为false）
alwaysShow: true, //如果设置为true，则始终显示根菜单, 如果未设置alwaysShow，当项目具有多个子路径时，它将变为嵌套模式，否则不会显示根菜单
redirect: noRedirect, //如果设置为noRedirect，则不会在面包屑中重定向
name:'router-name',  //必填，主要是用在keep-alive组件上
meta : {
    roles: ['admin','editor'], //控制页面角色（可以设置多个角色）
    title: 'title', //侧栏和面包屑中的名称显示（推荐设置）
    icon: 'svg-name', //图标显示在侧栏中。
    noCache: true, //如果设置为true，则不会缓存页面（默认为false）
    breadcrumb: false, //如果设置为false，则该项目将隐藏在面包屑中（默认值为true）
    activeMenu: '/example/list' //如果设置路径，侧栏将突出显示您设置的路径
    }
}

```
## 通用表格组件
### 路径：src/components/CommonTable
### 使用方法：
直接在页面里面引入组件即可
### 参数和方法说明：
![参数](./tests/table1.png)
![方法](./tests/table2.png)

## Git 分支命名规范

1. 每次新需求都需要基于 master 分支进行开发；
2. 在发布上线之前需要先提交合并至 master 分支，然后从 master 分支进行发布，禁止直接修改 master 分支或用 dev 分支发布，master 分支只用于合并和发布；
3. 所有的开发都是基于dev分支进行开发，禁止私自新建新的分支；
4. （很少使用，特殊情况下会使用）修复 bug 分支命名规范：fix-基分支-bug 名-日期, 如：fix-master-login-20191025 或者 fix-sales-login-20191025；
5. 每次更新需要根据实际场景写 commit，需保持提交的代码与描述的一致；

## 构建

```bash
# 克隆项目
git clone http://192.168.0.83:8880/baosheng/create-admin-template.git

# 进入项目目录
cd create-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm start
```

浏览器访问 [http://localhost:9090](http://localhost:9090)

## 发布

```bash
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build:pro
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
