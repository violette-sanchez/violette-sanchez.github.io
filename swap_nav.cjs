const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const regex = /(<a href="galerie\.html"[^>]*>Galerie<\/a>)(\s*)(<a href="a-propos\.html"[^>]*>À propos<\/a>)/g;
  
  if (regex.test(content)) {
    const updatedContent = content.replace(regex, '$3$2$1');
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${file}`);
    updatedCount++;
  }
}
console.log(`Done! Updated ${updatedCount} HTML files.`);
