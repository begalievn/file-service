// app.post('/upload-avatar', async (req, res) => {
//     try {
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             let avatar = req.files.avatar;
//             console.log("avatar", avatar);
//             avatar.mv('./static/' + avatar.name);
//
//             res.send({
//                 status: true,
//                 message: 'File is uploaded',
//                 data: {
//                     name: avatar.name,
//                     mimeType: avatar.mimetype,
//                     size: avatar.size
//                 }
//             })
//         }
//     } catch(e) {
//         res.status(500).send(e);
//     }
// })

// app.route('/upload').post((req, res) => {
//     req.pipe(req.busboy);
//     req.busboy.on('file', function (name, file, info) {
//         const { filename, encoding, mimeType } = info;
//         console.log(
//             `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
//             filename,
//             encoding,
//             mimeType
//         );
//
//         file.on('data', (data) => {
//             console.log(`File [${name}] got ${data.length} bytes`);
//         }).on('close', () => {
//             console.log(`File [${name}] done`);
//         });
//     });
//
//     req.busboy.on('field', (name, val, info) => {
//         console.log(`Field [${name}]: value: %j`, val);
//     })
//     res.send("Upload");
// })
