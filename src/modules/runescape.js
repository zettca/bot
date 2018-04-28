import axios from 'axios';

const URLS = {
  RS3: {
    ITEM: {
      LIST: 'https://raw.githubusercontent.com/zettca/rs-items/master/dumps/latest.json',
      API: 'http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=',
      DETAIL: 'http://services.runescape.com/m=itemdb_rs/viewitem.ws?obj=',
    },
    HISCORE: {
      API: 'http://services.runescape.com/m=hiscore/index_lite.ws?player=',
      DETAIL: 'http://services.runescape.com/m=hiscore/a=13/compare?user1=',
    },
  },
  OSRS: {
    HISCORE: {
      API: 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=',
      DETAIL: 'http://services.runescape.com/m=hiscore_oldschool/a=13/hiscorepersonal.ws?user1=',
    },
  },
};

const NAMES = {
  ITEMS: [],
  STATS: [
    ['overall', 'total', 'oa', 'ov'],
    ['attack', 'att', 'at'],
    ['defence', 'def', 'de'],
    ['strength', 'str', 'st'],
    ['constitution', 'hitpoints', 'hp', 'co'],
    ['ranged', 'range', 'ra'],
    ['prayer', 'pray', 'pr'],
    ['magic', 'mage', 'ma'],
    ['cooking', 'cook'],
    ['woodcutting', 'wood', 'wc', 'wo'],
    ['fletching', 'fletch', 'fl'],
    ['fishing', 'fish', 'fi'],
    ['firemaking', 'fire', 'fm'],
    ['crafting', 'craft', 'cr'],
    ['smithing', 'smith', 'sm'],
    ['mining', 'mine', 'mi'],
    ['herblore', 'herb', 'he'],
    ['agility', 'agil', 'ag'],
    ['thieving', 'thiev', 'th'],
    ['slayer', 'slay', 'sl'],
    ['farming', 'farm', 'fa'],
    ['runecrafting', 'rc', 'ru'],
    ['hunter', 'hunt', 'hu'],
    ['construction', 'construct', 'cons'],
    ['summoning', 'summon', 'su'],
    ['dungeoneering', 'dungeon', 'dung', 'du'],
    ['divination', 'div', 'di'],
    ['invention', 'invent', 'inv', 'in'],
    ['bounty_hunter', 'bh'], ['bounty_hunter_rouges', 'bhr'],
    ['dominion_tower', 'dt', 'dominion'], ['crucible', 'cru'], ['castle_wars', 'cw'],
    ['BA_attackers', 'baa'], ['BA_defenders', 'bad'], ['BA_collectors', 'bac'], ['BA_healers', 'bah'],
    ['duel_tournaments', 'duel'], ['mobilising_armies', 'mob'], ['conquest'], ['fist_of_guthix', 'fog'],
    ['GG_resource', 'ggr'], ['GG_athletics', 'gga'],
    ['WE2AC'], ['WE2BC'], ['WE2AK'], ['WE2BK'],
    ['heist_guard', 'heistg'], ['heist_robber', 'heistr'], ['CFP'], ['WE31'], ['WE32']],
};


const skillCmds = [].concat(...NAMES.STATS);
const statsCmds = ['all', 'stats', 'levels'];
const priceCmds = ['ge', 'price'];

axios.get(URLS.RS3.ITEM.LIST).then(res => NAMES.ITEMS = res.data);

/* ========== HELPERS ========== */

function getSkill(skill) {
  for (let i = 0; i < NAMES.STATS.length; i++) {
    if (NAMES.STATS[i].indexOf(skill) !== -1) return i;
  }
  return -1;
}

function getIdFromName(itemName) {
  if (!isNaN(itemName)) return itemName; // isID

  for (const id in NAMES.ITEMS) { // exact search
    if (NAMES.ITEMS[id].toLowerCase() === itemName.toLowerCase())
      return id;
  }

  for (const id in NAMES.ITEMS) {  // contains search
    if (NAMES.ITEMS[id].toLowerCase().indexOf(itemName.toLowerCase()) !== -1)
      return id;
  }

  return null;
}

function statsTextToJson(statsText) {
  const stats = {};

  statsText.split('\n').forEach((stat, i) => {
    const statNames = NAMES.STATS[i];
    if (statNames) {
      const statArgs = stat.split(',');
      stats[statNames[0]] = {
        rank: statArgs[0],
        level: statArgs[1],
        xp: statArgs[2],
      };
    }
  });

  return stats;
}

function handleCommands(cmd, msg) {
  if (statsCmds.indexOf(cmd) !== -1) {
    return getPlayerStats(msg);
  } else if (priceCmds.indexOf(cmd) !== -1) {
    return getItemPrice(msg);
  } else {
    const i = getSkill(cmd);
    if (i !== -1) {
      return getPlayerSkill(msg, NAMES.STATS[i][0]);
    }
  }
}

/* ========== EXPORTS ========== */

export function getPlayerStats(rsn) {
  return axios.get(URLS.RS3.HISCORE.API + rsn).then(res => Promise.resolve(statsTextToJson(res.data)));
}

export function getPlayerSkill(rsn, skill) {
  return getPlayerStats(rsn).then(jsonData => Promise.resolve(jsonData[skill]));
}

export function getItemPrice(itemName) {
  const itemId = getIdFromName(itemName);
  return axios.get(URLS.RS3.ITEM.API + itemId).then(res => Promise.resolve({
    name: res.data.item.name,
    price: res.data.item.current.price,
    link: URLS.RS3.ITEM.DETAIL + itemId,
  }));
}

export default {
  commands: [].concat(skillCmds, statsCmds, priceCmds),
  handler: (cmd, msg) => handleCommands(cmd, msg),
};
