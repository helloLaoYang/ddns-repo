
FROM hellolaoyang/node-yarn as builder
WORKDIR /app
COPY . .
RUN yarn && yarn build
FROM node:lts

WORKDIR /app
COPY --from=builder /app /app
# 修改时区东八区
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# accessKeyId
ENV ACCESS_KEY_ID ''
# accessKeySecret
ENV ACCESS_KEY_SECRET ''
# 主机名
ENV RR ''

ENV DOMAIN_NAME ''

CMD npm run start
