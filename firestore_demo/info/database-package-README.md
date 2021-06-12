# database-package

This NPM package provides a simple interface for saving and retrieving data to and from a database. It will be accompanied by a simple companion application that utilizes the package. The application will be containerized & deployed to GCP – the Google Cloud Platform.

---

- [Overview](#overview)
  - [NPM package](#npm-package)
  - [Companion server application](#companion-server-application)
  - [Application container](#application-container)
  - [Deployment](#deployment)
- [Submission & questions](#submission--questions)
- [Relevant GCP documentation](#relevant-gcp-documentation)
- [Package reference](#package-reference)

---
# Overview

There's nothing more core to a web application than reading from and writing to its database. This package provides methods to enable just that: reading from a database, and writing to a database.

## NPM package
In particular, this package reads from and writes to a [GCP Firestore](https://cloud.google.com/firestore/docs) database.

But it also does a bit more. When writing data, the package saves that data to an in-memory cache. When retrieving data, it first checks its in-memory cache for matching data. If a match for the query is found, and if the match is sufficiently fresh, it will return that data without querying Firestore.

The size of the cache is limited. The package will have to make sure that the size of the cache – in bytes – never eclipses its allocation.

Use the [package reference](#package-reference) below to guide the development of your package.

## Companion server application
Write a companion server application using popular NPM server package [express](https://www.npmjs.com/package/express) to showcase the packages's basic functionality.

Have the application handle the following requests, responding in JSON:
- `GET /:collection?limit=LIMIT` – Returns `LIMIT` (default: 10) documents of the collection `:collection`
- `GET /:collection/:id` – Returns a single document of collection `:collection` and ID `:id`
- `POST /:collection` – Creates a document in the `:collection` collection using the submitted data, returns that document JSON-formatted
- `POST /:collection/:id` – Updates a document of collection `:collection` and ID `:id` using the submitted data, returns that document JSON-formatted

The application should also handle a simple [health check](https://cloud.google.com/compute/docs/instance-groups/autohealing-instances-in-migs) request.


## Application container
Write a simple Dockerfile to containerize the application, and a script to build an image from the Dockerfile.


## Deployment
The companion application is to be deployed onto the Google Cloud Platform. Use your Dockerfile to create a container, push that container to GCP, and use it to create a [Compute Engine Instance Template](https://cloud.google.com/compute/docs/instance-templates). Use that template to deploy an auto-scaling [Compute Engine Managed Instance Group](https://cloud.google.com/compute/docs/instance-groups). For the purposes of this challenge the auto-scaling settings need not permit more than 1 concurrent instance, but configure the group such that changing the maximum concurrency is trivial.


--- 
# Submission & questions
Please complete this challenge and respond to the code test email in the next 5 days. Please ensure that the email's subject line is "NiceJob Database Package Challenge".

We're looking for two things in your email:
1) A _.zip_ attachment containing your project directory, with the following:
  - Database package
  - Companion server application
  - Dockerfile
2) A 10-minute-or-less [Loom](https://www.loom.com) (or equivalent) video walkthrough of your code. In the video, please demonstrate usage of your project, the commands you've written to manage it (deployment, etc.), and discuss the design decisions you've made within your code.

If you have any questions along the way, please respond to the code test email.

---
# Relevant GCP documentation

### Compute Engine Instance Templates
- [GCP Compute Engine Instance Templates](https://cloud.google.com/compute/docs/instance-templates)

### Compute Engine Managed Instance Group
- [GCP Compute Engine Instance Groups](https://cloud.google.com/compute/docs/instance-groups/)

### Firestore
- [Firestore documentation home](https://cloud.google.com/firestore/docs)
- [Firestore documentation: Data model](https://cloud.google.com/firestore/docs/data-model)
- [Firestore NPM client library](https://github.com/googleapis/nodejs-firestore)

---
# Package reference
The package must export a class that can both meet the criteria provided in the [NPM package](#npm-package) section above, and accommodate the provided constructor and methods below.

## Constructor

```js
import Database from 'database-module';

const db = new Database({
    project_id,
    cache_max_age,
    cache_allocated_memory,
})
```

#### Constructor options

| Property | Type | Description | Default value |
| -------- | ---- | ----------- | ------- |
| `project_id` | String | Google Cloud Platform project ID | |
| `cache_max_age` | Number (seconds) | Cached data age threshold | `3600` |
| `cache_allocated_memory` | Number (MB) | Maximum in-memory cache size, in megabytes | `64` |

- When retrieving data, if the cache-matched data was added more than `cache_max_age` seconds ago, we do _not_ return the cached data


---
# Methods

- [write()](#writedatatype-collection-id--document)
- [readOne()](#readonedatatype-collection-id-) 
- [readMany()](#readmanydatatype-collection--filters) 

---
## write\<DataType>({ collection, id }, document)
Writes a document to the database, and to the in-memory cache.

```ts
await db.write<DataType>({ collection, id }, document);
```

### Parameters

| Parameter    | Type   | Required | Description |
| ------------ | ------ | -------- | ----------- |
| `collection` | `string` whose value is enforced by `DataType` | &check;  | Firestore collection |
| `id`         | `string` | &check;  | Firestore document ID |
| `document`   | `object` whose shape is enforced by `DataType` | &check;  | Firestore document ID |

### Returns
This method does not return anything.


### Typescript (optional)
- The generic `DataType` should confer _both_ the structure of `document` **and** the value of `collection`
    - e.g. a type `UserType` demands that `document` include a `first_name`, `last_name`, and `email`; while also demanding that the `collection` value is `"Users"`
- Enforce that all property names of `document` are strings, and that all property value types are either strings, numbers, booleans, or arrays of strings
    - Property values may also be nested objects that meet these same criteria


### Errors
This method should throw if:
- Either `collection`, `id`, or `document` are not provided, or are falsy – all are required


### Example usage
```ts
/**
 * Save a document
 */
await db.write<UserType>({ 
    collection: "Users",          // Enforced by UserType
    id: "23"
}, {                              // Enforced by UserType
    first_name: "Michael",
    last_name: "Angelo",
    email: "mangelo@sistine.org",
})
```

---
## readOne\<DataType>({ collection, id })
Retrieves a single document from the database, or, if applicable, from the in-memory cache.

```ts
const document = await db.readOne<DataType>({ collection, id });
```

### Parameters

| Parameter    | Type   | Required | Description |
| ------------ | ------ | -------- | ----------- |
| `collection` | `string` whose value is enforced by `DataType` | &check;  | Firestore collection |
| `id`         | `string` |  &check; | Firestore document ID ||


### Returns
This method returns a single document, an object, whose type is to be inferred by the `DataType` generic. If the document does not exist, the method throws an error.


### Typescript (optional)
- The generic `DataType` should confer both the structure of the response document _and_ the value of `collection`


### Errors
This method should throw if:
- Either `collection` or `id` are not provided, or are falsy – both are required
- If the document does not exist


### Example usage
```ts
/**
 * Retrieve a document from the Users collection
 */
const user = await db.readOne<UserType>({ 
    collection: "Users", 
    id: "23"
});
```


---
## readMany\<DataType>({ collection }, filters?)
Retrieves a set of documents from the database, or, if applicable, from the in-memory cache.

```ts
const documents = await db.readMany<DataType>({ collection }, filters?);
```

### Parameters

| Parameter    | Type   | Required | Description |
| ------------ | ------ | -------- | ----------- |
| `collection` | `string` whose value is enforced by `DataType` | &check;  | Firestore collection |
| `filters`    | `object` whose shape is enforced by `DataType` |  | Query filters |


### Returns
This method returns an array of documents, whose type is to be inferred by the `DataType` generic.


### Typescript (optional)
- The generic `DataType` should confer both the structure of the documents in the response array _and_ the value of `collection`
- `DataType` will also restrict `filters` – the properties & property values in `filters` must match the `DataType` document shape
    - The inclusion of document properties in `filters` is optional; alternatively, `filters` does not need to be passed in at all


### Errors
This method should throw if:
- `collection` is not provided, or is falsy


### Example usage
```ts
/**
 * Filter Users by first name
 */
const users = await db.readOne<UserType>({ 
    collection: "Users", 
}, {
    first_name: "Michael"
});
```
