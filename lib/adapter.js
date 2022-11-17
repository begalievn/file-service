const fs = require('fs');
const constants = require('../constants/constants');
const { finished } = require('stream');

function readFile(filename) {
    try {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(__dirname + `/../${constants.upload_folder}/${filename}`);
            resolve(readStream);
            finished(readStream, err => {
                if(err) {
                    reject();
                }
            })
        });
    } catch(e) {
        throw new Error('Error while reading from the static folder');
    }
    
}

function writeFile(filename, buffer) {
    try {
        return new Promise((resolve, reject) => {
            const writableStream = fs.createWriteStream(__dirname + `/../${constants.upload_folder}/${filename}`);
            writableStream.write(buffer);
            writableStream.end();
            writableStream.on('finish', () => resolve(true));
            writableStream.on('error', reject);
        })
    } catch(e) {
        throw new Error(`Error while writing a file to the static folder`);
    }
}

module.exports = {
    readFile,
    writeFile
}
