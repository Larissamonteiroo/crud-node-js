const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017",
            { useUnifiedTopology: true }, 
            (err, conn) => {
                if(err) return console.log(err);
                global.conn = conn.db("crud-node-js")
                console.log("Conected to MongoDB")
            })

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id: new ObjectId(id)}, {$set: customer}, callback);
}

function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne };