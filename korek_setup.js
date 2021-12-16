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
    // '<!-- <meta name="facebook-domain-verification" content="b6q9nsqsnafg0ypfuh9nca32600gzk" /> -->'
  ],   
  to: [
    './assets/icons/korek/korek_logo-152x152.png', 
    './assets/icons/korek/korek_logo-152x152.png', 
    './assets/icons/korek/korek_logo-152x152.png', 
    'Captain Korek', 
    // '<meta name="facebook-domain-verification" content="b6q9nsqsnafg0ypfuh9nca32600gzk" />'
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
  to: ['"CLIENT_ID": "60ec0b8474577f001507a727"'],
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
      'assets/icons/icon-144x144.png',      
      'assets/icons/icon-192x192.png',      
      'assets/icons/icon-512x512.png'
    ],   
    to: [
      '"name": "Captain Korek",', 
      '"short_name": "Captain Korek",', 
      'assets/icons/korek/korek_logo-72x72.png', 
      'assets/icons/korek/korek_logo-96x96.png',       
      'assets/icons/korek/korek_logo-144x144.png',       
      'assets/icons/korek/korek_logo-192x192.png',       
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
