#  DDNS 

> 基于阿里云解析的DDNS服务，每分钟对您的公网ip进行对比。公网ip变化后会重新进行设置解析。

* 因阿里云云解析未对外提供权重设置，所以启动服务后会删除您子域名的所有解析，以防止出现解析冲突。

# 如何使用

1. 拉取镜像

``` bash

docker pull hellolaoyang/ddns

```

2. 运行

```bash
docker run -d --name ddns -e ACCESS_KEY_ID=ACCESS_KEY_ID -e ACCESS_KEY_SECRET=ACCESS_KEY_SECRET -e DOMAIN_NAME=DOMAIN_NAME -e RR=RR hellolaoyang/ddns
```

* 说明

|  字段 | 说明 | 必填 |
| --- | --- | --- |
| ACCESS_KEY_ID | 阿里云用户ACCESS_KEY_ID （推荐使用子用户）| 必填 |
| ACCESS_KEY_SECRET | 阿里云用户ACCESS_KEY_SECRET （推荐使用子用户）| 必填 |
| DOMAIN_NAME | 域名 | 必填 |
| RR | 主机名，空主机名请使用"@"| 必填 |

