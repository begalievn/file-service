const File = require('../database/models/file.model');

class FileRepository {
    
    constructor() {};
    
    async findFile(filename) {
        const result = await File.findOne({filename});
        return result;
    }
    
    async findAllFiles() {
        const result = await File.find();
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
    
    async findAndRemove(filename) {
        const result = await File.findOneAndUpdate(
            { filename },
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
