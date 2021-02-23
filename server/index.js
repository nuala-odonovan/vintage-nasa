const express = require('express');
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  });

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});