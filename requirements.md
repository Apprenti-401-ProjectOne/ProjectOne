# Software Requirements 


### MVPs

* Have users be able to make accounts and have accounts persist
* Have users be able to login with their creditentials and have authorization to their privledge set
for a set amount of time without having to login again
* Have users be able to create, update, delete and accept bids for a job
* Have users be able to bid on other users jobs
* Have a superuser role that can have privledges over all jobs

#### Stretch

* Have users be notified of activity through email or sms on their jobs and jobs they have bid.
* Implement graphql 
* Inter-user messaging

### Trello Board

* [Trello](https://trello.com/b/dom2QnVY/projectone)


# User Stories 

## Users 

- Given a username and password, a user should be able to create an account via a route
- Given a username and password, a user should be able to login and be granted specific privledges which persist for a set amount of time without having to login again
- Given a logged in user, they should be able to create a job and job details
- Given a logged in user, they should be able to change and update details of their job after it has been created
-  A admin should be able to create a superuser account with all the authorization of a regular user, but with elevated privledges to alter any job in the system

## Storage 

- Given creation of job, information relevant to the job should be saved into the database
- Each job should have a category it belongs to
- each job should have a user attached to it
