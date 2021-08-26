FROM node:16.2.0

RUN npm install -g @angular/cli@12.0.2
RUN npm install -g angular-cli-ghpages

COPY ./ssh/ /root/.ssh/

WORKDIR /app

EXPOSE 80