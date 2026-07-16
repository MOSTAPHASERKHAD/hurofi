const fs = require('fs');

const path = 'src/app/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// Update LETTERS array to include Hamza
const lettersArrayMatch = code.match(/const LETTERS = \[([\s\S]*?)\];/);
if (lettersArrayMatch) {
  let lettersArray = lettersArrayMatch[1];
  if (!lettersArray.includes('????')) {
    lettersArray = lettersArray.replace(/,\s*$/g, '') + ',\n  { id: 29, letter: "?", name: "????" },\n';
    code = code.replace(lettersArrayMatch[1], lettersArray);
  }
}

// Update 28 to 29 in progress bar
code = code.replace(/\(completed \/ 28\) \* 100/g, '(completed / 29) * 100');
code = code.replace(/\{completed\}\/28 ?????/g, '{completed}/29 ?????');

fs.writeFileSync(path, code);
console.log('page.tsx updated with 29 letters');
