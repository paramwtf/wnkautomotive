import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  const stat = fs.statSync(dest);
  console.log(`Copied ${path.basename(dest)} (${Math.round(stat.size / 1024)} KB)`);
}

// 1. RS 457
const rs457Source = 'RS457-20261107T074135Z-1-001/RS457';
const rs457Dest = 'public/assets/images/rs457';

const rs457Mappings = [
  { folder: 'Lightning McQueen Edition', file: 'lightning mcqueen 01.png', out: 'rs457-lightning-mcqueen-01.png' },
  { folder: 'Lightning McQueen Edition', file: 'Lightning mcqueen 02.png', out: 'rs457-lightning-mcqueen-02.png' },
  { folder: 'Marlboro Edition', file: 'Marlboro 01.png', out: 'rs457-marlboro-01.png' },
  { folder: 'Marlboro Edition', file: 'Marlboro 02.png', out: 'rs457-marlboro-02.png' },
  { folder: 'Mayhem Edition', file: 'Mayhem 01.png', out: 'rs457-mayhem-01.png' },
  { folder: 'Mayhem Edition', file: 'Mayhem 02.png', out: 'rs457-mayhem-02.png' },
  { folder: 'Monza Blue Edition', file: 'Monza Blue 01.png', out: 'rs457-monza-blue-01.png' },
  { folder: 'Monza Blue Edition', file: 'Monza Blue 02.png', out: 'rs457-monza-blue-02.png' },
  { folder: 'Spiderman Miles Edition', file: 'Miles Morales 01.png', out: 'rs457-miles-morales-01.png' },
  { folder: 'Spiderman Miles Edition', file: 'Miles Morales 02.png', out: 'rs457-miles-morales-02.png' },
  { folder: 'Venom Edition', file: 'Venom 01.png', out: 'rs457-venom-01.png' },
  { folder: 'Venom Edition', file: 'Venom 02.png', out: 'rs457-venom-02.png' },
];

console.log('--- Copying RS457 Images ---');
rs457Mappings.forEach(m => {
  const src = path.join(rs457Source, m.folder, m.file);
  const dest = path.join(rs457Dest, m.out);
  copyFile(src, dest);
});

// 2. KTM
const ktmSource = 'KTM-20261107T074139Z-1-001/KTM/ADV 390/Punisher Edition';
const ktmDest = 'public/assets/images/ktm';

const ktmMappings = [
  { file: 'Punisher 01.png', out: 'ktm-adv390-punisher-01.png' },
  { file: 'Punisher Updated 02.png', out: 'ktm-adv390-punisher-02.png' },
];

console.log('--- Copying KTM Images ---');
ktmMappings.forEach(m => {
  const src = path.join(ktmSource, m.file);
  const dest = path.join(ktmDest, m.out);
  copyFile(src, dest);
});

// 3. Hero Section Images
const heroSource = 'Hero section images-20261107T080012Z-1-001/Hero section images';
const heroDest = 'public/assets/images/hero';

const heroFiles = [
  'Corsa-Frost-Edition-Aprilia-RS457.jpg',
  'Glacier-Ridge-Edition.jpg',
  'GS-Dynamic-Edition-F-450GS.jpg',
  'Hilux-Martini-Collection.jpg',
  'Hornet-Edition-F-450GS.jpg',
  'Lighning-Mcqueen-Edition-Aprilia-RS457.jpg',
  'Nightshade-Edition-kawasaki-ninja-300.jpg',
  'Swoosh-collection.jpg',
  'Top-Gun-Edition-F-450GS.jpg',
];

console.log('--- Copying Hero Section Images ---');
heroFiles.forEach(f => {
  const src = path.join(heroSource, f);
  const dest = path.join(heroDest, f.toLowerCase());
  copyFile(src, dest);
});

console.log('All new asset folders copied and organized successfully.');

