# Boilerplate MERN stack application

This project contains functional MERN stack application code to be used to easily create a new web app. Some of its features include:

* A Node/Express/MongoDB server
* Unit testing with Mocha and Chai
* Integration testing between the server and a test MongoDB database

Hopeful future additions include:

* A React site built on a Redux architecture
* Analytics through GoatCounter
* A fully-featured Webpack build process
* Unit testing with Mocha and Chai on the front end, as well
* Integration testing with the server

This is mostly an effort for me to get some stronger best-practices under my fingertips and it adapts from plenty of resources around the internet. I'll keep a list of useful ones in the descriptions below.

## Using this boilerplate

Begin by cloning the repository and running `npm install`.

### Database configuration

Before starting to update configuration files and whatnot, a full-stack application needs a database.

1. Go to <mongodb.com> to sign in and create a new cluster, a new database, and a new collection. Since this is a simple voting app, I start with a collection called `polls`. The MongoDB getting started documentation is fairly straightforward.
2. Return to the cluster on the MongoDB page and get the connection address (currently in a "Connect" button). Click "Connect your application" and copy the `uri`. It should look something like this:

```
mongodb+srv://<username>:<password>@<clustername>.uoglk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

3. Change the name of the file called `.env-sample` to `.env` and paste the address into the `DBURL` field.

4. Ensure that the "Network Security" setting in the MongoDB dashboard is open and allows access from anywhere.

### GitHub configuration

### Heroku configuration

## Features

### Database connection

The `server/database.js` file creates an instance of a database manager class. This allows for connection sharing across the server. It also enables testing by providing alternative database connection options (like the local version for unit testing).

Exporting a new instance of the object with `module.exports = new databaseManager()` instead of simply exporting the class allows Node's `requires` references to link to the same object instead of creating new ones within each module (like the `server/routes/` files). This structure is based in part on these two Stack Overflow answers: [in-memory DB testing](https://stackoverflow.com/questions/17342144/how-to-setup-mongodb-for-integration-tests-in-nodejs#51677683) and [sharing a MongoDB connection](https://stackoverflow.com/a/55424097/14443968)

