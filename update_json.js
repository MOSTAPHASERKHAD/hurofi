const fs = require('fs');

// Update 29-hamza.json
const hamzaPath = 'src/content/letters/29-hamza.json';
let hamza = JSON.parse(fs.readFileSync(hamzaPath, 'utf8'));
hamza.id = 29;
hamza.letter = '?';
hamza.name = '????';
hamza.forms = {
  isolated: '?',
  initial: '?',
  medial: '???',
  final: '??'
};
// keep phonemes and words the same (from old alif)
fs.writeFileSync(hamzaPath, JSON.stringify(hamza, null, 2));

// Update 01-alif.json
const alifPath = 'src/content/letters/01-alif.json';
let alif = JSON.parse(fs.readFileSync(alifPath, 'utf8'));
alif.letter = '?';
alif.name = '???';
// "???? ????? ???? ?????" -> leave Alif without words
alif.words = [];
alif.matchWords = [];
// "??????? ?????? ?????? ??????... ??? ????? ?????? ???? ????"
// Remove phonics wheel from alif activities
alif.activities = alif.activities.filter(a => a.type !== 'phonics_wheel');
alif.activities = alif.activities.filter(a => a.type !== 'match'); // No words to match

alif.phonemes = [
  { sound: '?', diacritic: '??', audio: '/audio/letters/alif.mp3' }
];
alif.forms = {
  isolated: '?',
  initial: '?',
  medial: '??',
  final: '??'
};
fs.writeFileSync(alifPath, JSON.stringify(alif, null, 2));

console.log('JSON files updated successfully');
