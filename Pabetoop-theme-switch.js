// Switch to Pabetoop

const replace = require('replace-in-file');

// Index -  Chagne Favicon
const options = {
  files: 'src/index.html',
  from: /\.\/assets\/images\/sportimo\/logo-sportimo.jpg/g,  
  to: './assets/images/sportimo/logo-pabetoop.jpg',
  countMatches: true,
};

try {
    const results = replace.sync(options);
    console.log('Replacement results:', results);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }

  // Index -  Variables
const options2 = {
    files: 'src/variables.scss',
    to: ['$theme-header-color: #ffc300;','$theme-header-logo: url("~src/assets/images/sportimo/logo-pabetoop.jpg");','$theme-header-text-color: #333333;'],
    from: ['$theme-header-color: RGBA(10, 28, 45, 1.00);', '$theme-header-logo: url("~src/assets/images/sportimo/icon-logo.svg");','$theme-header-text-color: white;'],
    countMatches: true,
  };
  
  try {
      const results = replace.sync(options2);
      console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    // Change Texts
const options3 = {
    files: 'src/assets/i18n/en.json',
    to: ['app-name": "pabetoop"'],
    from: ['app-name": "SPORTIMO"'],
    countMatches: true,
  };
  
  try {
      const results = replace.sync(options3);
      console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

//   1. root/src/variables.scss
//   comment out Sportimo section
//   comment in Pabetoop section
  
// 2. root/src/assets/i18n/en.json
//   change key app-name value to "pabetoop"
  
// 3. root/src/assets/i18n/fa.json
//   change key app-name value to "پا به توپ"