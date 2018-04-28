// BOT middleware-like core

export class Bot {
  constructor() {
    this.modules = [];
  }

  add(commands, handler, parser) {
    if (typeof commands === 'object') {
      handler = commands.handler;
      parser = commands.parser;
      commands = commands.commands;
    }

    if (!commands || commands.length === 0 || !(typeof commands === 'string' || commands instanceof Array)) {
      throw new TypeError('commands must be a string or array');
    } else if (typeof handler !== 'function') {
      throw new TypeError('handler must be a function');
    }
    this.modules.push({commands, handler, parser});
  }

  run(cmd, query) {
    for (const el of this.modules) {
      const {commands, handler, parser} = el;
      if ((commands instanceof RegExp && cmd.match(commands) !== null) || // matched RegEx
        commands === cmd || commands instanceof Array && commands.indexOf(cmd) !== -1) { // matched String
        const parsedQuery = (parser) ? parser(query) : query;
        return handler(cmd, parsedQuery);
      }
    }
  }

}
