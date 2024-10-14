import readline from 'node:readline';
import { homedir } from 'node:os';
import { chdir } from 'node:process';
import { up, cd, ls } from './nagition/index.js';
import { cat, add, rn, cp, mv, rm } from './file-operations/index.js';
import { osInfo } from './os-operations/index.js';
import { hashFile } from './hash/index.js';
import { compress, decompress } from './zip/index.js';
import { printCWD } from './utils.js';
import { OperationFailedMessage, InvalidInputMessage } from  './const.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

console.log(`Welcome to the File Manager, ${username}!`);
chdir(homedir());
printCWD();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

rl.prompt();

rl.on('line', async (input) => {
  input = input.trim();
  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  }
  try {
    let [command, ...args] = input.split(' ');
    args = args.map(arg => arg.trim());
    switch (command) {
      case 'up':
        up();
        break;
      case 'cd':
        await cd(args.join(' '));
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        await cat(args.join(' '));
        break;
      case 'add':
        await add(args.join(' '));
        break;
      case 'rn':
        await rn(args[0], args[1]);
        break;
      case 'cp':
        await cp(args[0], args[1]);
        break;
      case 'mv':
        await mv(args[0], args[1]);
        break;
      case 'rm':
        await rm(args.join(' '));
        break;
      case 'os':
        osInfo(args[0]);
        break;
      case 'hash':
        await hashFile(args.join(' '));
        break;
      case 'compress':
        await compress(args[0], args[1]);
        break;
      case 'decompress':
        await decompress(args[0], args[1]);
        break;
      default:
        console.log(InvalidInputMessage);
    }
  } catch (error) {
    console.log(OperationFailedMessage);
  }
  printCWD();
  rl.prompt();
});

rl.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
