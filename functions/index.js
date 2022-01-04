const functions = require("firebase-functions");
const { info } = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.user;
const gmailPassword = functions.config().gmail.pass;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
    tls: {
        rejectUnauthorized: false
    }
})

exports.mail = functions.database.ref('/messages/{id}').onCreate((snap, context) =>{
    const email = snap.val().email;
    const name = snap.val().name;
    const company = snap.val().company;
    const phone = snap.val().phone;
    const message = snap.val().message;
    return sendEmail(email, name, company, message, phone);
})

function sendEmail(email, name, company, message, phone) {
    return transport.sendMail({
        from: email,
        to: "imaginergv@yahoo.com",
        subject: "New Message!",
        html: `
            <h1>${name} has contacted you!</h1>
            <p>Email: ${email}</p>
            <p>Company: ${company}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${message}</p>
        `

    })
    .then((info) => {console.log(info)})
    .catch((err) => {console.log(err);});
}
