import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import { cwd } from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';

import { OperationFailedMessage } from '../const.js';

export async function compress(src, dest) {
  try {
    const srcPath = resolve(cwd(), src);
    const destPath = resolve(cwd(), dest, basename(src) + '.br');
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath, { flags: 'wx' });
    const brotli = createBrotliCompress();
    console.log(`Start compressing ${srcPath} to ${destPath}`);
    await pipeline(readStream, brotli, writeStream);
    console.log('Compression completed');
  } catch {
    throw new Error(OperationFailedMessage);
  }
}
