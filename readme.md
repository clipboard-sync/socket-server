# Clipboard-sync / socket-server

```
Server: sock.mysocket.online
Port: 3000
protocal: ws
```
## 使用方式

使用 `socket.io-client` 建立连接后， `io.emit("join", CHANNEL)` 加入频道
`io.emit("data", DATA )` 向频道广播