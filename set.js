const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUpvV2o0UXR0YWRCcG5Xc2I0ZHpWOWNwenVNcGpObWpsdW9UYVdVTGhGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ21JSllOK1BFak16OURTVW5ERlVUbzRjM0o1ZGF6YUNpOTRqRzV6c0FuTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnS2VWUEhLUG9MMG1KU2RydE52TlNKaEdiYm5oNFJuZzltOXlNci85S0UwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwK0o1NENYSXA5K2hScEI5bGpPbkl4TzY3azJNUHM3bkZKOFpiZTJ0Q2o4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlBMVFLaGZiaFRzN1NGd3RFR3A5eHZ3QnIxMmdYZXVKblpTYUpnMjM2RTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktZODlkNjl5WjFQdmFXRXNuMndzYXMyV200TTRqc1RCdjllSWRnOVVqbjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFA4K0JGVUNYcHlJelF4QjFrczlGQy9ITVk5YTZ0MXZRa0VoZ2c0YkVFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXZob1JFbjh1dFpXYnRxQTkwcEx4aTRpYmpSNEc4aGNFS2FsNVA0RUd5QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJzclBoUnpUYWRIQS9wcG5oWkdLcVozY1k0VUJwNGxhbkRLTmk2UWZvYzlYTldHWGdKNE80UDcvL2xaVm5leXgwZmhucllkTzVPZ09iaTdYeXY0UWdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJ6cEV3ZnhwNnNoUlJOK2NmT05jT2R3ekM0WUhvellqUk85VG85a1ZvTlBjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSc01QVW85T1RBMlkxWGxSdFN0b0t3IiwicGhvbmVJZCI6IjQyZDI5NjcxLTYzZmYtNGQ5MS04OGM3LTU2NGQ5NzVkZWFjNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYNklMR0gySVFQUERPM2N0UXZ4Q0gwVXdvdms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGtHb1dobVI4Q1JjYjJQN2VmS2wzNHdCTTZNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFDQkRHWU1HIiwibWUiOnsiaWQiOiIyMzQ3MDY2NjU5MTg5OjQxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMbkNwcklHRUp6RXVyUUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXTC91Sk5EMGViYnpYMEFrd2FqR3hlOURnVEQ1S29mMG55MDMxNEE2RFg4PSIsImFjY291bnRTaWduYXR1cmUiOiJNaWdZWjdBcHcyaGYySEkvWi9qZE50eFpkbm9wdENaZDNQdktZUDFKcFJwRWFSeVc0dk1aaEtKdVVHU1lmWG1KbUtQNVVRUnpuZURhM3hvQWNJVk9EQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZFNGbkFEWVM4cVZWMTI4MEhNK012WHNTZ2FpQy9WWUVoVWRjOWU1d0hIUHUxRFVSMm96QXNnbmdZMk03Sk9EMDBITUpKMkFwOXF5dFAwbVJ5cmMyaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDY2NjU5MTg5OjQxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZpLzdpVFE5SG0yODE5QUpNR294c1h2UTRFdytTcUg5Sjh0TjllQU9nMS8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA2MjM2NTd9',
    PREFIXE: process.env.PREFIX || "",
    OWNER_NAME: process.env.OWNER_NAME || "🌙MÕÕÑLÎGHT🌙",
    NUMERO_OWNER : process.env.OWNER_NUM || "2347066659189",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "all",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '🌙MÕÕÑLÎGHT🌙',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '13' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
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
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
