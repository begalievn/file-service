const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://begaliev:12345@cluster0.mn9wz7o.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        
        // await listDatabases(client);
        await findOneFileByName(client, 'first');
        
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

async function findOneFileByName(client, nameOfFile) {
    const result = await client.db("test").collection("file-service").findOne({ filename: "first" });
    
    if(result) {
        console.log(`Found a listing in the collection with the name '${nameOfFile}'`);
        console.log(result);
    } else {
        console.log(`No listings found with the name of '${nameOfFile}'`);
    }
}
