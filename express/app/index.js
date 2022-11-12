const express = require('express');
const mariadb = require('mariadb');
const mongo = require("mongodb").MongoClient;
const app = express();
const port = 3000;

// nr of scooters
const smallNumber = 100;
const bigNumber = 1000;

const getMongoDb = async (query) => {
    const dsn = "mongodb://mongodb:27017/mydb";
    const collection = "scooter";
    let client;

    try {
        client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = await client.db();
        const scooter = await db.collection(collection);
        const result = await scooter.find(query).toArray();
        return result;

    } catch (err) {
        return "failed";
    } finally {
        if (client) {
            await client.close();
        }
    }
}

const addMongoDb = async (nrOfScooters) => {
    const newPosition = randomPosition(nrOfScooters);
    const query = { id: newPosition.id };
    const update = { $set: newPosition };
    const options = { upsert: true };
    const dsn = "mongodb://mongodb:27017/mydb";
    const collection = "scooter";
    let client;

    try {
        client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = await client.db();
        const scooter = await db.collection(collection);
        const result = await scooter.updateOne(query, update, options);
        return result;

    } catch (err) {
        return "failed";
    } finally {
        if (client) {
            await client.close();
        }
    }
}

const pool = mariadb.createPool({
    host: 'mariadb',
    user: 'user',
    password: 'user',
    database: 'mydb',
    connectionLimit: 5
});

const getMariaDb = async (sql) => {
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql);
        return rows;

    } catch (err) {
        return "failed";
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

const addMariaDb = async (nrOfScooters) => {
    const { id, latitude, longitude } = randomPosition(nrOfScooters);
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(`
            INSERT INTO data
            VALUE(${id}, ${latitude}, ${longitude})
            ON DUPLICATE KEY UPDATE latitude=${latitude}, longitude=${longitude}
            `);
        return "sucess";

    } catch (err) {
        return "failed";
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

const smallData = {};
const bigData = {};

const populateSmallData = () => {
    for (let i = 0; i < smallNumber; i++) {
        const { latitude, longitude } = randomPosition(smallNumber);
        smallData[i] = { latitude, longitude };
    }

}

const populateBigData = () => {
    for (let i = 0; i < bigNumber; i++) {
        const { latitude, longitude } = randomPosition(bigNumber);
        bigData[i] = { latitude, longitude };
    }
}

const randomPosition = (nrOfScooters) => {
    // random id between 0-( nrOfScooters - 1 )
    const id = Math.floor(Math.random() * nrOfScooters);
    const latitude = Math.random();
    const longitude = Math.random();

    return {
        id: id,
        latitude: latitude,
        longitude: longitude
    }
}

const objectTest = () => {
    // updates one scooter
    const { id, latitude, longitude } = randomPosition(smallNumber);
    smallData[id] = { latitude, longitude };

}

const getSmallData = () => {
    return smallData;
}

const getBigData = () => {
    return bigData;
}

populateSmallData();
populateBigData();

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!')
})

app.get('/object', (req, res) => {
    objectTest()
    res.send('Hello World from express and nodemon!')
})

app.get('/smalldata', (req, res) => {
    res.status(200).json(getSmallData())
})

app.get('/bigdata', (req, res) => {
    res.status(200).json(getBigData())
})

app.get('/mariadb', async (req, res) => {
    const sql = "SELECT * FROM data"
    const rows = await getMariaDb(sql);
    res.status(200).json(rows);
})

app.get('/mongodb', async (req, res) => {
    const noSql = ""
    const rows = await getMongoDb(noSql);
    res.status(200).json(rows);
})

app.get('/mariadb/one', async (req, res) => {
    const id = Math.floor(Math.random() * smallNumber)
    const sql = `SELECT * FROM data WHERE id=${id}`
    const rows = await getMariaDb(sql);
    res.status(200).json(rows);
})

app.get('/mongodb/one', async (req, res) => {
    const id = Math.floor(Math.random() * smallNumber)
    const noSql = { id: id }
    const rows = await getMongoDb(noSql);
    res.status(200).json(rows);
})

app.get('/mariadb/addsmall', async (req, res) => {
    const result = await addMariaDb(smallNumber);
    res.status(200).json(result);
})

app.get('/mongodb/addsmall', async (req, res) => {
    const result = await addMongoDb(smallNumber);
    res.status(200).json(result);
})

app.get('/mariadb/addbig', async (req, res) => {
    const result = await addMariaDb(bigNumber);
    res.status(200).json(result);
})

app.get('/mongodb/addbig', async (req, res) => {
    const result = await addMongoDb(bigNumber);
    res.status(200).json(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
