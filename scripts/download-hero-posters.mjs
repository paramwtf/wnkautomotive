import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const targetDir = path.resolve('public/assets/images/hero-posters');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const prefix = 'https://www.figma.com/api/mcp/asset/a5220da6-5cd0-46cd-b410-9c4624c76082';

const files = [
  { name: 'poster-01.png', hash: '4965a.png' },
  { name: 'poster-02.png', hash: '4d85c.png' },
  { name: 'poster-03.png', hash: 'c672e.png' },
  { name: 'poster-04.png', hash: 'f4255.png' },
  { name: 'poster-05.png', hash: '61499.png' },
  { name: 'poster-06.png', hash: '29318.png' },
  { name: 'poster-07.png', hash: '28db3.png' },
  { name: 'poster-08-center.png', hash: '3f2e1.png' },
  { name: 'poster-09.png', hash: '386cd.png' },
  { name: 'poster-10.png', hash: 'f41bf.png' },
  { name: 'poster-11.png', hash: 'fb5ea.png' },
  { name: 'poster-12.png', hash: '10b43.png' },
  { name: 'poster-13.png', hash: 'e1877.png' },
];

for (const file of files) {
  const url = `${prefix}/${file.hash}`;
  const outPath = path.join(targetDir, file.name);
  console.log(`Downloading ${file.name}...`);
  try {
    execSync(`curl.exe -f -s -L -o "${outPath}" "${url}"`);
    const stat = fs.statSync(outPath);
    console.log(`✓ ${file.name} (${Math.round(stat.size / 1024)} KB)`);
  } catch (err) {
    console.error(`Failed to download ${file.name}:`, err.message);
  }
}

console.log('All hero posters downloaded successfully.');

