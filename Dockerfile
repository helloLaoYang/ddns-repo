
FROM hellolaoyang/node-yarn as builder
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM node:lts
WORKDIR /ddns
COPY --from=builder /app/ddns /ddns/

RUN npm init -y; \
    npm install dayjs node-schedule public-ip @alicloud/openapi-client @alicloud/alidns20150109;
# 修改时区东八区
ENV TZ 'Asia/Shanghai'
# accessKeyId
ENV ACCESS_KEY_ID ''
# accessKeySecret
ENV ACCESS_KEY_SECRET ''
# 主机名
ENV RR ''

ENV DOMAIN_NAME ''

# 记录类型
ENV TYPE 'A'

CMD node .
