const fs = require('fs');
const fileRepository = require('../database/file.repository');
const { readFileAdapter, writeFileAdapter } = require('../lib/adapter');

class FileService {
    constructor() {
    }
    
    async getAllFiles() {
        const result = await fileRepository.findAllFiles();
        console.log(result);
        return result;
    }
    
    async getFile(filename) {
        console.log("filename", filename);
        const result = await fileRepository.findFile(filename);
        if(result) {
            return readFileAdapter(filename);
        }
        return null;
    }
    
    async postFile(data) {
        
        
        try {
            writeFileAdapter(data.fileName, data.buffer);
        } catch(e) {
            console.log("Error, file hasn't been written");
        }
        const newFile = {
            filename: data.fileName,
            mimeType: data.mimeType,
            size: data.size
        }
        
        const fileAlreadyExists = await fileRepository.findFile(data.fileName);
        
        if(fileAlreadyExists?.filename) {
            return await fileRepository.updateFile(data?.fileName, newFile);
        }
        return await fileRepository.insertFile(newFile);
    }
    
    async deleteFiles(query) {
        if(query.filename) {
            const filename = query.filename;
            return await fileRepository.deleteFiles(filename);
        }
        return `Provide filename`;
    }
    
}

module.exports = new FileService();
