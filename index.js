const cron = require('node-cron');
const mysqldump = require('mysqldump');
const fs = require('fs');
const path = require('path');

// Set database information
const databaseOptions = {
     connection: {
         host: 'localhost',
         user:'root',
         password: 'password',
         database: 'database',
     },
};

// Set save folder
const backupFolder = './Backup';

// Schedule the task to run every .... -- https://crontab.cronhub.io/
cron.schedule('0 */5 * * *', () => {
     const date = new Date();
     const timestamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()} -${date.getSeconds()}`;

     // Create the name of the backup file
     const backupFile = path.join(backupFolder, `backup_${databaseOptions.connection.database}_${timestamp}.sql`);

     // Create the backup
     mysqldump({
         connection: databaseOptions.connection,
         dumpToFile: backupFile,
     }).then(() => {
         console.log(`Backup created at ${backupFile}`);
     }).catch((err) => {
         console.error('Error creating backup:', err);
     });
});