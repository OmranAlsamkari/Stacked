import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export default class Controller {
  async listener(question) {
    const rl = readline.createInterface({ input, output });
    let key = await rl.question(question);
    key = key === "" ? "." : key;
    key = isNaN(key) ? key.toLowerCase() : parseInt(key);
    rl.close();
    return key;
  }
}
