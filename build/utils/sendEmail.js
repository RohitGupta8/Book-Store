"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _otp = _interopRequireDefault(require("../models/otp"));

/* eslint-disable prettier/prettier */

/* eslint-disable max-len */

/* eslint-disable prettier/prettier */
_dotenv["default"].config('./.env');

var sendEmail = function sendEmail(mailMessage) {
  var otpcode = Math.random().toString(36).substring(2, 12); // eslint-disable-next-line new-cap

  var optData = new _otp["default"]({
    email: mailMessage.email,
    code: otpcode,
    expireIn: new Date().getTime() + 300 * 1000
  });
  optData.save();

  var transporter = _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var message = {
    from: '"BOOK-STORE" <no-reply@BOOKSTORE.com>',
    to: mailMessage.email,
    subject: "".concat(otpcode, " is your Account recovery code."),
    html: "<span style=\"text-align: center;\"><h1>Hi , ".concat(mailMessage.email, "</h1></span><div style=\"text-align: center;\"><h3>We received a request to reset your BOOK STORE App password.<br>Enter the following one time password:</h3>\n    <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">").concat(otpcode, "\n  </h2></div><br><br><h5>(NOTE:- If you don\u2019t use this otp within 3 hours, it will expire.)</h5><br><h5>Thanks,</h5><br><h4><span>Regards,<br>Team FundooNote</span></h4><br>")
  };
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

exports.sendEmail = sendEmail;