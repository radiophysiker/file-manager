import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

import { OperationFailedMessage } from '../const.js';

export async function hashFile(filePath) {
  try {
    const fullPath = resolve(cwd(), filePath);
    const hash = createHash('sha256');
    const input = createReadStream(fullPath);
    for await (const chunk of input) {
      hash.update(chunk);
    }
    const digest = hash.digest('hex');
    console.log('Hash:', digest);
  } catch {
    throw new Error(OperationFailedMessage);
  }
}
