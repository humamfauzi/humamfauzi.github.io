---
layout: post 
title: Simple Introduction to Database Type
categories: Dev
tags: [database, relational, nosql]
description: Here we discuss many type of database and its functionality. We also discuss database features that makes one database different from one and the other.
---

Here we discuss many type of database and its functionality. We also discuss database features that makes one database different from one and the other. In modern app, database plays central role in storing and retrieving data. The internet penetration to many layer of social aspect in public domain makes internet plays central role in improving one lifes.

While database technology is not as sexy as machine learning, it still one of the foundation of a great app. Any software developer should have knowledge about database so that it could help s/he to decide what is the best approach of a certain app problem. We hope this article will help you understand database better.

## Database Feature
All data need to be stored and retrived. Data such as username, password, puchase goods can be stored in database. We also need to retrieve information that we store fast enough. Database usually stored in cloud computing service such as AWS, GCP, and Azure link!. In database there are several terms that i think we should familiarize our self with. First of all is ACID principle which stands for atomicity, consistency, isolation, and durability. 

Atomicity means that every operation is success or failed in one group; there are no partial success. For example, if we want to update payment in a transaction. Atomicity requires all data involved in that update payment operation updated all or not updated at all. Let's say in update payment operation we should update transaction status from unpaid to paid **and** we need to subtract the amount of money from that account. We can't do partial update like only change the status or only subtract certain amount. Important operation like money-related need to comply to atomicity.

Consistency means any data that stored comply to a certain defined rule. For example, we define that any transaction between parties can only happen when both parties registered in our database. A transaction should be rejected if we detect requester does not have any id that we record. While it is true that we can define such rule in our backend system, having a database that set up their own rule makes data more reliable. For instance, our database accessed from two different backend service when we have no idea what those backend services look like.

Isolation means any operation isolate any involved data when there is operation requires to access that data. I think Isolation principle helps atomicity. As an illustration, we go back to our payment example. There are two parties, buyer and seller. In a coincidence, seller accept the order and buyer cancel the order in a split second. If in that split second sytem detects that buyer do it first, then seller can no longer accept the order because it canceled. Else if seller do it first, buyer cannot cancel their order because it already processed. Without isolation, both parties can do their action and it kind of violate the business logic.

Durability means if there is an error, any operation should return to its previous state as if the operation never happens. In my opinion, it is subset of atomicity. It makes sure that any operation could be reversed in case something wrong. To illustrate this, let's say we have money transaction between A and B. In the middle of transaction operation, there is power outage that shut our database. When database is up and running again, transaction between A and B should never happen because the previous state is there is no transaction between A and B; their balance should remain the same.

There is also something called normalized and denormalized database. Many of this terms exist in relational database but i think can be extended to variaous type of database. Basically, normalized means reducing duplicate information in relational database data. For example, the detail about contact should be in contact table only, any other table that need contact information should retrieve it via join. Denormalized is reverse of normalization. Sometimes denormalization is required to avoid multiple joins that could cause an error. As a rule of thumb, i think database should normalized to avoid information mismatch but still have a good performance. Once it starts to tamper with your performance e.g timeout, denormalizing is a good idea.

## Data Cateogorizing

Here is a litte insights that i think might be useful when cateogrizing data. In my opinion, there is three data type that stored in database. Static data, operation data, and log data. Static data means there is nothing users could do about it like in internet news. Any news still can be updated but from admin not regularly from users. Operation data is like drivers pick an order in hail riding app. The data constantly updated and could create new relations between data point. Users also intervene how data behave unlike in static data. The last one is log data, it is what is is. Users and admin cannot intervene and should be read only.

In order to deliver this data better, we need to list the requirement of these three data type. Static can be broken down to two more category, user facing or system facing. In our previous example, news data like the reporter, upload date, revised date, and news itself is a user facing. It need to be delivered in user fast. Fortunately, user facing data rarely have relation with other data. The system facing static is data detail for information like error categorizing. I think key value store and document database is suitable for this kind of work. 

Operation database is the hardest one because it is backbone of many industries. Usually, operation database use relational database because its ACID properties and well known in industries. Let's say a driver picking up an goods from a customer and deliver it to another person. Operation database make sure that driver is registered in system, the goods is not illegal or within weight and volume range, and within certain radius. The weight, volume, and radius limit is a static data because different vehicle have different capabilities. The table that handle that order should record the driver id, goods id, and maybe a trip id. Operation database can but not neccesarily record the driver detail. The data that should be recorded in operation database is the data that need to be ACID compliant.

Log data should be not accessed by users and admin. It only shown to developoers and analyst . Data such as timestamp, errors, io stream and API access can be used for improving system by develepers and analyst. In my experience, log can located in same database as operation data but sometimes add burden to operation database when an analyst what to retrieve a certain data from log. I think both of them should have different database so any action from developer and analyst won't interupt operation. Partial solution is keep the log in certain amount of time like one week and export it to another database when there is low operation count.

It may miss several thing but for now it works and serve me well for me

## Database Type

There are many database type created to suit business needs. Knowing each advantage and disadvantage will help us pick best database that fit our needs. This is an ideal course, assuming that you want to build something from empty ground. If you want to migrate from a database to another database, maybe there are several additional step but it is outside of the scope of this article. Most of database mentioned here is provided directly or indirectly from cloud provider.

#### Key Value
Key value store work like a map or JSON (Javasript Object Notaation). It can add a key and a value. A value can be called using key. Key-value store like Redis works fast because it store the data in memory rather than disk. This can reduce latency down to miliseconds. Disadvantange of Key-value store are naming key and limited storage. The more detail information you want to store, longer the key required to ensure key won't conflict with another recorded key. Stored in memory usually have a lower capacity compared to disk storage. Same size storage can have huge different pricing between memory and disk.

Key value store is also hard for query because the only way to query a data is through key.This makes key value store only suitable for quick grab information.

#### Wide Column

Wide column is schemaless database means you don't need to construct data structure before using the database. It has key and document that act as a column. Wide column used for logging many data points operation such as IoT because can be distributed hence enhance durability of storage. Cassandra database support distributed service and schemaless. It also have its own query language -- a syntax to store or retrieve data from database -- called CQL. Similarity between CQL and standard SQL query makes catching up to CQL is not learning from zero.

Many wide column database have a good writing but lack of good reading capabilites. Analyzing data from wide column database need an external support to convert it to better database type so it could processed further.

#### Document

Document database is what people refer to as NoSQL. These database is schemaless and several of it support distributed service. Storing in document database is like storing a big JSON/Map. It suitable for early app because it schemaless so there is no need to define a rigid data structure. Document database also have index to optimize query. Filtering and searching inside document database is also possible with a query that every databse have their own language.

The most notable document database type is mongo DB. It is a free database that utilized by many companies to fit their needs. The popularity of mongo DB causes abundance of tutorial, different use cases, and community troubleshooting aka StackOverflow. Although it has its own query language and have different syntax from its relational sibling, it fairly easy to pick up and impelement structure or query you want to implement.

#### Relational

The most famous database type because it originates back in early computer boom. Relational database need a schema to operate. While it sounds cumbersome, it actually has at least two benefits. First is keeping your data neat and understandable. Second is its rigidity ensure any program that interact with it follows it rules not the other way around. Relational database enable users create relation between their data. While it sounds trivial, it have a lot of impact in data structure. Creating relation makes user could create a more complex and customizable table that consisted data from many table. Most of the problem, at least in my exprience, can be modeled with relational database.

Most notable relational database is MySQL and PostgreSQL. There paid relational database sevice such as oracle and Microsoft SQL but i choose the free one. 

#### Graph

Graph database is the database that usually forgotten when someone talks about NoSQL. Graph database focus on relations between node. Like in graph theory, data that stored in graph database consists of node and vertex. Graph database excel in handling many-to-many relations. While relational database capable doing many to many relationship using join tables, graph database manage it without using additional tool.

I can't say many things about graph database because i never use it really. I'd love to explore interesting case that graph database plyas central role.

#### Full Text Search

It pretty similar to docoment database. Notable player in full text search is elasticsearch. While elastic support paradigm that any document database support, i think it really shine in full text search. It offers quick search so that is support autocomplete search in a search bar. In text heavy application such archive elasticsearch really helps. On a good side, elasticsearch use Rest API to interact with database.

Same as the graph database, i never really use elastic or any full text database. Maybe i will improve this once i experienced using elastic.

---

So that's my overview for database. This post inspired by firebase.io database video.

