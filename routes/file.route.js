const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

const buffer = (req, res, next) => {
    let buffer;
    req.on("data", (chunk) => {
        buffer = new Buffer.from(chunk);
    });
    req.on("end", () => {
            req.body.buffer = buffer;
            next();
        }
    );
};

router.get("/", fileController.getFile);
router.post("/", buffer, fileController.postFile);
router.delete('/', fileController.deleteFiles);
router.get("/all", fileController.getAllFilesFromMongo);

module.exports = router;
