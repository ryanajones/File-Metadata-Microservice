/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const app = express();

// App middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function (req, res) {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

// Response to file POST
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  res.json({
    name: req.file.originalname,
    size: `${req.file.size} bytes`,
    type: req.file.mimetype,
  });
  console.log(req.file);
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Node.js listening ...');
});
