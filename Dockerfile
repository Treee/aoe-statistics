FROM alpine

ARG server_port
ENV SERVER_PORT ${server_port}

ARG db_username
ENV DB_USERNAME ${db_username}

ARG db_password
ENV DB_PASSWORD ${db_password}

ARG client_id
ENV CLIENT_ID ${client_id}

RUN apk add --update npm

WORKDIR /aoe-statistics
COPY package.json /aoe-statistics/package.json
RUN npm install 

COPY . /aoe-statistics

EXPOSE ${server_port}

CMD ["npm", "start"]