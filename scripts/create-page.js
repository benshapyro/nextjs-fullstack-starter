const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];
if (!pageName) {
  console.error('Please provide a page name: npm run create:page about');
  process.exit(1);
}

const pageDir = path.join('src', 'app', pageName);
const pageContent = `export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page</h1>
    </div>
  );
}`;

fs.mkdirSync(pageDir, { recursive: true });
fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

console.log(`✅ Created page at src/app/${pageName}/page.tsx`);
