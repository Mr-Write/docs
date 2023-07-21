---
title: halo博客部署
---

> ![image-20230403210100551](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403210100551.png)
>
> 部署一个炫酷的个人博客只需要按照本文的指令直接 `cv` 即可。
>
> 但请注意打开服务器防火墙的 **80** 和 **3306** 端口。

# 1.halo简介与地址

## 1.1 简介

Halo是一款现代化的开源博客/CMS系统，所有代码开源在GitHub上且处于积极维护状态。它是基于 `Java Spring Boot` 构建的，易于部署，支持REST API、模板系统、附件系统和评论系统等功能。

Halo 作为一款好用又强大的开源建站工具，配合上不同的模板与插件，可以很好地帮助你构建你心中的理想站点。它可以是你公司的官方网站，可以是你的个人博客，也可以是团队共享的知识库，甚至可以是一个论坛、一个商城。

## 1.2 开源仓库

:house: github： [halo-dev/halo: 强大易用的开源建站工具。 (github.com)](https://github.com/halo-dev/halo)

:house: gitee：[halo: 强大易用的开源建站工具。 (gitee.com)](https://gitee.com/halo-dev/halo)

## 1.3 中文文档

:house: [Halo Documents](https://docs.halo.run/)

## 1.4 社区

:house: [Halo 社区](https://bbs.halo.run/)

## 1.5 官网

:house:  [Halo 建站 - 强大易用的开源建站工具](https://halo.run/)

## 1.6 主题仓库

:house: [主题仓库 | Halo 建站 - 强大易用的开源建站工具](https://halo.run/themes)



# 2.安装docker与docker-compose

## 2.1 安装docker

### 🍀 基于centos的安装

1. 安装yum-utils

   ```shell
   sudo yum install -y yum-utils
   ```

2. 从国内服务器上下载docker

   ```shell
   sudo yum-config-manager \
       --add-repo \
       http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   ```

3. 安装docker

   ```shell
   sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

4. 验证是否成功

   ```shell
   sudo docker --version
   ```

### 🍀 基于ubuntu

1. 安装需要的包

   ```shell
   sudo apt-get update
   ```

2. 安装依赖包

   ```shell
   sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      software-properties-common
   ```

3. 添加 阿里 GPG 密钥

   ```shell
   curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
   ```

4. 设置远程仓库

   ```shell
   sudo add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) \
     stable"
   ```

5. 安装 Docker-CE

   ```shell
   sudo apt-get update
   
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

6. 验证是否成功

   ```shell
   sudo docker --version
   ```



## 2.2 配置国内加速器

国内镜像中心常用的为阿里云与网易云，<font color='red'>选择其中一个加速器进行配置即可</font>。在本地 Docker 中指定要使用的国内加速器地址后，就可以直接从国内镜像中心下载镜像了。

### 2.1.1 配置阿里云加速器

#### 🍀 找到相应页面

若要配置阿里云加速器，必须首先要有阿里云的账号。登录阿里云后，打开阿里云的容器镜像服务页面 https://cr.console.aliyun.com ，然后找到如下页面，可以查看到你的 `registry-mirrors`

![image-20230403005624117](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403005624117-1680494706927-1.png)

#### 🍀 创建 docker 目录

```shell
sudo mkdir -p /etc/docker
```

#### 🍀  创建 daemon.json 文件

注意，该 json 数据中的 URL 地址是与用户登录账号绑定的，不同的用户所生成的地址是不同的。

```shell
sudo vim /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["https://******.mirror.aliyuncs.com"]
}
```

#### 🍀 重新加载服务配置文件

```shell
sudo systemctl daemon-reload
```

#### 🍀 重启 docker 引擎

```shell
sudo systemctl restart docker
```

### 2.2.2 配置网易云加速器

配置网易云加速器，无需注册网易云用户。只需将前面的 daemon.json 文件中的那个URL 替换为如下 URL 即可。

```shell
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

当然，替换过后，仍需重新加载服务配置文件，重启 docker 引擎。

## 2.3 离线安装docker-compose

### 🍀 下载安装包

:house: 所有版本预览：[Releases · docker/compose (github.com)](https://github.com/docker/compose/releases/)

选择一个版本：

![image-20230328103210297](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230328103210297-1680454211141-1-1680494706927-3.png)

进入后往下拉，选择对应版本：

![image-20230328103251367](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230328103251367-1680454211141-2-1680494706927-5.png)

将文件上传到linux后，移动到与环境变量相关的指定位置：

```shell
sudo mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose
```

### 🍀 添加可执行权限

为 docker-compose 文件添加可执行权限。

```shell
sudo chmod +x /usr/local/bin/docker-compose
```

### 🍀 测试

通过 docker-compose version 测试安装是否成功。

```shell
sudo docker-compose version
```

# 3.nginx反向代理配置

在系统任意位置创建一个 halo 文件夹，并创建多级目录

```shell
sudo mkdir -p /halo/nginx/conf/
```

编写Nginx配置文件

```shell
sudo vim /halo/nginx/conf/nginx.conf
```

```nginx
#user  root;
error_log  /var/log/nginx/error.log notice;
worker_processes  1;

pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}
http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;
  # 设置上传文件的最大值
  client_max_body_size 256m;
  
  upstream blog {
    # 使用容器服务名
	server halo:8090;
  }
    
  server {
      listen       80;
      # 可进行域名绑定
      server_name  localhost;
      location / {
          # 设置反向代理的地址（实际是请求转发）
          proxy_pass http://blog;
          # 设置HTTP请求头
          proxy_set_header HOST $host;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }
  }
}
```



# 4.Docker-compose部署halo,mysql,nginx

```shell
sudo vim /halo/compose.yaml
```

:one: <font color='blue'>您必须修改的自定义配置，找到下面的参数所在位置修改：</font>

服务器或虚拟机ip：`halo.external-url` 中的 ip 设置，我写的配置中是 **8.130.97.145**，需要修改为你自己的服务器ip地址。

:two: <font color='blue'>您可选修改的自定义配置，找到下面的参数所在位置修改：</font>

1. 超级管理员账号密码
   - 账号 `halo.security.initializer.superadminusername`，我写的配置中是 admin
   - 密码 `halo.security.initializer.superadminpassword` ，我写的配置中是 123456
2. mysql的root用户密码，以下两个参数的值都需要修改且必须保持一致
   - `spring.r2dbc.password`，我写的配置中是 123456
   - `MYSQL_ROOT_PASSWORD`，我写的配置中是 123456

```yaml
services:
  halo:
    image: halohub/halo:2.4.0
    container_name: halo
    restart: on-failure:3
    depends_on:
      halodb:
        condition: service_healthy
    networks:
      halo_network:
    volumes:
      - ./halo:/root/.halo2
    ports:
      - "8090:8090"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8090/actuator/health/readiness"]
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 30s
    command:
      - --spring.r2dbc.url=r2dbc:pool:mysql://halodb:3306/halo
      - --spring.r2dbc.username=root
      # MySQL 的密码，请保证与下方 MYSQL_ROOT_PASSWORD 的变量值一致。
      - --spring.r2dbc.password=123456
      - --spring.sql.init.platform=mysql
      # 外部访问地址，我的服务器 ip 为8.130.97.145，此处需要修改为你自己的服务器或虚拟机 ip
      - --halo.external-url=http://8.130.97.145:80/
      # 初始化的超级管理员用户名
      - --halo.security.initializer.superadminusername=admin
      # 初始化的超级管理员密码
      - --halo.security.initializer.superadminpassword=123456

  halodb:
    image: mysql:8.0.31
    container_name: halodb
    restart: on-failure:3
    networks:
      halo_network:
    command: 
      - --default-authentication-plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_general_ci
      - --explicit_defaults_for_timestamp=true
    volumes:
      - ./mysql:/var/lib/mysql
      - ./mysqlBackup:/data/mysqlBackup
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "--silent"]
      interval: 3s
      retries: 5
      start_period: 30s
    environment:
      # 请修改此密码，并对应修改上方 Halo 服务的 SPRING_R2DBC_PASSWORD 变量值
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=halo

  halonginx: # 服务名称，用户自定义
    image: nginx:1.23.4  # 镜像版本
    container_name: halonginx
    # 链接到其它容器，能在 nginx.conf 反向代理配置时使用
    links:
      - halo
    networks:
      halo_network:
    ports:
      - 80:80  # 暴露端口
    volumes: # 挂载
      - /halo/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
    privileged: true # 这个必须要，解决nginx的文件调用的权限问题
    
networks:
  halo_network:
```

# 5.容器编排

```shell
# 1.进入 halo 目录
cd /halo

# 2.容器编排
sudo docker-compose up -d
```

查看状态：`sudo docker ps`

![image-20230403140109540](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403140109540.png)

# 6.访问测试

:house: 访问：<font color='green'>http://【服务器或虚拟机ip】</font>

![image-20230403140238144](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403140238144.png)

![image-20230403140356496](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403140356496.png)

> 点击登录，如果遇到红色报错不用管。

![image-20230403142541970](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403142541970.png)

# 7.基础操作

> 这里只列举部分操作，更多使用可以自己去实践操作或者参考 [用户指南 | Halo Documents](https://docs.halo.run/category/用户指南)

## 7.1 插件

这里演示图床插件：

:house: 插件包下载地址：[halo-sigs/plugin-s3: 为 Halo 提供 S3 对象存储协议的存储策略 (github.com)](https://github.com/halo-sigs/plugin-s3)

![image-20230403172625378](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403172625378-1680514130671-10.png)

![image-20230403172716630](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403172716630.png)

![image-20230403172744416](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403172744416.png)

![image-20230403172822009](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403172822009.png)

创建新的存储策略，但这里会导致页面卡死，原因是**halo2.4版本不适配该插件**，这个问题 `plugin-s3` 插件的制作者们已经在修复中了（当前为 2023/04/03）

![image-20230403173030704](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403173030704.png)



## 7.2 站点基本设置

![image-20230403180749408](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403180749408.png)

![image-20230403180849175](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403180849175.png)

## 7.3 主题设置

### 🍀 优质主题下载地址

> 注意直接下载 .zip 文件即可，无需对其解压。
>
> ![image-20230403161449567](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403161449567.png)

- `sakura`：[LIlGG/halo-theme-sakura: Halo 版本的樱花🌸主题 (github.com)](https://github.com/LIlGG/halo-theme-sakura)

- `xue`：[xzhuz/halo-theme-xue: 追求个性与至简 (github.com)](https://github.com/xzhuz/halo-theme-xue)

  > 注意，这个主题的 master 主分支暂不可用（不知为什么），但可以使用 next 子分支。
  >
  > ![image-20230403162105819](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403162105819.png) 

- `dream`：[nineya/halo-theme-dream2.0: 适配halo2.x的dream主题 (github.com)](https://github.com/nineya/halo-theme-dream2.0)

- `butterfly`：[dhjddcn/halo-theme-butterfly: 一个Halo博客主题，Butterfly 🦋 (github.com)](https://github.com/dhjddcn/halo-theme-butterfly)

  > 注意要选择 next 分支。

- `joe`：[qinhua/halo-theme-joe2.0: 🌈 一款 Halo 博客主题 Joe2.0 (github.com)](https://github.com/qinhua/halo-theme-joe2.0)

### 🍀 设置主题

![image-20230403145648463](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403145648463.png)

![image-20230403164809346](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403164809346.png)

![image-20230403164840024](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403164840024.png)

主页效果：

![image-20230403164922934](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403164922934.png)

至于更多设置直接去主题管理下调试即可。

## 7.4 允许访客注册

![image-20230403173952956](https://sangxin-tian.oss-cn-nanjing.aliyuncs.com/image/image-20230403173952956.png)