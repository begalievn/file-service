const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

const buffer = (req, res, next) => {
    let buffer;
    req.on("data", (chunk) => {
        buffer = new Buffer.from(chunk);
    });
    req.on("end", () => {
            req.files = {
                buffer,
                mimeType: req.headers['content-type'],
                size: req.headers['content-length'],
                fileName: req.params.filename || 'testFile'
            }
            next();
        }
    );
};

router.get("/:filename", fileController.getFile);
router.post("/:filename", buffer, fileController.postFile);
router.delete('/', fileController.deleteFiles);
router.get("/all", fileController.getAllFilesFromMongo);

module.exports = router;
