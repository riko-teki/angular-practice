FROM node:16.2.0

RUN npm install -g @angular/cli@12.0.2
RUN npm install -g angular-cli-ghpages
RUN ng add angular-cli-ghpages

WORKDIR /app

EXPOSE 80