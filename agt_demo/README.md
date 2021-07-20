# agt_demo: A full stack ReactJS application

This project contains the following stack

### Full Stack Application
- FrontEnd: ReactJS
- Server: RazzleJS
- State Management (Redux, Saga, useHooks)
- Identity Managemanagement ( OAuth 2.0/OpenId, Passport - Google, FaceBook, Twitter and Amazon)

### Cache
- Redis

### Bare Metal Build
```sh
$ git clone https://github.com/sanchil/demo.git
$ cd demo/agt_basic
$ npm install
$ npm build
$ npm run start:prod
```
### Docker Build

The Dockerfile may be used to build an image of the application and also pushed to a docker repository.

```sh
$ docker build -t <repo>/<docker_image_name> .
```

for instance:

```sh
$ docker build -t app_image .
```
Setup the environment to run the appliation as a container. First let us create separate network


```sh
$ docker network create --driver bridge redis-net
```
The docker app needs redis for session caching and so we run a redis service attached to the redis-net

```sh
$ docker run --name redis -dp 6379:6379 --network redis-net redis
```

Run the docker application on redis-net

```sh
$ docker run --name <name> -dp 3000:3000 --network redis-net <repo>/<docker_image_name>
```
for instance:

```sh
$ docker run --name webapp -dp 3000:3000 --network redis-net app_image
```


### Kubernetes Build


#### Kubernetes pod


Run the following kubernetes manifest to have a demo full stack application up and running. You can run this on any k8 cluster. Try deploying this on a local cluster from the following project

[Hydra Cluster](https://github.com/sanchil/hydra_cluster)

```sh

apiVersion: v1
kind: Pod
metadata:
  name: redis
  labels:
    run: redis
spec:
  containers:
  - name: redis
    image: redis
    ports:
    - containerPort: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: ng
spec:
  type: NodePort
  ports:
  - port: 3000
    targetPort: 3000
    nodePort: 30010
  selector:
    run: ng
 
---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  type: ClusterIP
  ports: 
  - port: 6379
    targetPort: 6379
  selector:
    run: redis
---
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: ng
  name: ng
spec:
  containers:
  - image: sanchil/agt_demo:0.1
    name: ng
    ports:
    - containerPort: 3000
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}

```

## Author

* **Sandeep L Chiluveru** 
* [ sandeepnet@aol.com ]

