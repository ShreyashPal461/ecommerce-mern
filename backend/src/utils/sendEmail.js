const nodemailer = require('nodemailer');
async function sendVerificationEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shreyashpal461@gmail.com',
            pass: 'vkngnjmwtaowpmty'
        }
    });

    const mailOptions = {
        from: 'shreyashpal461@gmail.com',
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
