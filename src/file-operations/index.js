import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { writeFile, rename, unlink } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { cwd } from 'node:process';

import { OperationFailedMessage } from '../const.js';

export async function cat(filePath) {
  try {
    const fullPath = resolve(cwd(), filePath);
    const readStream = createReadStream(fullPath, 'utf-8');
    await pipeline(readStream, process.stdout);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}

export async function add(fileName) {
  try {
    const fullPath = resolve(cwd(), fileName);
    await writeFile(fullPath, '', { flag: 'wx' });
  } catch {
    throw new Error(OperationFailedMessage);
  }
}

export async function rn(oldPath, newFileName) {
  try {
    const oldFullPath = resolve(cwd(), oldPath);
    const newFullPath = resolve(cwd(), basename(newFileName));
    await rename(oldFullPath, newFullPath);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}

export async function cp(src, dest) {
  try {
    const srcPath = resolve(cwd(), src);
    const destPath = resolve(cwd(), dest, basename(src));
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath, { flags: 'wx' });
    await pipeline(readStream, writeStream);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}

export async function mv(src, dest) {
  try {
    await cp(src, dest);
    await rm(src);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}

export async function rm(filePath) {
  try {
    const fullPath = resolve(cwd(), filePath);
    await unlink(fullPath);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}
