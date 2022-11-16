const { MongoClient } = require('mongodb');

const connectionString = `mongodb+srv://begaliev:12345@cluster0.mn9wz7o.mongodb.net/?retryWrites=true&w=majority`;

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
      
      dbConnection = db.db("test");
      
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },
  
  getDb: function() {
    return dbConnection;
  }
}
