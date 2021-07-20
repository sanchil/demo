# Demo: A platform for demo applications and their deployments on bare metal and cloud native (Kubernetes) platforms

The aim of this project is to bring together reasonably functional version of applications and string them up together on bare metal and cloud native environments. This project aims to demonstrate the wiring up and building pipelines between components.

The technology solution components include

- A full stack application (ReactJS, RazzleJS)
- A data respository (CouchDB, FireStore)
- A cache (Redis)
- Edge proxies, Ingress Controllers and Load Balancers
- An API GateWay.
- A service mesh
- Platforms (Bare Metal, Docker, Kubernetes)

Note: Parts of the project are still being worked upon. 


This project contains the following stack

### Full Stack Application
- FrontEnd: ReactJS
- Server: RazzleJS
- State Management (Redux, Saga, useHooks)
- Identity Managemanagement ( OAuth 2.0/OpenId, Passport - Google, FaceBook, Twitter and Amazon)


### Data Repository
- CouchDB
- FireStore

### Cache
- Redis

### Edge Proxy
- Contour/Envoy Proxy
- Nginx

### API Gateway
- Express-Gateway




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
