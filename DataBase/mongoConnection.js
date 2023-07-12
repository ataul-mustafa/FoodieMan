const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const database = 'FoodApp';
const client = new MongoClient(url);

async function dbConnect(){
    let result = await client.connect();
    let db = result.db(database);
    // let resp =  db.collection('sign-in');
    return db;
}
module.exports = dbConnect;