const fs = require('fs');
const fileRepository = require('../database/file.repository');

class FileService {
    constructor() {
    }
    
    async getAllFiles() {
        const result = await fileRepository.findAllFiles();
        console.log(result);
        return result;
    }
    
    
    async getFile(query) {
        const filename = query?.filename || null;
        const result = await fileRepository.findFile(filename);
        if(result) {
            const readStream = fs.createReadStream(__dirname + `/../static/${filename}`);
            return readStream;
        }
        return null;
    }
    
    async postFile(data) {
        try {
            const writableStream = fs.createWriteStream(__dirname + `/../static/${data.fileName}`);
            writableStream.write(data.buffer);
        } catch(e) {
            console.log("Error, file didn't written");
        }
        const newFile = {
            filename: data.fileName,
            mimeType: data.mimeType,
            size: data.size
        }
        
        const fileAlreadyExists = await fileRepository.findFile(data.fileName);
        
        if(fileAlreadyExists?.filename) {
            const result = await fileRepository.updateFile(data?.fileName, newFile);
            return result;
        }
        const result = await fileRepository.insertFile(newFile);
        return result;
    }
    
    async deleteFiles(query) {
        if(query.filename) {
            const filename = query.filename;
            const result = await fileRepository.deleteFiles(filename);
            return result;
        }
        return `Provide filename`;
    }
    
}

module.exports = new FileService();
