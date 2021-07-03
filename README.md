# Boilerplate MERN stack application

This project contains functional MERN stack application code to be used to easily create a new web app. Some of its features include:

* A Node/Express/MongoDB server
* Unit testing with Mocha and Chai
* Integration testing between the server and a test MongoDB database
* D3.js data visualizations in the sample app

Hopeful future additions include:

* A React site built on a Redux architecture
* Authentication using Passport.js
* Analytics through GoatCounter
* A fully-featured Webpack build process
* Unit testing with Mocha and Chai on the front end, as well
* Integration testing with the server

The sample app is for creating and voting in polls with simple D3.js visualizations of the results. The app is live at <https://starter-mern-stack.herokuapp.com>.

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

3. Change the name of the file called `.env-sample` to `.env` and paste the address into the `DBURL` field. Make sure that the `.env` file is not being tracked by confirming that the `.gitignore` file is catching it!

4. Change the text in brackets—`<username>`, `<password>`, and whatever it lists as your cluster–and change the `myFirstDatabase` text to whatever you called your database.

5. Ensure that the "Network Security" setting in the MongoDB dashboard is open and allows access from anywhere.

### GitHub configuration

This depends on how you got it, but make sure that you're connected to a GitHub repository within your GitHub account. If you cloned this, then it should be good to go. You may want to rename it. There are plenty of resources online to do this. If you don't know what any of this means, take time to learn the basics of `git` and GitHub.

### Heroku configuration

The GitHub part is important because it makes integration with Heroku easier. You can deploy to Herkou through `git` directly, but I find it simpler to have everything run through GitHub for the sake of keeping things in line. Once you have an account at <www.heroku.com> and can log in, follow these steps:

1. Download the Heroku CLI tools using the directions.

2. Use `heroku create <app-name>`, replacing `<app-name>` with your, well, app's name.

3. Use `heroku config:set PORT <port>`, replacing `<port>` with whatever you choose, to set the first config variable. Do the same with `DBURL` from your `.env` file. Then set the environment to production and check that everything worked using the following:

```
heroku config:set NODE_ENV=production
heroku config
> should show the results
```

4. Enable [deploying from GitHub using these directions](https://devcenter.heroku.com/articles/github-integration).

5. There's probably a way to do this from the CLI, but the Heroku web site's dashboard makes it pretty easy. From the app's page, click `Deploy` and under `Deployment method`, choose `GitHub`. This brings up an interface to choose the GitHub repository. Set it to deploy from the `main` branch and enable automatic deploys. You may need to use the *Manual Deploys* option below this to push the first one. 

6. Use the *View* button to check it out as long as everything worked! If not, it will try again when you make a fix and push it to GitHub. The `heroku logs --tail` command helps here.

## Features

### Database connection

The `server/database.js` file creates an instance of a database manager class. This allows for connection sharing across the server. It also enables testing by providing alternative database connection options (like the local version for unit testing).

Exporting a new instance of the object with `module.exports = new databaseManager()` instead of simply exporting the class allows Node's `requires` references to link to the same object instead of creating new ones within each module (like the `server/routes/` files). This structure is based in part on these two Stack Overflow answers: [in-memory DB testing](https://stackoverflow.com/questions/17342144/how-to-setup-mongodb-for-integration-tests-in-nodejs#51677683) and [sharing a MongoDB connection](https://stackoverflow.com/a/55424097/14443968)

