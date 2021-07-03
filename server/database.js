const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// List your collection names here
const COLLECTIONS = [];

class databaseManager {
    constructor() {
        this.db = null;
        this.server = new MongoMemoryServer();
        this.connection = null;
    }

    // use local instance of a database for testing purposes
    async startTest() {
        const url = await this.server.getUri();
        this.connection = await MongoClient.connect(url, { useNewUrlParser: true });
        this.db = this.connection.db(await this.server.getDbName());
    }

    // use remote database
    async start() {
        const url = process.env.DBURL;
        this.connection = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(connectedClient => {
                this.db = connectedClient.db('boilerplace-mern');
                this.polls = this.db.collection('polls');
                console.log('Connected to database')
            }).catch(err => { console.log(err) });
    }

    stop() {
        this.connection.close();
        return this.server.stop();
    }

    cleanup() {
        return Promise.all(COLLECTIONS.map(c => this.db.collection(c).remove({})));
    }
}

module.exports = databaseManager;
