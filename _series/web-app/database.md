---
main: web-app
layout: series
title: Database
page: 0
---

Database is the place where we store all our data. Who is our user, what kind of topic she has published, how many subscriber that the topic has? This kind of question can be answered when we look to our database.

From the description, we have at least four entities. **User** where we stored detail about the person such as phone number, address, and passwords. We store the topics that users create in separate table so one user could have multiple topic. This is called one-to-many structure. Each **topics** also have its own **subscriber** to tell the app which user need to be notified when there is a publication in the topics. Relation between topics and subscribers is also one-to-many since a topic could have many subscroption. Think it is like a youtube channel and subscribers. The last element is **notification** itself. When user publish to a topic, each of its subscriber receive a notification and that notification should be stored in order to distinguish whether the notification already read by the subsciber or not. Keeping notification also means the user could retrieve the notification just like when a user click a notification bell in her facebook page.

## Database

Here we show how to create a database that satisfies requirement we mentioned earlier. The second part is how to connect database to the app so any writing or reading operation can be done automatically. We use MySQL as a database service. We could use other database service but the concept of data structure should be the same. Only the implementation differs.

### User

Once we cleared the basic desgin of the app, we move to data structure of each model. First we need to design user structure since it is the backbone of this app. A user should have an email, a password, a token and a unique identifier. Let's imagine an sign up page. User need to fill email and password first and click registed button. Once front end send the email and the password to backend, backend process it by change the password to cryptic message so any stored password in DB is not a plain text. Further explanation can be found in Authentication part of this series. After processing it, backend store it in Database for future retrieval.

In MySQL we create a table that holds user information
```mysql
CREATE TABLE users (
  id VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255),
  PRIMARY KEY (id),
)
```
Once user login, we give the user a token so she does not need to relogin everytime want to access our API. How token are generated are in Authentication part. Once the user is set up, she could create a topic so other user could subscribe to her topic.

### Topic

Topic, just like mentionend before, has many-to-one relationship with user. To ensure every topic we create related to user, we need to utilize something called foreign key in MySQL. Different database may have different approach to one-to-many relationship. In MongoDB, we could create a new key that holds all topic that created by the users. Let's create a topic table
```mysql
CREATE TABLE topics (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```
We declare title and description. Title cannot be empty and description can be null. We also set up a foreign key in users so any id that filled in user_id column should be registered in table users otherwise it will throw an error. 

### Subscriber

Subsciber have two relationship. First with topic and with users. Each subscription will be notified when there is a publication in the topic. The one who subcsribe is also a user so we need to keep it too. The MySQL table will look like this

```mysql
CREATE TABLE subscribers (
  id INT NOT NULL AUTO_INCREMENT,
  topic_id INT NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY topic_id REFERENCES topics(id)
  FOREIGN KEY user_id REFERENCES users(id)
)
```

### Notification
Notification is the main model we need to create. Notification should have the user that received notification so we can distinguish each users notification. It also should contain topic_id so we could trace back which notification belongs to what topic. Message is also a vital part of notification. This is the general message that want to be published. There is a column called is_read to differentiate between message that has read and not. The table will look like this
```mysql
CREATE TABLE notifications (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  topic_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  is_read TINYINT DEFAULT FALSE,

  PRIMARY KEY (id),
  FOREIGN KEY topic_id REFERENCES topics(id)
  FOREIGN KEY user_id REFERENCES users(id)
)
```

TINYINT is MySQL version of boolean. When a user retrieve a notification, the is_read column should switch from false to read. So in the future, she wont read the same notification twice unless she go to notification detail page.

## Application

Once we set up the database, we're ready to connect it to the app. Each of the programming language has its own mechanism to connect with MySQL. Golang has its own way to write and read to database. In this section, we can learn how Golang in MySQL.

### Set up a Query

MySQL operates in query. The create statement above is one of the query. Writing and reading MySQL also can be done using query. There are four basic operation in databaase aptly named CRUD which stands for create, read, update, and delete.

Let's say we want to write email and password to users table with email equal to `aaa@bbb.ccc` and password equalt to `secret_password`.
```mysql
INSERT INTO users VALUES (id, email, passowrd) VALUES ('first_id', 'aaa@bbb.ccc', 'secret_password')
```

If we want to update user email we can do this
```mysql
UPDATE users SET email='ddd@eee.fff' WHERE id='first_id'
```

If we want to retrieve the user, we can do this
```mysql
SELECT * FROM users WHERE id='first_id'
```

And lastly, if we want to delete the user
```mysql
DELETE FROM users WHERE id='first_id'
```
Each table has different column but follow the same syntax.

### Golang Basic Query
Golang, as a strongly typed languange, has a complex data retrieval compared to Javascript/NodeJS. Golang also use a pointer that makes any dynamic typing user easily discouraged. I try my best to explain how SQL works in golang.

```golang
package main
import (
  "database/sql"
  _ "github.com/go-sql-driver/mysql
)
func main() {
  username := "root"
  password := "password"
  protocol := "tcp"
  address := "localhost"
  dbName := "example"
  composed := username + ":"
	composed += password + "@"
	composed += protocol + "("
	composed += address + ")/"
	composed += dbName
	db, err := sql.Open("mysql", composed)
  if err != nil {
    panic(err)
  }
  ...
}
```

We try to connect with special syntax stored in a string. `composed` has the information to connect to a database. We declare the username, password, address, protocol and dbname. All MySQL database operation are done in `db` variable which has type of `*sql.DB`. There are many methods inside `db` but we cocentrate on `.Exec` and `.Query`.

Writing a query can be done using `.Query`
```golang
result, err := db.Query("SELECT id, email FROM users WHERE id='first_user')
```

Or if we want to more dynamic input, we can use `?` as a place holder
```golang
result, err := db.Query("SELECT id, email FROM users WHERE id='?'", userId)
```

Alternatively, we can user `fmt.Sprintf`
```golang
finalQuery := fmt.Sprintf("SELECT id, email FROM users WHERE id='%s'", userId)
rows, err := db.Query(finalQuery)
```

If error is nil, then we can proceed to manage the result. Unlike in dynamic typed language, the result need to be scanned before we can use it.
```golang
user := struct{
  Id string
  Email string
}{}
for rows.Next() {
  if err := rows.Scan(&user.Id, &user,Email); err != nil {
    return err
  }
}
// do something with user
```
There we try to put the result to our anonymous struct. After the scan procee, `user.Id` and `user.Email` should have a value that retrieved from database. If you notice there is a loop in our example. This is for assigning many values since SQL returns row can be multiple. That's all for reading a query result using golang.

For the writing part which consists of inserting, updating, and deleting, there is a different method. We use `.Exec` for that purpose. The writing process is pretty straight forward.
```golang
columnQuery := strings.Join([]string{"id","email","password"}, ",")
valueQuery := "(" + strings.Join([]string{"first_user", "aaa@bbb.ccc", "123hsak"}) + ")"
finalQuery := fmt.Sprintln("INSERT INTO %s VALUES %s", columnQuery, valueQuery)
result, err := db.Exec(finalQuery)
if err != nil {
  return err
}
// do something with result
```
result in writing process have two key, the last id inserted if the table use auto increment such as topics, subscribers, and notifications table and how many rows affected. If we don't use it, we can replace it with `_`. Managing query using `fmt.Sprintf` is preferable because its modifiability. If we want to create more complex query, maybe wa can use ORM but for now utilzing what Go has to offer seems enough.


