const express = require('express');
const fileRoutes = require('./routes/file.route');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(fileUpload({
  createParentPath: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('static'));


// routes
app.use('/file', fileRoutes);
app.get('/', (req, res) => {
  try {
    res.send("File Service");
  } catch(e) {
    res.sendStatus(500);
  }
});


app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    })
  } catch(e) {
    console.log(e.message);
  }
}

start();


