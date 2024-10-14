import { EOL, cpus, homedir, userInfo } from 'node:os';
import { arch } from 'node:process';

import { InvalidInputMessage } from "../const.js";

export function osInfo(arg) {
  switch (arg) {
    case '--EOL':
      console.log(`End-Of-Line: ${JSON.stringify(EOL)}`);
      break;
    case '--cpus':
      const cpuInfo = cpus();
      console.log(`Total CPUs: ${cpuInfo.length}`);
      cpuInfo.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;
    case '--homedir':
      console.log(`Home Directory: ${homedir()}`);
      break;
    case '--username':
      console.log(`System Username: ${userInfo().username}`);
      break;
    case '--architecture':
      console.log(`CPU Architecture: ${arch}`);
      break;
    default:
      console.log(InvalidInputMessage);
  }
}
