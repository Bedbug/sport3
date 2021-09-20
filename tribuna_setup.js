// Switch to Kooora

const replace = require('replace-in-file');

// Index -  Change Index.html
const options = {
  files: 'src/index.html',  
  from: [
    './assets/icons/icon-512x512.png', 
    './assets/icons/icon-192x192.png', 
    './assets/icons/icon-72x72.png', 
    'Sportimo 3 - The way to watch football',
    'If you like Sports, you will love Sportimo!',
    '<!-- <meta name="facebook-domain-verification" content="gpekx5qkpltvivs08zi839td3uk72p" /> -->'
  ],   
  to: [
    './assets/icons/tribuna_logo.png', 
    './assets/icons/tribuna_logo.png', 
    './assets/icons/tribuna/tribuna_fav_logo.png', 
    'Tribuna',
    'If you like Sports, you will love Tribuna!',
    '<meta name="facebook-domain-verification" content="gpekx5qkpltvivs08zi839td3uk72p" />'
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

  // Manifest
  const options2 = {
    files: 'src/manifest.webmanifest',  
    from: [
      '"name": "Sportimo",', 
      '"short_name": "Sportimo",', 
      'assets/icons/icon-72x72.png', 
      'assets/icons/icon-96x96.png',
      'assets/icons/icon-128x128.png',
      'assets/icons/icon-144x144.png',
      'assets/icons/icon-152x152.png',
      'assets/icons/icon-192x192.png',
      'assets/icons/icon-384x384.png',
      'assets/icons/icon-512x512.png'
    ],   
    to: [
      '"name": "Tribuna",', 
      '"short_name": "Tribuna",', 
      'assets/icons/tribuna/tribuna_logo-72x72.png', 
      'assets/icons/tribuna/tribuna_logo-96x96.png', 
      'assets/icons/tribuna/tribuna_logo-128x128.png', 
      'assets/icons/tribuna/tribuna_logo-144x144.png', 
      'assets/icons/tribuna/tribuna_logo-152x152.png', 
      'assets/icons/tribuna/tribuna_logo-192x192.png', 
      'assets/icons/tribuna/tribuna_logo-384x384.png', 
      'assets/icons/tribuna/tribuna_logo-512x512.png'
    ],
    countMatches: true,
  };
  
  try {
      const results = replace.sync(options2);
      console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }