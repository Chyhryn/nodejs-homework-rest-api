const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = {
    ...data,
    from: "aleksandr.chigrin@devellar.com",
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
