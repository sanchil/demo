FROM node:14
WORKDIR /app
COPY package*.json ./
COPY keys ./
COPY src ./src
RUN npm install && npm run build
#COPY dist ./
#EXPOSE 3000
CMD [ "node", "./dist/bin/www" ]
