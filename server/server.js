// determine environment and load appropriate variables
NODE_ENV = process.env.NODE_ENV || 'development'
if (process.env.NODE_ENV !== 'production') {
    console.log('In a development environment, loading variables');
    require('dotenv').config();
}

const databaseManager = require('./database');
const express = require('express');
const path = require('path');
const compress = require('compression');

var app = express();
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../app/dist')));

// add routes
const pollRoutes = require('./routes/pollRoutes');
app.use('/api/polls', pollRoutes);

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