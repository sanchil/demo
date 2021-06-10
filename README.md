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




## Bare Metal Build


### Docker Build



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
