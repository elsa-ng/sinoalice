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

const MAIL_DATA = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_RECEIVER,
    subject: 'SINoALICE Application',
    text: '',
    html: '',
};