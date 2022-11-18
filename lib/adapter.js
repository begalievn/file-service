const fs = require('fs');
const constants = require('../constants/constants');
const {finished} = require('stream');

function readFile(filename) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(__dirname + `/../${constants.upload_folder}/${filename}`);
        resolve(readStream);
        finished(readStream, err => {
            if (err) {
                reject();
            }
        })
    });
}

function writeFile(filename, buffer) {
    return new Promise((resolve, reject) => {
        const writableStream = fs.createWriteStream(__dirname + `/../${constants.upload_folder}/${filename}`);
        writableStream.write(buffer);
        writableStream.end();
        writableStream.on('finish', () => resolve(true));
        writableStream.on('error', reject);
    })
}

function removeFile(filename) {
    try {
        fs.unlinkSync(__dirname + `/../${constants.upload_folder}/${filename}`);
    } catch (e) {
        throw new Error(`Error while removing a file`);
    }
}

module.exports = {
    readFile,
    writeFile,
    removeFile
}
