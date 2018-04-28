import {Bot} from './core';
import readline from 'readline';

import Answer from './modules/answer';
import Calculator from './modules/calculator';
import Runescape from './modules/runescape';
import statics from './modules/statics';

const bot = new Bot();

// commands, handlingFunction, handlingQueryParser
bot.add(Answer);
bot.add(Calculator);
bot.add(Runescape);

bot.add(statics.pornhub);
bot.add(statics.redtube);
bot.add(statics.youtube);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const i = line.indexOf(' ');
  const [cmd, msg] = [line.slice(0, i), line.slice(i + 1)];

  const res = bot.run(cmd, msg);
  if (res instanceof Promise) {
    res.then(res => console.log(res));
  } else {
    console.log(res);
  }
});
