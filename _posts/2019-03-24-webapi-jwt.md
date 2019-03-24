---
layout: post
title:  Web API, Middleware, and JWT
category: Dev
tags: [API, Session, RESTful]
description: Basic implementation of RESTful web API and JWT implementation using Golang
---

Basic API graph construction
```
+----------+      +---------+      +----------------+
| Endpoint | <--> | Handler | <--> | Business Logic |\ 
+----------+      +---------+      +----------------+ \
						       \
							\  +----------------+
	...						 \ |    Library     |
							 / +----------------+
							/
						       /
+----------+      +---------+      +----------------+ /
| Endpoint | <--> | Handler | <--> | Business Logic |/
+----------+      +---------+      +----------------+
```
### Basic API construction
Most of web API that we encounter follow roughly the same pattern as described in graph above.
From the basic experimental program to production level API.

#### Endpoint
Endpoint is where the user input their data and sent it to a certain address. 
Most common data used for data exchange between client (user) and server is a JSON (JavaScript Object Notation). 
Endpoint can be invoked from a command line using cURL or from browser pages using framework such as jquery. 
After invocation, handler will receive the data.

#### Handler
Handler act as a router for data. Based on their path, handler decide what business logic should handle the data. 
Handler also act as a gate; keep unwanted data or user from accessing business logic. 
Verifying data is also part of handler task.
For example, if data have a piece of information is missing, handler will return a rejection
Identity and access management is a handler task.

#### Business Logic
If the user and its data pass verification of identity and data, it will enter the business logic part.
This is where operation such as CRUD (Create, Read, Update, and Delete) database happen, automatic emailing, SMS verfication, Token generation and many others.
Usually one handler only have one business logic.

#### Library
Library is where common and reuseable mechanisms stored can can be called by any business logic. 
For example, many business logic using automatic emailing for a different reason. 
One for forgot email protocol, one for marketing purposes, and other for warning message.

We can create a function for automatic email sending with recipient, sender, and message as a input so we don't need to replicate automatic emailing for every business logic.

While it is really simple in graphs, in reality API construction can be complex because increasing number of endpoints and business logic.
Building a maintainable API is developer goal.
Coherent and orderly API can help both user (if you are selling your API service such as Google Map) and developer.
User can easily learn your API structure and get what they need.
A good documentation should make user adoption faster.
For developer, a good documentation helps maintaining, debugging and inheriting code.

### RESTful API
RESTful API is one of the web API that enables client server communication. 
Server deploy endpoints and client could get information by invoking those endpoint with appropriate authorization and data.
RESTful API concentrate on create, read, update, and delete (CRUD) operation.
Login to a website, register an account, follow an account in social media and all database related operation usually done in CRUD operation.
There are many other protocol such as RPC and SOAP but we will concentrate in RESTful API.

RESTful API have four major method that perform CRUD operation which is GET--represent read operation, POST--represent create operation, PUT--represent update operation, and DELETE--represent delete operation.
While it is true that all operation can be done with only POST method, assigning appropriate method to a endpoint help developer identify an operation and makes same endpoint reuseable for other method.

For an example, adding a user can be done using POST method since we want to create a user. 
Checking a user, maybe for a how long s/he has been registered, can be done using GET method.
Updating info about user can be done using PUT method since we want to update information about a user with specific id.
Deleting a user, maybe because s/he no longer use the service anymore or unsubscribe from the service can be done using DELETE method.
All of this can be stored using an endpoint with extra information. 
Maybe we can assign endpoint using `/users/` and if we want to point to a specific id, we can use `/users/{id}` where `{id}` is the id we want to look for.

#### Middleware
A middleware is a part between handler and business logic. 
Things such as authorization or adding more information to an original request so that business logic could done the job better. 
Authorization and authenticantion can be considered as middleware. 
Few service maybe need more authorization before one could access business logic because it is contain a sensitive information.
Each handler could have their own middleware. 

For example, logging middleware maybe used in all handler because it is job is writing who is accessing, what handler s/he accessing, and what time s/he accessing the handler. 
Authentication, on the other hand, only apply to several handler with greater degree of personalisation and private information. 
Middleware is a part of library since it has repetitive task throughout handlers.

Decorator pattern, like middleware, are common throughout software architecture.
Decorator basically a function that take another function of a specific type and return the function of the same specific type.
We can see in tutorial.


### Session for more friendly access management

Login helps server identify who is login so server could serve information that only s/he could see.
Login in something we access everyday seems tedious works.
After all, we access it using our own device which rarely used by other people.
Session come so we don't need login everytime we want to retrieve information such as our social media feeds, email inbox, and our shopping list in an ecommerce.
Session usually given when we succeded login.

Each session have expiry time.
It explains why you still need to log in but not everytime you access it.
Session comes in unique string that helps server recongnise that the one who sending a request to server is you.
One of the session implementation comes in JSON web token.

#### JSON web tokens (JWT)
According to ffical JSON Web Token Website, JWT are an open, industry standard RFC 7519 method representing claims securely between two parties.
In our web API, these two parties are client and server. 
With token, user does not need to login all the time to access information s/he needs which is like session we previously mentioned.
JWT also support single sign on.

JWT can be used to verify information exchange. 
This can be achived by using public/private key pairs so we could sure the one who is sending is who they say they are.
Additionaly, we can also sure the message is not tampered in by external parties.
JWT means to compact so it should be a short message.

#### Router 
We intialize router using package called `gorilla/mux` which you can get from github.
After we initialize a router, we try to add a path to the router.
A path consists of the path itself, a method, and a handler function.
After we register our path, we can serve it using `http.ListenAndServe`.
We can change the port as we like but for this tutorial we will use `:8080`.
We can see that `ListenAndServe` take a port and a router as an input.

```go
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", Handler)
	log.Fatal(http.ListenAndServe(":8080", r))
}
```

A handler function must have two input which is `http.ResponseWriter` and `*http.Request`.
In first input, we write what client want to see such as their order, balance, and etc.
In second input, we can extract what client send to our server such as their credentials, or new data. 

```go
func Handler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	io.WriteString("Hello")
}
```

There you go, you have your own server.
While this is basic idea, this can be scaled to a company level production.
For a concrete example, in next article we want to build basic user register.
There are many things to consider when creating API like user registration.
Things such as storing user profile, storing password, forgot account protocol and many others.
In next tutorial we also will implement JWT both for authorization and information integrity and verification.

