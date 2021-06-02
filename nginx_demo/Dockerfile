FROM nginx:1.19.10
# RUN adduser --system --no-create-home --group nginx
RUN rm /etc/nginx/conf.d/default.conf && mkdir -p /etc/nginx/ssl
COPY conf.d /etc/nginx/conf.d
COPY ssl/server.key /etc/nginx/ssl
COPY ssl/server.crt /etc/nginx/ssl
COPY nginx.conf /etc/nginx
EXPOSE 80 443
#CMD ["nginx"]
