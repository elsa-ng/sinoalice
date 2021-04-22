const NODE_MAILER = require('nodemailer');

const TRANSPORTER = NODE_MAILER.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    secure: true,
});

const SENDMAIL = (text, cb) => {
    const MAIL_OPTIONS = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: 'SINoALICE Application for Genesis Gucci',
        text: text,
    };

    TRANSPORTER.sendMail(SENDMAIL, function(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = SENDMAIL;
