const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

/** defining and destructuring environments config for firebase functions */
const {useremail, refreshtoken} = functions.config().gmail;
const {clientid, clientsecret} = functions.config().gmail;

/** create reusable transporter object using the gmail SMTP transport */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: useremail,
    clientId: clientid,
    clientSecret: clientsecret,
    refreshToken: refreshtoken,
  },
});


exports.sendEmail = functions.https.onCall((data, context) => {
  // Defining our transport object
  const mailOptions = {
    from: useremail,
    to: data.email,
    subject: data.subject,
    html: data.content,
  };
    // send mail with defined transport object
  return transporter.sendMail(mailOptions).catch((err)=>{
    console.log(err);
  });
});
