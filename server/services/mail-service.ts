const nodemailer = require('nodemailer')
require('dotenv').config()

class MailService{
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            pass: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string): Promise<void>{
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activation account" + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>For activation, use link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendForgotPasswordLink(to: string, link: string): Promise<void>{
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Password Reset" + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>For reseting, use link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendChangeMailLink(to: string, link: string): Promise<void>{
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Change Mail" + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>For changing email, use link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()