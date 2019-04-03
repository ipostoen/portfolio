"use strict";
const path = require('path');

const nodemailer = require("nodemailer");

let mailer = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: 'antonmolchan0@gmail.com',
		pass: 'q1w2e3a1s2d3z1x2c3'
	}
});



var sendMail = async function (message) {
	let mailOptions = {
		from: '"Fred Foo 👻" <huper>',
		to: 'iliyalevkiev@gmail.com',
		subject: "Confirm Email - Hupertube",
		text: `Name: ${message.name}, Subject: ${message.subject}, Email: ${message.email}, Text: ${message.message}`
	};

	mailer.sendMail(mailOptions, (err, info) => {
		if (err) {
			Promise.reject(err);
		}
		return info;
	});
}

module.exports = {
	sendMail
};