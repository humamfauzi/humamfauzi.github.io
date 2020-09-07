## Database Overview

Here we discuss many type of database and its functionality. We also discuss database features that makes one database different from one and the other. In modern app, database plays central role in storing and retrieving data. The internet penetration to many layer of social aspect in public domain makes internet plays central role in improving one lifes.

While database technology is not as sexy as machine learning, it still one of the foundation of a great app. Any software developer should have knowledge about database so that it could help s/he to decide what is the best approach of a certain app problem. We hope this article will help you understand database better.

## Database Feature
All data need to be stored and retrived. Data such as username, password, puchase goods can be stored in database. We also need to retrieve information that we store fast enough. Database usually stored in cloud computing service such as AWS, GCP, and Azure link!. In database there are several terms that i think we should familiarize our self with. First of all is ACID principle which stands for atomicity, consistency, isolation, and durability. 

Atomicity means that every operation is success or failed in one group; there are no partial success. For example, if we want to update payment in a transaction. Atomicity requires all data involved in that update payment operation updated all or not updated at all. Let's say in update payment operation we should update transaction status from unpaid to paid **and** we need to subtract the amount of money from that account. We can't do partial update like only change the status or only subtract certain amount. Important operation like money-related need to comply to atomicity.

Consistency means any data that stored comply to a certain defined rule. For example, we define that any transaction between parties can only happen when both parties registered in our database. A transaction should be rejected if we detect requester does not have any id that we record. While it is true that we can define such rule in our backend system, having a database that set up their own rule makes data more reliable. For instance, our database accessed from two different backend service when we have no idea what those backend services look like.

Isolation means any operation isolate any involved data when there is operation requires to access that data. I think Isolation principle helps atomicity. As an illustration, we go back to our payment example. There are two parties, buyer and seller. In a coincidence, seller accept the order and buyer cancel the order in a split second. If in that split second sytem detects that buyer do it first, then seller can no longer accept the order because it canceled. Else if seller do it first, buyer cannot cancel their order because it already processed. Without isolation, both parties can do their action and it kind of violate the business logic.

Durability means if there is an error, any operation should return to its previous state as if the operation never happens. In my opinion, it is subset of atomicity. It makes sure that any operation could be reversed in case something wrong. To illustrate this, let's say we have money transaction between A and B. In the middle of transaction operation, there is power outage that shut our database. When database is up and running again, transaction between A and B should never happen because the previous state is there is no transaction between A and B; their balance should remain the same.

There is also something called normalized and denormalized database. Many of this terms exist in relational database but i think can be extended to variaous type of database. 

## Data Cateogorizing

## Database Type

### Key Value

### Wide Column

### Document

### Relational

### Graph

### Full Text Search