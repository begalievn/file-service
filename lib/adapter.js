const fs = require('fs');

function readFile(filename) {
    try {
        const readStream = fs.createReadStream(__dirname + `/../static/${filename}`);
        return readStream;
    } catch(e) {
        console.log('Error while reading from the static folder');
    }
    
}

function writeFile(filename, buffer) {
    try {
        return new Promise((resolve, reject) => {
            const writableStream = fs.createWriteStream(__dirname + `/../static/${filename}`);
            writableStream.write(buffer);
            writableStream.end();
            writableStream.on('finish', () => resolve(true));
            writableStream.on('error', reject);
        })
    } catch(e) {
        console.log(`Error while writing a file to the static folder`);
    }
}

module.exports = {
    readFile,
    writeFile
}
