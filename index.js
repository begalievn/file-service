const express = require('express');
const fileRoutes = require('./routes/file.route');
const busboy = require('connect-busboy');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Get MongoDB driver connection
const dbo = require('./database/connect.db');

const app = express();
const PORT = 3000;

// middlewares
app.use(fileUpload({
  createParentPath: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('static'));
app.use(busboy());


// routes
app.use('/file', fileRoutes);

app.get('/', (req, res) => {
  // res.send('Hello, World!');
  try {
    res.sendFile('hello.html');
  } catch(e) {
    res.sendStatus(500);
  }
});

app.post('/upload-avatar', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      let avatar = req.files.avatar;
      console.log("avatar", avatar);
      avatar.mv('./static/' + avatar.name);
      
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimeType: avatar.mimetype,
          size: avatar.size
        }
      })
    }
  } catch(e) {
    res.status(500).send(e);
  }
})

app.route('/upload').post((req, res) => {
  req.pipe(req.busboy);
  req.busboy.on('file', function (name, file, info) {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    }).on('close', () => {
      console.log(`File [${name}] done`);
    });
  });
  
  req.busboy.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  })
  res.send("Upload");
})

dbo.connectToServer((err) => {
  if(err) {
    console.error(err);
    process.exit();
  }
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
})


