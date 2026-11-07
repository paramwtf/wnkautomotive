import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catalog = JSON.parse(fs.readFileSync(path.join(rootDir, 'src', 'data', 'catalog.json'), 'utf-8'));

console.log(`Checking ${catalog.length} products...`);
let broken = 0;

catalog.forEach((p) => {
  const cardPath = path.join(rootDir, 'public', p.cardImage.replace(/^\//, ''));
  if (!fs.existsSync(cardPath)) {
    console.error(`Broken cardImage in ${p.slug}: ${p.cardImage}`);
    broken++;
  }
  p.galleryImages.forEach((g) => {
    const galleryPath = path.join(rootDir, 'public', g.replace(/^\//, ''));
    if (!fs.existsSync(galleryPath)) {
      console.error(`Broken galleryImage in ${p.slug}: ${g}`);
      broken++;
    }
  });
});

if (broken === 0) {
  console.log('✓ All 22 product card images and gallery images exist on disk without a single broken link.');
} else {
  console.error(`Found ${broken} broken paths!`);
  process.exit(1);
}

