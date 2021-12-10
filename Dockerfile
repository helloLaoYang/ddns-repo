
FROM hellolaoyang/node-yarn as install
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM node:lts
WORKDIR /app
COPY --from=install /app /app

# accessKeyId
ENV ACCESS_KEY_ID ''
# accessKeySecret
ENV ACCESS_KEY_SECRET ''
# 主机名
ENV RR ''

ENV DOMAIN_NAME ''

CMD npm run start
