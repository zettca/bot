export default {
  redtube: {
    commands: ['redtube', 'rt'],
    handler: (cmd, msg) => 'https://www.redtube.com/?search=' + msg,
    parser: (msg) => msg.replace(/ /g, '+'),
  },
  pornhub: {
    commands: ['pornhub', 'ph'],
    handler: (cmd, msg) => 'https://www.pornhub.com/video/search?search=' + msg,
    parser: (msg) => msg.replace(/ /g, '+'),
  },
  youtube: {
    commands: ['youtube', 'yt'],
    handler: (cmd, msg) => 'https://www.youtube.com/results?search_query=' + msg,
    parser: (msg) => msg.replace(/ /g, '+'),
  }
};
