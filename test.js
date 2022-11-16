const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/static/bigo.webp');
myReadStream.on('data', (chunk) => {
    console.log("new chunk received: ");
    console.log(chunk);
})
