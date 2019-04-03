const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mail = require('./mail');
const _ = require('lodash');

var app = express();
app.use(cors());
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/portfolio')));
app.use(morgan('dev'));

app.use('/mail', (req, res) => {
	var body = _.pick(req.body, ['name', 'email', 'subject', 'message']);
	mail.sendMail(body);
	res.send();
});

app.use('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/portfolio/index.html'));
});

app.listen(port, (err) => {
	if (err) console.log(err);
	else console.log('Server started on ' + port + ' port.');
});