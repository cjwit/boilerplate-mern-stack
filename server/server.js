// determine environment and load appropriate variables
NODE_ENV = process.env.NODE_ENV || 'development'
if (process.env.NODE_ENV !== 'production') {
    console.log('In a development environment, loading variables');
    require('dotenv').config();
}

// add required libraries
const express = require('express');
const path = require('path');
const compress = require('compression');

// set up express and middleware
var app = express();
app.use(express.static(path.join(__dirname, '../app/dist')));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// include local required files
const databaseManager = require('./database');
const pollRoutes = require('./routes/pollRoutes');

// add routes
app.use('/api/polls', pollRoutes);

// set default route handling
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// connect database and listen
dbManager = new databaseManager;
dbManager.start()
    .then(() => {
        const port = process.env.PORT || 8080
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`);
        })
    })