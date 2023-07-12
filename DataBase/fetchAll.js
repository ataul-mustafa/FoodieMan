const mongoConnect = require('./mongoConnection');

const fetchAll = async (collectionName) => {
    const db = await mongoConnect();
    const colName = db.collection(collectionName);
    // let data = await mongoConnect();
    let data = await colName.find({}).toArray();
    // if (data != null) {
    //     return data;
    // }else{
    //     console.log("Record not found!...");
    // }
    return data;
}

// fetch('sign-in', {password:'ataul123@'}).then(result=>console.log(result));

module.exports = fetchAll;
