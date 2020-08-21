---
layout: post 
title: Web API, Middleware, and JWT
category: Dev
tags: [API, Session, RESTful]
description: Basic implementation of RESTful web API and JWT implementation using Golang
---

// TASK: need to knwo how linking post
Previous article: 

### Goals
1. API deployment in local
2. User and password registration and encryption
3. Database in Golang
4. JWT implementation
5. Forget Password Protocol
6. Unit testing in Golang
7. API Documentation 

This seems a lot to take in.
Read slowly and experiment with it so you get better understanding.
Once you understand, you can create your own API for your business or just for fun.
Quick note, this is just my implementation, you can explore and create better API which suits your business.

Your end directory should look like this
```
	USER DIRECTORY
```

Let's recall our code from previous article; basic implementation of an API.
```go
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", Handler)
	log.Fatal(http.ListenAndServe(":8080", r))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	io.WriteString("Hello")
}
```

Based on our goal, we need to have endpoint for user registration which obviously use a POST method.
We also want to add forget password protocol.
We will store all user data in a mySQL database.
Make sure that you have an SQL server up and running.

First, we create a file called `server.go` which is the main file of our project.
We try to import important stuff here.
Since Go does not allow unusable variable, we only import what we need
```go
package Webapi

import (
	"log"
	"net/http"
	"github.com/gorilla/mux"

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)
```
We import five package here, here is a simple explanation of each package
- `log` is for printing in the console but with time when it is fired
- `net/http` native Go package for all things HTTP related
- `github.com/gorilla/mux` a router for handling incoming request
- `database/sql` native Go package for database related stuffs
- `github.com/go-sql-driver/mysql` Go need outside driver to operate a database. Different type of database needs a new driver.

We modify the `main` function and add another function 
```go
// server.go
func main() {
	router, err := NewRouter()
	if err != nil {
		log.Fatal(err)
	}

	log.Fatal(http.ListenAndServe(":8080", router)
}

func NewRouter() (*mux.Router, err) {
	muxRouter := mux.NewRouter().StrictSlash(true)

	conn, err := sql.Open("mysql", GetValue("./jsonFiles/config.json", "access"))
	if err != nil {
		log.Fatal(err)
	}

	aes := GetValue("./jsonFiles/config.json", "AES")

	handlerList = GetHandlerList(conn, aes)
	for _, route := range handlerList {
		muxRouter.Handle(route.Path, route.HandlerType).Methods(route.Method)
	}

	return muxRouter, nil
}
```
That's all in the `server.go` file.
In the snippet above, we now have a function called `NewRouter` which initiate router.
Inside the function we can find how establish a mysql connection to server.
We use for loop to iterate every path, handler, and method.
So we only need to add or remove it later without modifying `server.go` code.
Function `GetValue` is a JSON reader which take a key and return a value.
We will show the snippet later.

Here is the list that endpoint we need to create and their methods

| Path         | Methods | Description                |
|--------------|---------|----------------------------|
| /register    | POST    | Register new user          |
| /VerifyUser  | GET     | Verifying user email       |
| /Login       | POST    | Login to site              |
| /ForgetPass  | POST    | Request for a new password |
| /VerifyToken | GET     | Verify token we send       |
| /NewPass     | POST    | Register New Password      |

Based on this endpoint, we can infer the underlying business logic that handle each endpoint.
An event can have more than one endpoint such as registering user have two endpoint.
`/register` for storing new profile information to database and `/VerifyUser` for email verification.

We make the event registration first.
We create different file called `function.go` for our business logic
```go
package Webapi

import (
	"net/http"
	"net/url"
	"net/smtp"
	"io/ioutil"

	"encoding/json"
	"encoding/hex"
	"crypto/sha512"

	"time"
	"strconv"
	"strings"
	"log"

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)
```

We import many stuff because this file handle business logic which require many packages
 - `net/url` package for URL manipulation such as extracting query string or host.
 - `net/smtp` package for sending email using SMTP
 - `io/ioutil` standard for file reading and in this case, request body
 - `encoding/json` encoding and decoding JSON format 
 - `encoding/hex` same as above but for hexadecimal
 - `crypto/sha512` generate SHA-512 from bytes
 - `time` time manipulation library
 - `strconv` string conversion to integer and many more
 - `strings` string manipulation library

We need to declare type for each endpoint. So we need type for `/register` and `/verifyUser`.
(I'm not sure but i am quite sure that there is easy way to do this without repetiting type declaration)
We also need to declare type for each incoming JSON from client.
We will name it `Registration` and `Login`

For registration handler `/register`, let's say we need user email, password, name, and phone.
We will create a struct type that can hold such data.
For login, we only need email and password.


```go
type Registration struct {
	Name     string `json: name`
	Email    string `json: email`
	Phone    string `json: phone`
	Password string `json: password`
}

type Login struct {
	Email    string `json: email`
	Password string `json: password`
}
```

For our first endpoint `/register` we create a new type. 
Each type that handle endpoint should have method `ServeHTTP` with specific input

```go
type CreateNewUser struct {
	db            *sql.DB
	aesCredential string
}

func (cnu *CreateNewUser) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.body)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	var regis Registration
	err = json.Unmarshal(body, &regis)
	body, err := ioutil.ReadAll(r.body)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	query := GetValue("./jsonFiles/query.json", "CreateNewUser")
	err = InsertQuery(cnu.db, query, regis.Name, regis.Phone, regis.Email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	query = GetValue("./jsonFiles/query.json", "CreateNewPassword")
	err = InsertQuery(cnu.db, query, regis.Email, regis.Email + ":" + regis.Password, cnu.aesCredentials)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	return 
}
```
We try insert two things in database, first is user profile, and second is user credentials.
In second insert, we can see we want to encrypt the combination of email and password and store it in database.
Each login, we will verify it with encrypted password in database, by using same encrypting sequence.
If encrypted login message is the same as we store in database, then we allow it to pass other wise throw an error.
Now we will create the login mechanism as described above.

```go 
type LoginUser struct {
	db            *sql.DB
	aesCredential string
}

func (lu *LoginUser) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var login Login

	err := json.Unmarshal(body, &login)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	query := GetValue("./jsonFiles/query.json", "LoginCredentials")
	_, err = ReadQuery(lu.db, query, login.Email + ":" + login.Password, lu.aesCredentials)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// --- we will implement cookie around here
	w.WriteHeader(http.StatusOK)
	return
```

So if the login and password match, we allow user to login.
That is the basic of registration and little encryption.
We already impelemnt two from six our goal.

Next we want to implement a database so handler can store and retrieve data.
Usualy, in an web api, database implentation handled by an ORM (object relational mapping).
This will be useful when database is large and table connected with other table with some relation.
For now i only implement raw query that stored in a configuration json.
Maybe in next article we will implement an ORM with larger scale table and business logic.
Both `ReadQuery` and `InsertQuery` are database function.
All database functions are stored in `utils.go`.

```go
// utils.go
func InsertQuery(db *sql.DB, query string, input ...interface{}) error {
	input = InputFilter(input...)

	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}

	rows, err := stmt.Exec(input...)
	if err != nil {
		return err
	}

	_, err = rows.LastIndexId()
	if err != nil {
		return err
	}

	return nil
}
```
We will explain `InputFilter` later.
Inserting a rows in SQL using go comes in two step.
First is prepareing the query itsel.
If you open the query in json config, you will see that query have `?` on it.
`?` will be replaced by values we provided in `stmt.Exec`.
`rows.LastIndexId` is to check whether the rows is inserted or not.

There are two things that need more explanation.
First is `interface{}` and second is `...` as a input.
If you already know what it represent, feel free to skip.
`interface{}` is non determined type. 
For example, when we query database, we may have input string or number.
In this kind of case, we use `interface{}`. 
To use `interface{}`, we need to infer it types first. 
Like a json decoding where we should determine the struct first.

As for `...` or variadic notation, let me gives an example.
When querying a database, sometimes our query need many values and other times just only one or two values.
Variadic notation handle this nicely.
It makes multiple input considered as one.
In our example above, we can have input as many as we like as long as match the number of `?` in query.
For example, `InsertQuery(db, query, 123, 321, "askd")` can be acceptetd so does `InsertQuery(db, query, "wsda")`


```go
func ReadQuery(db *sql.DB, query string, input ...interface{}) ([]interface{}, error) {
	rows, _ := db.Query(query, ...input)
	columns, _ := rows.Columns()
	count := len(columns)

	val := make([]interface{}, count)
	valPtrs := make([]interface{}, count)

	for rows.Next() {
		for i, _ := range columns {
			valPtrs[i] = &val[i]
		}
		rows.Scan(valPtrs...)
		return val, nil
	}
	return nil, nil
}

```
Code above only get one row only. 
This is enough for now.
We prepare two value with `interface{}` but one is a pointer to another value.
In `rows.Scan`, we transfer all queried rows value to the value where the pointer pointing.
That's why we return `val` not `valPtrs`.

```go
func InputFilter(input ...interface{}) []interface{} {
	for i := 0; i < len(input); i++ {
		switch input[i].(type) {
		case int:
			if input[i] == 0 {
				var ph sql.NullInt64
				input[i] = ph
			}
		case float64:
			if input[i] == 0 {
				var ph sql.NullFloat64
				input[i] = ph
			}
		case string:
			if len(input[i].(string)) == 0 {
				var ph sql.NullString
				input[i] = ph
			}
		}
	}
	return input
}

```
