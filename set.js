const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNklVeTc5cHVVVk1vMm5kQUNNZmNEMmpDQnd4RjU0eHBEQzVZd1hkdytHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmVxYlc5K1ZTdktFKzUxc3ROTWNPZFpKRlFhcjZYek42Wll0RUc2RTBCST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSTFOOE50MmVvQkdiUG5tWVZ6MVVFUlBJdjZyanF3ZEp6RStNMkQrbVg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwejB0WFByaFRRWVNVQ2JJdFlmWmxMaXJyMVEvSk1PRzlQZXdhRi8zOHdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNMmFvcUI2bWtLdHR2aENNOUVNTmxzUnRPT2lkQU1tcGpMMUFNdEROR3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9aSTA0MEQ5dk9YMVVSdmxjYWFxbk1TeUp2VVZrRDZsWUZOdU9ibGd6RWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK08vKzJLUDR4OHBYNTlvSDBFaFBleTNGRkVSV2pYYnV5c1FZZzVVaDJsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2ZDSUhaVGo0aXY3S05rajd3T1hkUEQ0VkRISDdwdjNqMVh5aDN0cS9qRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVneGJBNi8zbGhCbTNwWHhPY0Z2UWgxUjVCY3dDTHFUdHpqalptUnVNRUszZldLUXcxMVlyN044S25IQUV1YzMrSkhDK0VJTE5pYnlEeDk4b0NDZmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJFRDBPUHdsRGNwQ2ZjV3RQUEpWRlkrZWwxUHlUc2MvbElyb0czcEV6cWdFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmNlJ0N3dSaFRNU3hhcHN3aUJWSW5RIiwicGhvbmVJZCI6Ijg1MTk5NTcxLTM3NDMtNDY0NS1hMDU0LTc2YWUzZjMxZDA1YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaWTAvbmtRUkc0ZU1yTTMwT3BKdmlFK0p3VU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGpMSHFMV2Q1SndJWFhSNlVJTEFjZjJmR0FVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNTWU5EQTJZIiwibWUiOnsiaWQiOiIyNTQ3NTc4NzQ1NzQ6MzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08yQWtZZ0ZFT0QybUxZR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJwdGlrSVRhQW1UcVpTa0lzSi9CMUVKd21weEp2Q2cwcXJqWFFub1pkMTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkVHK3lOQ1M2TThqNkdES0hOR0J6MmlKVW4yUk9KMUdKTGNUTkdVRUZhdkZIS3BGWlNvMHpZTDJvdlhGMjNuOXJwTW1lK1kzbm9VdnBhb1JIblVTckRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJid2VWa2hFYnU5VXdwZ1hrNUNYOUNUTmYrN0xFZUlmenBwKzd5UFgrTXlTZXNhUUtaS1UwdG43UHh1ODZoalByM1h2aWNVcHZPVWRaQkpqSHloOU5nQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1Nzg3NDU3NDozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVYWJZcENFMmdKazZtVXBDTENmd2RSQ2NKcWNTYndvTktxNDEwSjZHWGRmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MjY3Mzc0fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ali Chuks",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254757874574", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Ali Chuks',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
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

