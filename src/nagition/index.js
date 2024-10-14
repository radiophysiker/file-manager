import { chdir, cwd } from 'node:process';
import { dirname, resolve } from 'node:path';
import { readdir } from 'node:fs/promises';

import { OperationFailedMessage } from '../const.js';

export function up() {
  const currentDir = cwd();
  const parentDir = dirname(currentDir);
  if (parentDir !== currentDir) {
    chdir(parentDir);
  }
}

export async function cd(path) {
  try {
    const newPath = resolve(cwd(), path);
    chdir(newPath);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}

export async function ls() {
  try {
    const files = await readdir(cwd(), { withFileTypes: true });
    const dirs = [];
    const filesList = [];
    for (const dirent of files) {
      if (dirent.isDirectory()) {
        dirs.push({ Name: dirent.name, Type: 'directory' });
      } else {
        filesList.push({ Name: dirent.name, Type: 'file' });
      }
    }
    const list = dirs.concat(filesList).sort((a, b) => a.Name.localeCompare(b.Name));
    console.table(list);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}
