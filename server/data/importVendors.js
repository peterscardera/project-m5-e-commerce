'use strict';
const MongoClient = require('mongodb').MongoClient;
const fs = require('file-system');
const assert = require('assert');

const importVendors = async () => {

  const uri = "mongodb+srv://master:adminadmin@cluster0-csv1l.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const vendors = JSON.parse(fs.readFileSync('./companies.json'));

  try {
    await client.connect();
    const db = client.db('e-commerce');
    const r = await db.collection('vendors').insertMany(vendors);
    assert.equal(vendors.length, r.insertedCount);
    console.log('success');
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

importVendors();