import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';
import zlib from 'zlib';
import { cwd } from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';

import { OperationFailedMessage } from '../const.js';

export async function decompress(src, dest) {
  try {
    const srcPath = resolve(cwd(), src);
    const destPath = resolve(cwd(), dest, basename(src).replace('.br', ''));
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath, { flags: 'wx' });
    const gunzip = zlib.createGunzip();
    console.log(`Start decompressing ${srcPath} to ${destPath}`);
    await pipeline(readStream, gunzip, writeStream);
    console.log('Compression completed');
  } catch {
    throw new Error(OperationFailedMessage);
  }
}
