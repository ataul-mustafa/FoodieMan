const mongoConnect = require('./mongoConnection');

const fetch = async (collectionName, rec) => {
    const db = await mongoConnect();
    const colName = db.collection(collectionName);
    // let data = await mongoConnect();
    let data = await colName.findOne(rec);
    // if (data != null) {
    //     return data;
    // }else{
    //     console.log("Record not found!...");
    // }
    return data;
}

// fetch('sign-in', {password:'ataul123@'}).then(result=>console.log(result));

module.exports = fetch;
