# Demo: A Functional ReactJs Application Stack

This project contains the following stack

- FrontEnd: ReactJS
- Server: RazzleJS
- State Management (Redux, Saga, useHooks)
- Identity Managemanagement ( OAuth 2.0/OpenId, Passport - Google, FaceBook, Twitter and Amazon)



## Bare Metal Build


## Docker Build


## Kubernetes Build

### Kubernetes pod

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
