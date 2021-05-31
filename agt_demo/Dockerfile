FROM node:14
WORKDIR /app
COPY package*.json ./
COPY public ./public
COPY src ./src
RUN npm install && echo "y" | npm run build
COPY build ./build
#RUN echo "y" | npm run build
EXPOSE 3000
ENV RAZZLE_PUBLIC_DIR=./public
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
CMD ["node", "build/server.js"]