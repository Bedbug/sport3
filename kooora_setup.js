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
