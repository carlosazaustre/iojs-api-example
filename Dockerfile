FROM iojs:2.3.0

ADD . /iojs-api
WORKDIR /iojs-api
RUN npm install -g babel pm2; npm install
