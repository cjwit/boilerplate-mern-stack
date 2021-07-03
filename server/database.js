const { MongoClient, Timestamp } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// List your collection names here
const COLLECTIONS = [];

class databaseManager {
    constructor() {
        this.db = null;
        this.server = new MongoMemoryServer();
        this.connection = null;
        this.polls = null;  // example collection from the sample app
    }

    // use local instance of a database for testing purposes
    async startTest() {
        const url = await this.server.getUri();
        this.connection = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        this.db = this.connection.db(await this.server.getDbName());
        this.polls = this.db.collection('polls');
        console.log('Connected to local test database');
    }

    // use remote database
    async start() {
        const url = process.env.DBURL;
        this.connection = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        this.db = this.connection.db('boilerplate-mern');
        this.polls = this.db.collection('polls');
        console.log('Connected to database');

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
