const fileRepository = require('../repositories/file.repository');
const { readFile, writeFile } = require('../lib/adapter');

class FileService {
    constructor() {}
    
    async getAllFiles() {
        const result = await fileRepository.findAllFiles();
        return result;
    }
    
    async getFile(filename) {
        try {
            const result = await fileRepository.findFile(filename);
            if(result) {
                return await readFile(filename);
            }
            return null;
        } catch(e) {
            throw new Error("Error while getting file");
        }
    }
    
    async postFile(data) {
        
        const newFile = {
            filename: data.fileName,
            mimeType: data.mimeType,
            size: data.size
        }
    
        const result = await fileRepository.findAndUpdateOrInsert(newFile);
        
        try {
            const fileWritten = await writeFile(data.fileName, data.buffer);
        } catch(e) {
            throw new Error(`Error, file hasn't been written`);
        }
        
        return result;
    }
    
    async removeFile(filename) {
        if(filename) {
            const result = fileRepository.findAndRemove(filename);
            return result;
        }
        return `Provide filename`;
    }
    
}

module.exports = new FileService();
