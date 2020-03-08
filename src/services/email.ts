import Nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export default class Email {
    private static transporter: Mail

    public static start() {
        Email.transporter = Nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        })

        Email.transporter.verify()
            .then(data => Log.service('Email serivce initialise successfully'))
            .catch(err => {
                Log.server('Email serivce  initialise fail with error', err)
                process.exit(1)
            })
    }

    public static async sendEmail(from: string, to: string, subject: string, text: string) {
        try {
            const mailOptions: Mail.Options = { from, to, subject, text }
            let info = await Email.transporter.sendMail(mailOptions)
            Log.service(`Email was sent to ${to} \nInfo: ${info.response}`)
        } catch (error) {
            Log.service(`Can not send email to ${to}`)
            return error
        }
    }
}