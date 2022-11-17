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

module.exports=buffer;
