# Northcoders House of Games API

## Introduction 
The goal of this backend project was to build an API for the purpose of accessing application data programmatically. Similar to reddit, the idea was to mimic the buidling of a real world backend service which should be able to provide information to the front end architecture. 

PSQL was used to create the related database, interactions are completed with node-postgres. 

The completed API has been hosted using render and can found with there link [here](https://emads-be-project.onrender.com/api).

## Setup
In order to make a local clone of this project, within your terminal you will need to run `git clone https://github.com/code-emad/House-of-Games.git`

Once the files have been cloned, you will need change directory into the directory and run "npm install" which will install the dependencies listed within the package.json file. 

To create a local version of the database, you will need to run "npm run setup-dbs" then "npm run seed" within the terminal. This will run the seed file which will create a nc_games database and nc_games_test database populated with the contents from the data file.

To specify which database is to be used, you will need to create 2 new files ".env.development" + ".env.test" and save within the directory. You will then need specify the database in the file which can be done by inserting "PGDATABASE=nc_games" + "PGDATABASE=nc_games_test" in the respective files.

Relevent tests have been created and are within the "__tests__" folder. Tests can be run with the command "npm run test".

## Dependencies
| Package     | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| DotEnv  | Zero-dependency module that loads environment variables from .env file into process.env|
| Express     | Back end web application framework for building RESTful APIs with Node.js |
| Jest        | JavaScript testing framework                                                             |
| Jest-sorted | Extends Jest with 2 custom matches, toBeSorted and toBeSortedBy                                             |
| PostGres    | Open-source relational database management system emphasizing extensibility and SQL compliance|
| PG format   | Used to create dynamic SQL queries and prevent SQL injection                                  |
| Supertest   | A Node.js library to test APIs by writing tests for endpoints                                                        |

## Miniumum Versions
Node v19.1.0
PostGres ^8.7.3