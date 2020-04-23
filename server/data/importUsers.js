'use strict';
const MongoClient = require('mongodb').MongoClient;
const fs = require('file-system');
const assert = require('assert');

const importUsers = async () => {

  const uri = "mongodb+srv://master:adminadmin@cluster0-csv1l.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const users = JSON.parse(fs.readFileSync('./users.json'));

  try {
    await client.connect();
    const db = client.db('e-commerce');
    const r = await db.collection('users').insertMany(users);
    assert.equal(users.length, r.insertedCount);
    console.log('success');
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

importUsers();