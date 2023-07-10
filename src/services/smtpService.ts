const nodemailer = require('nodemailer');
import config from '../config';

export class SmtpService {
    private mailTranport: any;

    constructor() {
        this.mailTranport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "ashutosh.amantya@gmail.com",
                pass: "jkmecrixceajkxil"
            }
        });
    }

    public async registerMail(user_data) {
        let mailDetails = {
            from: "ashutosh.amantya@gmail.com",
            to: user_data.email,
            subject: `Registration`,
            html: `<!DOCTYPE html>`+
                `</head><body><div>`+
                `<p>You have been successfully registered with AMS. Your login credintials as follow.</p>`+
                `<p>EMP Id: ${user_data.id}</p>`+
                `<p>Password: ${user_data.password}</p>`+
                `</div></body></html>`
        };
         
        this.mailTranport.sendMail(mailDetails, function(err, data) {
            if(err) {
                return {'success':false, 'message':`Unable to send mail, ${err}`};
            } else {
                return {'success':true, 'message':'Email sent successfully'};
            }
        });
    }
}

export default new SmtpService()