const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

const buffer = require('../middlewares/buffer.middleware')

router.get("/all", fileController.getAllFilesFromMongo);
router.get("/:filename", fileController.getFile);
router.post("/:filename", buffer, fileController.postFile);
router.delete('/:filename', fileController.deleteFiles);

module.exports = router;
