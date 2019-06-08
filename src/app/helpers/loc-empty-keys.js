const fs = require('fs');
const path = require('path');

const config = {
  dir: './src/assets/i18n' // <-- your json translations directory
};

fs.readdirSync(config.dir).forEach(file => {
  if (path.basename(file) === 'en.json') {
    const filePath = `${config.dir}/${file}`;
    const json = fs.readFileSync(filePath, 'utf-8');
    const obj = JSON.parse(json);

    Object.keys(obj).forEach(key => {
      if (obj[key] === '' || obj[key] == null) {        
        obj[key] = key;
      }
    });

    const str = JSON.stringify(obj, null, '\t');
    fs.writeFileSync(filePath, str, 'utf-8');

  }
});

// Runs with:
// node src/app/helpers/loc-empty-keys.js