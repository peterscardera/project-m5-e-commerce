

'use strict';

// const { MongoClient } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const fs = require('file-system');
const assert = require('assert');

// import { itemsJson } from './items.json';

const importItems = async () => {

  const uri = "mongodb+srv://master:adminadmin@cluster0-csv1l.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const items = JSON.parse(fs.readFileSync('./items.json'));

  try {
    await client.connect();
    const db = client.db('e-commerce');
    const r = await db.collection('items').insertMany(items);
    assert.equal(items.length, r.insertedCount);
    console.log('success');
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

importItems();