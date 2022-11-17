const dbo = require('../database/connect.db');

class FileRepository {
    
    constructor() {};
    
    async findFile(filename) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .findOne({filename});
        return result;
    }
    
    async findAllFiles() {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .find({});
        return result;
    }
    
    async insertFile(newFile) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .insertOne(newFile);
        return result;
    }
    
    async updateFile(filename, newFile) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .updateOne(
                { filename },
                {
                    $set: newFile
                }
            );
        return result;
    }
    
    async deleteFiles(filename) {
        const dbConnect = dbo.getDb();
        const result = await dbConnect
            .collection("file-service")
            .deleteMany({filename});
        return result;
    }
    
}

module.exports = new FileRepository();
