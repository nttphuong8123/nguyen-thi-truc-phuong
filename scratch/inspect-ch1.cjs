const fs = require('fs');
const content = fs.readFileSync('src/data/subjects/risk-management/textbook.ts', 'utf8');
console.log('textbook.ts length:', content.length);
console.log('First 500 chars:', content.slice(0, 500));
