# 开始

本项目使用 `React` + `antd` + `dva` 来构建前端应用，使用 `eggjs` 构建后端服务

为方便调试没有使用数据库，直接将 `.csv` 数据放在 `server/app/data` 目录下，使用 `csvtojson` 库将其解析为数组，并将其保存在内存中，就可以将数据读取并返回至前端，而添加操作也是对内存中的数据进行操作

之后若需要连接数据库，只需要在 `server/app/config` 下进行数据库的配置，并在 service 中编写操作数据库的代码即可实现



## 安装依赖

前后端项目虽然在同一个目录下，但他们有各自的依赖，不共用一个 `package.json` ，因此安装依赖时使用自定义的 npm 安装脚本

~~~bash
npm run installAll
# OR yarn installAll
~~~

也可以两边各自去安装依赖

~~~bash
npm install
# OR yarn

cd ./server

npm install
# OR yarn
~~~



## 启动后端服务

~~~bash
npm run server
# OR yarn server
~~~



## 启动前端服务

~~~bash
npm start
# OR yarn start
~~~



## 同时启动前后端

使用 `concurrently` 包来同时运行两个服务，但控制台打印信息较原来的会不那么美观，建议开两个控制台，一个运行前端服务一个运行后端服务

~~~bash
npm run dev
# OR yarn dev
~~~

