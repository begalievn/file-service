const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.MONGO_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(async function(err, db) {
      if(err || !db) {
        return callback(err);
      }
      
      dbConnection = db.db(process.env.MONGO_DB_NAME || "test");
      
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },
  
  getDb: function() {
    return dbConnection;
  }
}
