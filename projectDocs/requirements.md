# Software Requirements 

## Job management and bidding system

Our project aims to allow users to be able to post jobs. Other users can then post a bid to do the job.
The creator can accept bids and then close the job.The user has privileges over their own jobs. Admin users 
also exist and have privileges to all jobs.

### MVPs

* Have users be able to make accounts and have accounts persist
* Have users be able to login with their credentials and have authorization to their privilege set
for a set amount of time without having to login again
* Have users be able to create, update, delete and accept bids for a job
* Have users be able to bid on other users jobs
* Have a superuser role that can have privileges over all jobs
* Have users be notified of activity through email or sms on their jobs and jobs they have bid.

#### Stretch


* Implement graphql 
* Inter-user messaging

## Non-functional

* Our project will be as modularized as possible to allow for testing of each module.
* We hope to create a secure application with authorization through bearer tokens and basic auth and roles to define clear lines between ownership of data.

### User flow

* User creates an account with their username, email and a password.
* User signs into their account with their username and password.
* User can browse available jobs
* User can select a job and place a bid to do the job
* User can create a job themselves 

### Trello Board

* [Trello](https://trello.com/b/dom2QnVY/projectone)


# User Stories 

## Users 

- Given a username and password, a user should be able to create an account via a route
- Given a username and password, a user should be able to login and be granted specific privileges which persist for a set amount of time without having to login again
- Given a logged in user, they should be able to create a job and job details
- Given a logged in user, they should be able to change and update details of their job after it has been created
- An admin should be able to create a superuser account with all the authorization of a regular user, but with elevated privileges to alter any job in the system
- Given a google or github account, the user should be able to login via OAuth using one of those accounts.
- Given an event on a job related to a user, by either owning the job or having placed bids on the a job.


## Storage 

- Given creation of job, information relevant to the job should be saved into the database
- Each job should have a category it belongs to
- each job should have a user attached to it
