const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "cleckhub2@gmail.com",
    pass: "ncgj ueev eipc ndmv",
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: "cleckhub2@gmail.com",
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent: ", info);
  } catch (error) {
    console.error("Error sending email: ", error.message);
  }
};

module.exports = { sendEmail };
