# 401 Mid term project

# Authors 

- Lindsay Pelltier
- Natalie Alway
- Travis Skyles 
- Trevor Thompson
- David Vloedman

## Problem Domain
Do you need help moving? mowing your lawn? setting up ikea furniture? There are not alot of options to find handy help. Our application can assist you in your search to find handy people across the nation! Our application will allows a user to login or signup using an Oauthorization process, once in our application that user will be able to post job requests. They will be able to have a role that can create a job, update the information, or delete the job posting. Other users are able to browse the job postings and "bid" to do the job.

## Job management and bidding system

Our project aims to allow users to be able to post jobs. Other users can then post a bid to do the job.
The creator can accept bids and then close the job.The user has privledges over their own jobs. Admin users 
also exist and have privledges to all jobs.

### MVPs

* Have users be able to make accounts and have accounts persist
* Have users be able to login with their creditentials and have authorization to their privledge set
for a set amount of time without having to login again
* Have users be able to create, update, delete and accept bids for a job
* Have users be able to bid on other users jobs
* Have a superuser role that can have privledges over all jobs
* Have users be notified of activity through email on their jobs and jobs they have bid.

#### Stretch

* Implement graphql 
* Inter-user messaging

### Documentation

* [JSDoc](https://can-u.herokuapp.com/docs)
* [Swagger](https://can-u.herokuapp.com/api-docs)

### Deployment

* [Heroku](https://can-u.herokuapp.com/)

### Setup 

* npm start

#### End points

* /roles - POST - to configure roles in local mongoDB
* /signup - POST - user, password and email within the body of the request
* /signin - POST - use basic auth with correct password user combination returns token for auth in other routes
* /users - GET - requires bearer token of superuser, returns all users in DB
* /deleteUser - POST - requires bearer token of superuser, deletes a user by username

Job Routes all require a token of user or higher with the exception of /jobs GET

* /jobs - GET - Returns a list of all jobs within the database
* /jobs - POST - Creates a new job in the database. Within the body field fields for the job are: name, description, price and jobType
* /jobs/:id - GET - When given a job ID returns that job
* /jobs/:id - PUT - When given a job, allows the record to be updated
* /jobs/:id - DELETE - When given a job ID that record can be deleted
* /jobs/bid/:id - PUT - When given a job ID and a price within the request body, that record/job will have an updated price
* /jobs/close/:id - PUT - When accessed with the token of the user that created the job and given an id this will close the job 

### Trello Board

* [Trello](https://trello.com/b/dom2QnVY/projectone)

### Requirements

* [User Stories](https://github.com/Apprenti-401-ProjectOne/ProjectOne/blob/dev/readmeDocs/requirements.md)
* [Group Agreement](https://github.com/Apprenti-401-ProjectOne/ProjectOne/blob/dev/readmeDocs/groupAgreement.md)

### Diagrams

#### Data flow
![](./readmeDocs/jobApp.svg)

#### Domain 
![](./readmeDocs/domain.jpg)
