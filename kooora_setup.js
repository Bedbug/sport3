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
    '<!-- <meta name="facebook-domain-verification" content="b6q9nsqsnafg0ypfuh9nca32600gzk" /> -->'
  ],   
  to: [
    './assets/icons/kooora_logo.png', 
    './assets/icons/kooora_logo.png', 
    './assets/icons/kooora_logo.png', 
    'Kooora Football Legends', 
    '<meta name="facebook-domain-verification" content="b6q9nsqsnafg0ypfuh9nca32600gzk" />'],
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
  to: ['"CLIENT_ID": "5eb9a2a3b0a6860017aa5852"'],
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
      '"name": "Koora Legends",', 
      '"short_name": "Kooora",', 
      'assets/icons/korek/korek_logo-72x72.png', 
      'assets/icons/korek/korek_logo-96x96.png', 
      'assets/icons/korek/korek_logo-128x128.png', 
      'assets/icons/korek/korek_logo-144x144.png', 
      'assets/icons/korek/korek_logo-152x152.png', 
      'assets/icons/korek/korek_logo-192x192.png', 
      'assets/icons/korek/korek_logo-384x384.png', 
      'assets/icons/korek/korek_logo-512x512.png'
    ],
    countMatches: true,
  };
  // './assets/icons/kooora_logo.png', 
  try {
      const results = replace.sync(options2);
      console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
