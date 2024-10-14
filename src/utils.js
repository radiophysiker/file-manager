import { cwd } from 'node:process';

export function printCWD() {
  console.log(`You are currently in ${cwd()}`);
}
