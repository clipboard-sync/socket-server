# ClipboardSync / 剪贴板同步

[桌面端](https://github.com/clipboard-sync/client-desktop#clipboardsync--剪贴板同步)  | [安卓端](https://github.com/clipboard-sync/client-rn#clipboardsync--剪贴板同步) | 服务端  


**一款简单的剪贴板同步工具**

## 功能

- 基于 socket.io 的服务端，完成 socket 数据转发
- 提供了 npm 包 [clipboard-socket](https://www.npmjs.com/package/clipboard-socket)

公开的 socket 服务地址：  
- http://socket.interface.work:3000

## 使用方式

### 使用 NPX 启动

使用 `npx` 直接启动
```bash
## 将 80 替换成你需要的端口
npx clipboard-socket 80
```
### clone 代码并运行

```bash

# clone
git clone https://github.com/clipboard-sync/socket-server.git
# cd dir
cd socket-server
# install dependencies
npm i 

## 1. use pm2
npm run start
## 2. use node
node index.js
```

### 作为 JS 模块使用
npm install:
```bash
npm i clipboard-socket
```
use in code:
```js
const Socket = require("clipboard-socket");
let s = new Socket(3000);
console.log(s.io); // s.io 是 socket.io-server 实例

```


## 模块功能

- 使用 `socket.io-client` 建立连接后  
- `io.emit("join", CHANNEL)` 加入频道  
- `io.emit("data", DATA )` 向频道广播  

## 私有部署


### DockerHub

> DockerHub Image 由 GithubAction 进行更新，Expose 3000 端口

Image: [mscststs/clipboard-sync-socket-server](https://hub.docker.com/r/mscststs/clipboard-sync-socket-server/tags)


### 本地编译

请先确保您***已经安装了`Docker`***。

> 如果您的机器还没有安装`Docker`，请自行于[Google](https://www.google.com/)或[百度](https://www.baidu.com/)搜索`Docker`并寻找适合您的安装教程。
>
> 如遇构建镜像缓慢，多半是因为`Docker主机`与[DockerHub](https://hub.docker.com/)之间连接缓慢，请解决网络问题，或寻找与您`Docker主机`网络友好的`DockerHubMirror`。

```
# Build Docker Image
docker build -t socket-server:latest https://github.com/clipboard-sync/socket-server.git#master:Docker
# 如在中国大陆且网络不畅，请使用以下命令构建镜像
docker build -f DockerfileCN -t socket-server:latest https://ghproxy.com/https://github.com/clipboard-sync/socket-server.git#master:Docker
# Run it
docker run -d -p 3000:3000 --name socket-server socket-server:latest
```

随后将`Client`端的服务器地址修改为`http://运行Docker的主机地址:3000`即可。

## License

MIT

