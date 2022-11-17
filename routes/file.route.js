const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

const buffer = require('../middlewares/buffer.middleware')

router.get("/:filename", fileController.getFile);
router.post("/:filename", buffer, fileController.postFile);
router.delete('/', fileController.deleteFiles);
router.get("/all", fileController.getAllFilesFromMongo);

module.exports = router;
