FROM node:14
WORKDIR /app
ENV RAZZLE_PUBLIC_DIR=./public
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
COPY package*.json ./
RUN npm install
COPY build ./build
COPY public ./public
COPY src ./src
#RUN echo "y" | npm run build
EXPOSE 3000
CMD ["node", "build/server.js"]