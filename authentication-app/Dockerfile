FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get update
RUN curl -sl https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update
RUN apt-get install -y nodejs

# COPY package.json package.json
# COPY package-lock.json package-lock.json
# COPY server.js app/server.js
RUN mkdir app
RUN cd /app
WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "server.js"]