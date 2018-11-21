# Email Engine
A simple engine who sets your API key and send mail for different platform like [SendGrid](https://sendgrid.com/), [AWS-SES](https://aws.amazon.com/ses/) etc

## How to Use

    npm install email-engine --save

Set your respective API key

### For Send Grid 

 - Set your API KEY ([API KEYS](https://app.sendgrid.com/settings/api_keys))

```javascript
const emailEngine =  require('email-engine');
emailEngine.setKey(process.env.YOUR_API_KEY, 'SEND_GRID');
```

 - Send Mails

```javascript
to = "anymail@anydomain.com";
subject = "any subject";
html = "any html or your html template";
from = "anymail@anydomain.com"
emailEngine.sendMailFromSendGrid(to, subject, html,from);
```

 - For Declaring From constant
 
```javascript
emailEngine.setFromMail('anymail@anydomain.com');
```

*Now you would not pass from mail in sending mail.*

**Happy Coding** 

##Future plans
- Adding AWS-SES
- Testing
- Multiple Mails 
- Cron Mails