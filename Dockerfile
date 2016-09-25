# To build and run with Docker:
#
#  $ docker build -t machete-ui .
#  $ docker run -it --rm -p 3000:3000 -p 3001:3001 machete-ui
#
FROM node:latest

RUN mkdir -p /machete-ui /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /machete-ui
COPY package.json typings.json /machete-ui/
RUN npm install --unsafe-perm=true

COPY . /machete-ui
RUN chown -R nodejs:nodejs /machete-ui
USER nodejs

CMD npm start
