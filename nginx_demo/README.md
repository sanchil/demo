# Setting up the nginx_demo

# docker

# create a folder for holding nginx config files and certificate and key for ssl

root_app/etc/nginx
           + Dockerfile
           + nginx.conf
           ssl
           + server.key
           + server.crt
           conf.d
           + ng.conf 

## Dockerfile

```sh
FROM nginx:1.19.10
RUN adduser --system --no-create-home --group nginx
RUN rm /etc/nginx/conf.d/default.conf && mkdir -p /etc/nginx/ssl
COPY conf.d /etc/nginx/conf.d
COPY ssl/server.key /etc/nginx/ssl
COPY ssl/server.crt /etc/nginx/ssl
COPY nginx.conf /etc/nginx
EXPOSE 80
```

## build docker image
# from app root folder

```sh 
$ docker build -t <tagname>:<version> .
```

## run docker image with network host

use network host to run nginx as if it were running locally on 
the system. Else you will need to create a separate bdge network and ensure 
that all the applications run on the same network. NEtwork host is best if the main application 
is running as a non docker application and nginx is running as a docker application.

```sh 
$ docker run --name ng -d --network host <tagname>:<version>
```

## run docker image with a network bridge
## must ensure that all the applications run on this network in order 
## to be able to see each other

docker network create --driver bridge ng-net

docker run --name ng --network ng-net -dp 80:80 <tagname>:<version>


## nginx.conf

```sh
user  nginx;
worker_processes  2;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
worker_rlimit_nofile 65535;

events {
    worker_connections  4096;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    tcp_nopush     on;
    server_names_hash_bucket_size 128;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

```



## ng.conf

```sh
map $http_origin $current_origin {
	default https://webapp.org;
	
	
}

upstream redisbackend {
  #       server backend1.example.com weight=5;
          server webapp.org:6379       max_fails=3 fail_timeout=30s;
   #      server unix:/tmp/backend3;
          keepalive 1024;
   #      server backup1.example.com  backup;
  }

upstream couchdbsvr {
  #       server backend1.example.com weight=5;
          server webapp.org:5984       max_fails=3 fail_timeout=30s;
   #      server unix:/tmp/backend3;
          keepalive 1024;
   #      server backup1.example.com  backup;
  }

server{
 
 	listen 80;
 	listen [::]:80;
 	listen 443 ssl;
 	listen [::]:443 ssl;
 	server_name webapp.org;
  	ssl_certificate     /etc/nginx/ssl/server.crt;
	ssl_certificate_key /etc/nginx/ssl/server.key;


location / {

if ($request_method = 'OPTIONS') {
	#add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Origin' '$current_origin';
    add_header 'X-Debug-Msg' 'This is the origin $current_origin';
    add_header 'Access-Control-Allow-Credentials' 'true';                
    add_header 'Access-Control-Allow-Methods' 'HEAD, GET, POST, PUT, DELETE, OPTIONS';
	add_header 'Content-Security-Policy' "default-src 'self' http://localhost:5984 \
				https://api.cloudinary.com http://api.cloudinary.com https://res.cloudinary.com \
				http://res.cloudinary.com;\
				script-src  https://assets.loginwithamazon.com/sdk/na/login1.js \
				https://apis.google.com/js/api.js \
				'nonce-amzabcxyz' 'nonce-agtsessionabcxyz' 'nonce-fbabcxyz';\
				img-src https://abs.twimg.com https://*.twimg.com https://pbs.twimg.com data: ;\
				style-src 'sha256-0EZqoz+oBhx7gF4nvY2bSqoGyy4zLjNF+SDQXGp/ZrY='; ";
                #add_header 'Set-Cookie' 'HttpOnly;Secure;SameSite=None';
    add_header 'Set-Cookie' 'nginxcookie=hello nginx world';
    #
    # Custom headers and headers various browsers *should* be OK with but aren't
    #
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,\
				If-Modified-Since,Cache-Control,\
				Content-Type,Range,Authorization';
    #
    # Tell client that this pre-flight info is valid for 20 days
    #
    add_header 'Access-Control-Max-Age' 1728000;
    add_header 'Content-Type' 'text/plain; charset=utf-8';
    add_header 'Content-Length' 0;
    return 204;
	}


 	#rewrite /e/(.*) /$1 break;
 	proxy_pass http://webapp.org:3000/;
	proxy_redirect off;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
	proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	
 	}


location /db {


	if ($request_method = 'OPTIONS') {
		#add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Origin' '$current_origin';
        add_header 'Access-Control-Allow-Credentials' 'true';
    	add_header Content-Security-Policy "default-src 'self' http://localhost:5984 \
				https://webapp.org:5984	http://webapp.org:5984 \
				https://h-gill.com:5984 http://h-gill.com:5984 \
				https://api.cloudinary.com http://api.cloudinary.com \
				https://res.cloudinary.com http://res.cloudinary.com;";
        #add_header 'Set-Cookie' 'HttpOnly;Secure;SameSite=None';
		add_header 'Access-Control-Allow-Methods' 'HEAD, GET, POST, PUT, DELETE, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'Origin,DNT,User-Agent,X-Requested-With,\
			If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
	    }

 		#rewrite /e/(.*) /$1 break;
 		#proxy_pass http://webapp.org:5984/;
 		proxy_pass http://couchdbsvr/;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
   		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
   		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
 		}

}


```






