import crypto from "crypto";
import fs from "fs";
import path from "path";

export const  showHashFile = async (hashName, pathFile) => {
  try {
    await fsPromise.stat(path.join(pathFile));
    const hash = crypto.createHash(hashName);
    const streamRead = fs.createReadStream(pathFile);
    streamRead.on('error', err => console.log('error hash file'));
    streamRead.on('data', chunk => hash.update(chunk));
    streamRead.on('end', () => console.log(hash.digest('hex')));
  ;
  } catch {
    console.log('wrong path');
  }
    
}
