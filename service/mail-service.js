const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            // host: ,
            service: process.env.SMTP_SERVICE,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

    }
    async sendActivationMail(destination, name,link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: destination,
            subject: `Activation account on ${process.env.API_URL}`,
            text: '',
            html: `
                <div>
                    <h1 style="color: red;">Hi, ${name}! Glab to see you on our web-site</h1>
                    <h3>For activation your account press the link</h3>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService();
