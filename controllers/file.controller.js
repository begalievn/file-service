const fileService = require('../services/file.service');

class FileController {
    constructor() {
    }
    
    async getAllFilesFromMongo(req, res) {
        try {
            const result = await fileService.getAllFiles();
            res.send(result);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    async getFile(req, res, next) {
        try {
            const result = await fileService.getFile(req.params.filename);
            return result.pipe(res);
        } catch (e) {
            res.status(e.status).json(e.message);
        }
    }
    
    async postFile(req, res) {
        try {
            const data = {...req.files};
            console.log("data", data);
            const result = await fileService.postFile(data);
            return res.send(result);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    async deleteFiles(req, res) {
        try {
            const result = await fileService.removeFile(req.params.filename);
            res.send(result);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

module.exports = new FileController();
