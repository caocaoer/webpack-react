## React 通用项目开发框架

### 开发环境
node: v6.9.x
webpack: v2.x.x
eslint: v3.x.x
react: v15.x.x
react-router: v3.x.x

### 目录结构
```
bin							    // 可执行命令目录
|-build-dev.bat                 // 将src目录中的源码通过 webpack.config.dev.babel.js 编译到build目录
|-build-prod.bat                // 将src目录中的源码通过 webpack.config.prod.babel.js 编译到build目录
|-release-both.bat			    // 将代码发布到开发和测试服务器
|-release-dev.bat			    // 将代码发布到开发服务器
|-release-test.bat			    // 将代码发布到测试服务器
|-package.bat                   // 将src目录中的源码通过生产环境配置打包到dist目录并生成zip文件供发版使用
|-lint.bat				        // 执行eslint生产环境代码校验
|-server.bat				    // 启动开发服务器
|-server-mock.bat			    // 启动mock服务器
build						    // 代码编译后生成的临时目录
dist						    // 代码打包后生成的临时目录
doc							    // 项目文档目录
mock                            // mock数据服务器
|-data                          // mock数据存放目录
|-mockFactory.js                // mock数据转换工厂
|-server.js                     // mock服务器
test						    // 测试代码目录
soft						    // 开发工具
src 						    // 项目源码目录
|-components				    // 功能组件或公用组件目录
	|-component1
		|-Component1.jsx 	    // 组件文件, 采用JSX + ES6风格编码, 驼峰标识, 首字母大写
		|-component1.scss 	    // 组件对应样式文件, 驼峰标识, 首字母小写
	...
|-conf                          // 项目配置文件
    |-base.js                   // 项目通用配置文件
|-constants					    // 常量目录
    |-common.js                 // 存放一些通用常量
    |-info.js                   // 存放页面提示信息, 包括错误信息提示, 方便维护和做国际化
|-css                           // 通用样式目录
    |-main.css 				    // 全局css文件
|-data						    // 静态数据目录
|-images					    // 公共图片存放目录
|-layouts					    // 布局组件存放目录, 如Header, Footer, Frame
|-routes					    // 路由配置文件
|-services					    // 后台接口服务目录, 所有服务端数据请求都封装在这里, 统一从这里请求后台接口, 方便数据封装, 接口重用.
    |-demo.js                   // 接口文件, 对应RAP文档模块下的urlPath, 如: /user/add, 则文件应该命名为user.js
|-utils						    // 常用工具
    |-emitter.js                // 全局事件处理器.
    |-higgsPromise.js           // 封装了后台数据请求, 统一从此接口调用后台数据, 返回一个Promise. 该对象应在services目录的文件中使用(具体参考demo.js), 不应直接在页面上调用.
    |-messager.js               // 封装了系统提示信息, 页面所有系统提示的消息统一使用该对象.
    |-util.js                   // 一些常用方法
    |-validator.js              // 存放一些通用验证方法
|-views						    // 页面容器组件目录, 该目录只存放用于展示的页面组件
    |-error                     // 错误信息页面
    |-home
    |    |-Home.jsx             // 容器组件, 将所需的功能组件组合于该组件中, 用于页面展示, 如: Redux中的container.
    |    |-home.scss            // 容器组件样式
|-index.jsx					    // 入口jsx文件
|-index.html				    // 应用入口页面
.babelrc					    // babel配置文件
.eslintignore                   // eslint忽略校验配置文件.
.eslintrc.json                  // eslint开发环境代码校验配置文件.
.eslintrc.prod.json			    // eslint生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore					    // git忽略提交配置文件
package.json				    // npm配置文件
README.md  					    // 项目开发文档
gulpfile.babel.js    		    // 项目打包, 发布脚本
webpack.config.base.js 		    // webpack开发, 生产环境公用部分
webpack.config.dev.babel.js     // webpack开发环境配置文件
webpack.config.prod.babel.js    // webpack生产环境配置文件
```

### 环境配置
1. 为了统一开发环境, 请统一使用node-v6.x.x版本.
2. 安装全局依赖包:
```
npm uninstall -g webpack webpack-dev-server eslint babel-core gulp
npm install -g webpack@2.3.2 webpack-dev-server@2.3.0 eslint@3.17.1 babel-core@6.22.1 gulp@3.9.1
```
3. 安装项目依赖包(如果自动下载依赖包失败):
```
执行 npm install
```
### FAQ
1.如果安装 node-sass 时提示错误, 请将项目中 /soft/node-sass 目录拷贝到本地电脑 C:\Users\Administrator\AppData\Roaming\npm-cache\ 目录下, 替换 node-sass 目录.
2.如果使用 cnpm install 安装模块后, 启动服务报错(比如提示模块未找到), 尝试删除 node_modules 目录, 并使用 npm i 重新安装.

### 系统配置
1. 配置项目默认参数
    src/conf/base.js
2. 配置 local, api, mock 服务器信息(只会在开发阶段使用)
    package.json > server
3. 配置项目发布的包文件名
    package.json > packageName
4. 配置发布 dev, test 服务器信息
    package.json > release

### 启动服务器
1. 开发服务器
    运行 /bin/server.bat
    浏览器访问 localhost:8080 即可,
    可在 package.json > server > local 中配置启动服务器的 IP 和端口.

2. mock服务器
    在 /mock/data/xxx.json 文件中配置 mock 数据, 参考demo.json文件内容.
```
[{
    "url": 请求的 api url, 支持: /xxx/xxx; /xxx/xxx.xx; /xxx/:xxx/:xxx(RESTful)格式
    "mockjs": 是否使用 mockjs 转换 result 数据,
    "delay": 请求接口延迟返回时间,
    "method": 请求接口的类型, 如: "get", "post",
    "result": response 返回的数据对象.
}]
```
    运行 /bin/server-mock.bat (无需再运行 /bin/server.bat)

### 代码提交
1.提交代码时会自动执行 eslint 严格校验(eslintrc.prod.json), 如果出现错误, git 会提交失败.
2.如果提交代码时未执行 eslint 校验, 可能是因为在 window 下 pre-commit npm，由于权限问题，导致无法在 hooks 文件下生成文件。
  解决方法是以管理员打开 cmd，执行node ./node_modules/pre-commit/install.js 就可以了。

### 项目打包
1. 在 package.json > packageName 中配置打包生成的文件夹名称, 默认为项目名.
2. 运行 /bin/package.bat, 会在 /dist 目录生成打包后的项目文件夹和压缩后的zip文件, 供发版使用.

### 发布流程
1. 在package.json > release 中配置发布服务器信息.
```
"release": {        发布信息配置
    "dev": {  发布到开发服务器
        "host": 主机IP
        "port": 端口
        "user": 服务器登陆账号
        "pass": 服务器登陆密码
        "zip": 是否以 zip 包的形式发布, 如果为 true 则发布的是个 zip 包, false 发布的是文件夹
        "timeout": 服务器连接超时时间
        "remotePath": 发布到服务器上的位置
    }
    "test": {
    ...
    }
}
```
2. 发布到 dev 服务器:
    运行 /bin/release-dev.bat
3. 发布到 test 服务器:
    运行 /bin/release-test.bat
4. 同时发布到 dev 和 test 服务器:
    运行 /bin/release-both.bat
