const mongoConnect = require('./mongoConnection');

// const data = {name:'woow1', channel:'uhgrsdfs', value:864};

const insert = async(collectionName, data) =>{
    let db = await mongoConnect();
    let resp = await db.collection(collectionName);
    const res  = await resp.insertOne(data);

    return res;
    // if(res.acknowledged){
    //     return res;
    // }
}

// insert();
// insert('sign-in', {name:'ataullah', password:'sfh3534', con_password:'dhgd3853'});
module.exports = insert;