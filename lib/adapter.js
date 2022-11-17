const fs = require('fs');

function readFileAdapter(filename) {
    const readStream = fs.createReadStream(__dirname + `/../static/${filename}`);
    return readStream;
}

function writeFileAdapter(filename, buffer) {
    const writableStream = fs.createWriteStream(__dirname + `/../static/${filename}`);
    writableStream.write(buffer);
}


module.exports = {
    readFileAdapter,
    writeFileAdapter
}
