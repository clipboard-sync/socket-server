FROM node:lts-stretch-slim

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安装 Node.js 依赖项
RUN npm ci

# 将整个项目文件夹复制到容器中
COPY . .

# 将容器的端口映射到主机的端口 3000
EXPOSE 3000

# 设置 entrypoint
ENTRYPOINT [ "node", "index.js" ]