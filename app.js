const sgMail = require('@sendgrid/mail');
const mailgun = require('mailgun-js');

const SEND_GRID = 'SEND_GRID';
const MAIL_GUN = 'MAIL_GUN';

// eslint-disable-next-line camelcase
const email_engine = {};

let apiKeys = null;
let emailProvider = null;

const emailConfig = {
  from: '',
};

email_engine.setKey = (key, provider, domain = '') => {
  if (!key || !provider) {
    throw new Error('No key or provider provided');
  }

  apiKeys = key;
  emailProvider = provider;

  //  Setting for SEND GRID
  if (emailProvider === SEND_GRID) {
    sgMail.setApiKey(apiKeys);
  } else if (emailProvider === MAIL_GUN) {
    mailgun({ apiKey: key, domain });
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


email_engine.sendMailFromMailgun = (to, subject, html, from = emailConfig.from) => {
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
    mailgun.messages()
      .send(mail)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};


// eslint-disable-next-line camelcase
module.exports = email_engine;
