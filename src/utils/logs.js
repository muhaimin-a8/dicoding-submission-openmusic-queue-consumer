const path = require('path');
const fs = require('fs');

const logs = {
  writeLogs: async (
      error,
      pathLogs = path.resolve(__dirname, '../../logs/'),
  ) =>{
    if (!fs.existsSync(pathLogs)) {
      fs.mkdirSync(pathLogs, {recursive: true});
    }
    const dateTime = new Date().toLocaleString('ind', {
      timeZone: 'Asia/Jakarta',
    });

    fs.writeFileSync(
        `${pathLogs}/error.log`,
        `${dateTime} : ${error} \n`,
        {flag: 'a+'},
    );
  },
};

module.exports = logs;
