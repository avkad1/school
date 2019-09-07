var mongoClient = require("mongodb").MongoClient;

const CONNECTION_INFO = require("./connection");
const BASE_URL = `mongodb://${CONNECTION_INFO.address}:${CONNECTION_INFO.port}/`;
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000
};

function getDocuments(dbName, collectionName, filterQuery) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(BASE_URL, clientOptions, (err, client) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var db = client.db(dbName);
        db.collection(collectionName)
          .find(filterQuery)
          .toArray((err, documents) => {
            if (err) {
              client.close();
              reject(err);
            }
            client.close();
            resolve(documents);
          });
      }
    });
  });
}

function insertDocument(dbName, collectionName, document) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(BASE_URL, clientOptions, (err, client) => {
      if (err) {
        reject(err);
      } else {
        var db = client.db(dbName);
        db.collection(collectionName).insertOne(document, (err, result) => {
          if (err) {
            client.close();
            reject(err);
          }
          client.close();
          resolve(result);
        });
      }
    });
  });
}

function updateDocument(dbName, collectionName, filterQuery, newDocument) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(BASE_URL, clientOptions, (err, client) => {
      if (err) {
        reject(err);
      } else {
        var db = client.db(dbName);
        db.collection(collectionName).updateMany(
          filterQuery,
          JSON.stringify(newDocument).includes("$pull")
            ? newDocument
            : { $set: newDocument },
          { upsert: false },
          (err, result) => {
            if (err) {
              client.close();
              reject(err);
            }
            client.close();
            resolve(result);
          }
        );
      }
    });
  });
}

module.exports = {
  get: getDocuments,
  insert: insertDocument,
  update: updateDocument
};
