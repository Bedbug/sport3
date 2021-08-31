// Switch to Kooora

const replace = require('replace-in-file');

// Index -  Change Index.html
const options = {
  files: 'src/index.html',  
  from: [
    './assets/icons/icon-512x512.png', 
    './assets/icons/icon-192x192.png', 
    './assets/icons/icon-72x72.png', 
    'Sportimo 3 - The way to watch football'
  ],   
  to: [
    './assets/icons/tribuna_logo.png', 
    './assets/icons/tribuna_logo.png', 
    './assets/icons/tribuna_logo.png', 
    'Tribuna'
  ],
  countMatches: true,
};

try {
    const results = replace.sync(options);
    console.log('Replacement results:', results);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }

// Config -  Default Client
const options1 = {
  files: ['src/assets/config/development.json','src/assets/config/production.json'],  
  from: ['"CLIENT_ID": "5be2bfc7135a3e1e2d4a637f"'],
  to: ['"CLIENT_ID": "60194aea4e7060001574cb88"'],
  countMatches: true,
};

try {
    const results = replace.sync(options1);
    console.log('Replacement results:', results);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
