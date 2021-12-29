# Clipboard-sync / socket-server

```
Server: sock.mysocket.online
Port: 3000
protocal: ws
```

## 使用方式

使用 `socket.io-client` 建立连接后， `io.emit("join", CHANNEL)` 加入频道
`io.emit("data", DATA )` 向频道广播

## 为自己部署

### Docker

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
