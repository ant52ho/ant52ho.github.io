FROM node:18-alpine
WORKDIR /backend
COPY . .
# Install Fly CLI
RUN apk update
RUN apk add curl
RUN curl -L https://fly.io/install.sh | sh
RUN LOG_LEVEL=debug /root/.fly/bin/flyctl auth login
RUN npm i 

EXPOSE 13306
EXPOSE 5000

# CMD /bin/sh -c '/root/.fly/bin/flyctl proxy 13306:3306 -a ant-mysql & npm run prod'
CMD /bin/sh -c '/root/.fly/bin/flyctl proxy 13306:3306 -a ant-mysql & sleep 5 && npm run prod'
# CMD ["/root/.fly/bin/flyctl", "proxy", "13306:3306", "-a", "ant-mysql", "&&", "npm", "run", "prod"]

