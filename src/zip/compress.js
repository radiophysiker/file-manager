import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';
import zlib from 'zlib';
import { cwd } from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';

import { OperationFailedMessage } from '../const.js';

export async function compress(src, dest) {
  try {
    const srcPath = resolve(cwd(), src);
    const destPath = resolve(cwd(), dest, basename(src) + '.gz');
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath, { flags: 'wx' });
    const gzip = zlib.createGzip();
    console.log(`Start compressing ${srcPath} to ${destPath}`);
    await pipeline(readStream, gzip, writeStream);
    console.log('Compression completed');
  } catch {
    throw new Error(OperationFailedMessage);
  }
}
