const fileRepository = require('../repositories/file.repository');
const {readFile, writeFile} = require('../lib/adapter');
const NotFoundError = require('../custom-errors/not-found.error');

class FileService {
    constructor() {
    }
    
    async getAllFiles() {
        const result = await fileRepository.findAllFiles();
        return result;
    }
    
    async getFile(filename) {
        const result = await fileRepository.findFile(filename);
        if (!result) {
            throw new NotFoundError("File not found");
        }
        return await readFile(filename);
    }
    
    async postFile(data) {
        const newFile = {
            filename: data.fileName,
            mimeType: data.mimeType,
            size: data.size
        }
        
        try {
            const fileWritten = await writeFile(data.fileName, data.buffer);
        } catch (e) {
            throw new Error(`Error, file hasn't been written`);
        }
        
        const result = await fileRepository.findAndUpdateOrInsert(newFile);
        return result;
    }
    
    async removeFile(filename) {
        if (!filename) {
            return `Provide filename`;
        }
        const result = fileRepository.findAndRemove(filename);
        return result;
    }
    
}

module.exports = new FileService();
