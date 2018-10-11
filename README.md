# cube-demo-user
* 一个基于vue2.x编写的注册登录demo
* 项目依赖 
  [ demo ] <--> [云徙api网关] <---> [云徙业务中台] 
* api 网关地址....      
  
### 项目结构
```
├── build  #webpack编译相关文件目录，一般不用动 
├── config  #配置目录
│   ├────dev.env.js  #开发环境变量
│   ├────index.js    #主配置文件
│   └────prod.env.js #生产环境变量
├── dist  #生产环境下build后的文件存放目录（发布目录）
├── server  #服务端代码目录，提供给前端接口
├── src #前端项目源码目录
│   ├───—api  #封装的接口文件目录
│   ├───—assets  #资源目录
│   ├───—common  #公用文件目录
│   ├───—components  #组件及页面文件目录
│   ├───—router  #路由目录
│   ├───—App.vue #项目入口文件
│   ├───—bus.js  #公共通信组件
│   └────main.js  #项目的核心文件
├── static  #开发模式下的静态资源目录
├── index.html #首页入口文件，你可以添加一些 meta 信息或同统计代码啥的
├── package.json #项目配置文件
└── README.md #项目的说明文档，markdown 格式
```

## 项目编译和运行

``` bash
第一步： 先安装node v8.2.1环境，可以用nvm安装，支持多版本切换
可参看链接：https://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html

第二步：下载项目
可以直接在git上下载项目源码。
或者通过git命令下载
#git命令下载
git clone https://github.com/jimi-lzp/cube-demo-user

假定项目已经下载下来了。

第三步：启动服务端
（1）新开一个命令行窗口
（2）定位到项目中目录并安装依赖
  > cd 你自己的工程目录
  > npm install
（3）依赖安装成功后执行启动命令
  > npm start 
  # 显示如下内容说明服务端启动成功
  # Server is runing... Listening on port 3000
  # Listening at http://localhost:3000
  
  
第四步：启动前端
（1）新开一个命令行窗口
（2）定位到项目目录并安装依赖
  > cd 工程目录
  > npm install
（3）依赖安装成功后执行启动命令
  > npm run dev
  # 显示如下内容说明本地启动成功
  # DONE Compiled successfully in 7515ms
  # Listening at http://localhost:8081
   
   





