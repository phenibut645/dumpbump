import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let srcPath = __dirname;

while(path.basename(srcPath) !== "src"){
    srcPath = path.resolve(srcPath, '..');
}

export const src = srcPath;

