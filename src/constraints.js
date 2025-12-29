import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConstraints() {
  const constraintsDir = path.join(__dirname, '..', 'constraints');
  
  if (!fs.existsSync(constraintsDir)) {
    console.log('constraints empty');
    return '';
  }

  const files = fs.readdirSync(constraintsDir).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('constraints empty');
    return '';
  }

  const constraints = files.map(file => {
    return fs.readFileSync(path.join(constraintsDir, file), 'utf-8');
  }).join('\n\n');

  console.log(`Loaded ${files.length} constraint file(s)`);
  return constraints;
}
