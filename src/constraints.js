import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConstraints() {
  const kernelPath = path.join(__dirname, '..', 'constraints', '00_KERNEL.md');
  
  if (!fs.existsSync(kernelPath)) {
    throw new Error('constraints/00_KERNEL.md is missing - cannot start');
  }

  const content = fs.readFileSync(kernelPath, 'utf-8');
  console.log('Loaded constraints/00_KERNEL.md');
  return content;
}
