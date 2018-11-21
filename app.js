const sgMail = require('@sendgrid/mail');

const SEND_GRID = 'SEND_GRID';

// eslint-disable-next-line camelcase
const email_engine = {};

let apiKeys = null;
let emailProvider = null;

const emailConfig = {
  from: '',
};

email_engine.setKey = (key, provider) => {
  if (!key || !provider) {
    throw new Error('No key or provider provided');
  }

  apiKeys = key;
  emailProvider = provider;

  //  Setting for SEND GRID
  if (emailProvider === SEND_GRID) {
    sgMail.setApiKey(apiKeys);
  }
};

email_engine.setFromMail = (fromMail) => {
  emailConfig.from = fromMail;
};

email_engine.sendMailFromSendGrid = (to, subject, html, from = emailConfig.from) => {
  if (!to || !subject || !html) {
    throw new Error('Incomplete Parameter');
  }

  const mail = {
    from,
    subject,
    to,
    html,
  };

  return new Promise((resolve, reject) => {
    sgMail
      .send(mail)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};


// eslint-disable-next-line camelcase
module.exports = email_engine;
