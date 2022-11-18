const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: String, require: true },
    isDeleted: { type: Boolean }
});

module.exports = mongoose.model('File', fileSchema);
