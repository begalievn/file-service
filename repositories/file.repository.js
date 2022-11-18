const File = require('../database/models/file.model');

class FileRepository {
    
    constructor() {};
    
    async findFile(query) {
        const result = await File.findOne(query);
        return result;
    }
    
    async findAllFiles(query) {
        const result = await File.find(query);
        return result;
    }
    
    async findAndUpdateOrInsert(newFile) {
        const result = await File.findOneAndUpdate(
            { filename: newFile.filename },
            newFile,
            {
                new: true,
                upsert: true,
                rawResult: true
            }
        )
        return result;
    }
    
    async findAndRemove(query) {
        const result = await File.findOneAndUpdate(
            query,
            {
                isDeleted: true
            },
            {
                new: true
            }
        );
        return result;
    }
}

module.exports = new FileRepository();
