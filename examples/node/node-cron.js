const CronJob = require('cron').CronJob;

new CronJob('* * * * * *', function () {
    console.log('You will see this message every second');
}, null, true);