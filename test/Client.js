const { Zuikaku } = require('../index.js');

const zuikaku = new Zuikaku('random_token_tbh');

zuikaku.getUser({ u: 'Deivu', m: 0 }).then(console.log);
zuikaku.getUserBest({ u: 'Deivu', m: 0 }).then(console.log);
zuikaku.getBeatmaps({ b: 1619555, m: 0 }).then(console.log);