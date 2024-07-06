const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0NnSTRvZVpvcE1NMkxCNktXY1FCNkE2ZVlKU1BIeHc5d1FiN3ZsODNHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVNERDF5UlV4Ykc0dEIwNSt4UTBSalgwOUJEOVQ3aWIvL08wdS8zMkZIND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSzZnVW13UHkzQnAyU3dJQVZDdkp1NEZVOFVnbXZTallRenhmRC9rSVZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5S3hXU29lWFZUZUphbFNjeWk4VjdtdHMvUFpnV2R0bGRYQlhOK0VKa0VrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVOOUc3eTA3TXI3bExMemRCbTJLcmd1cDFySW9yQWJ6OG1ldTh3c0hiRTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNKN1pOODhKeUhrZ3hJWGVTcmlLRU52a3pMSGI3K2s0NmM5TEdJeUhnU2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlYMWtnZDlYUmtNaFUxbTJ6SkpFQUZZTVVEcisweDE1aFoxbGlsTlMyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjB6cnpnR256ZzRwaDNrSU93YXIydnhWYU5ZL1ZsMHBmK0tYdDFnZ0hBUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxLcnlwVGdhaTVHY2FOUE9pU0lDTEZTRW0veTZEMU5jN1IwVDc0QngyTEpxRFQ0QXplNnRldUYzMG5odkdIZ1dZTjdqZU84UXZuSmNXQXVuU29kMUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMzLCJhZHZTZWNyZXRLZXkiOiJmdmxEdEQxcEpKMXhuM015MVdWa3dRQThxVXZBZENLTmd5cVZ1NjBndi9BPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc3NDUyNTUxOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDNkYxQTgzNUNGMjA5NDNDRDI1QzA5NjQ5MUE2RjIwMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwMjkzMzgyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NzQ1MjU1MThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTAwQzAwMkI1QzJCREQwNTZDNkVCNzNENDIzMzUwMjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMDI5MzM4Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQWt1T3RzMkpSMGlCZ3VsS3l5U2JqdyIsInBob25lSWQiOiIyNDBhYzlmZi1hOTY5LTQwNGUtYWE2ZS02MmE2OWVlYmQxNzAiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM01ZUFhVM1JHR1UwblYxQUNHSVhJOGlJL2xJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYxWUhNdk5yVjZnTGwrVDdadkozZmJtTEEyRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJFTTlKUTc4RSIsIm1lIjp7ImlkIjoiMjU0Nzc0NTI1NTE4OjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ2h1a3MifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0orajJjc0hFUGV2cHJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik95TGZTUTZvdnBtbG1vUjI0WHNNbkNkeVFhOGcwV2hSVEErVmpsUlg2a009IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpGVDZTdVRIR3NFNUdPR1VwNllUVFZBVHJCVUh5Qzh2OWJJcG1PL1ZkVmtjdjEyVW16WEIrU3VnZTBCRlQrWWgvYTBoTGlrMkF0VUZpQ3YvQnhKOENnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpZ1pZVER6WWdYMzk4L1J0SFdPRnVCZUpKQVA1bnhKYzhOUDBnaFU2ZUZvRFVUR01CYldWa0tRc3hJdlM1Ynp4WU5PMzhrcnlZK2xnZFhSOFdpeStEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc3NDUyNTUxODoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRzaTMwa09xTDZacFpxRWR1RjdESnduY2tHdklORm9VVXdQbFk1VVYrcEQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAyOTMzODB9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254774525518",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ALI CHUKS',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
