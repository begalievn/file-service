const fileService = require('../services/file.service');

class FileController {
  constructor() {}
  
  async getAllFilesFromMongo(req, res) {
    try {
      const result = await fileService.getAllFiles();
      res.send(result);
    } catch(e) {
      res.status(500).json(e);
    }
  }
  
  async getFile(req, res, next) {
    try {
      const result = await fileService.getFile(req.params.filename);
      if(result) {
        return result.pipe(res);
      }
      res.send(`There is no such a file`);
    } catch(e) {
      // res.status(500).json(e);
      next(e);
    }
  }
  
  async postFile(req, res) {
    try {
      const data = { ...req.files };
      console.log("data", data);
      const result = await fileService.postFile(data);
      return res.send(result);
    } catch(e) {
      res.status(500).json(e);
    }
  }
  
  async deleteFiles(req, res) {
    try {
      const result = await fileService.deleteFiles(req.query);
      res.send(result);
    } catch(e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new FileController();
