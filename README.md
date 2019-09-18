# Zuikaku
<p align="center">
  <img src="https://vignette.wikia.nocookie.net/kancolle/images/9/9b/Zuikaku_Kai_Ni_A_Full.png/revision/latest/">
</p>

The ShipGirl Project. Zuikaku. `(c) Kancolle for Zuikaku`.

### A very lightweight wrapper around osu! api.

### Installation
```
npm i zuikaku
```

### Documentation
https://deivu.github.io/Zuikaku/?api

### Example Usage
```js
const { Zuikaku } = require('zuikaku');
const zuikaku = new Zuikaku('your_osu!_token');
async function start() {
  const user = await zuikaku.getUser({ u: 'Deivu', m: 0 });
  console.log(user[0]);
  const userBest = await zuikaku.getUserBest({ u: 'Deivu', m: 0 });
  console.log(userBest[0]);
  const beatmap = await zuikaku.getBeatmaps({ b: 1619555, m: 0 });
  console.log(beatmap[0]);
}
start()
  .then(() => console.log('All requests are done'))
  .catch(console.error);
```

Or this [`Client.js`](https://github.com/Deivu/Zuikaku/blob/master/test/Client.js) 

### osu! API wiki
You can find the wiki in [`HERE`](https://github.com/ppy/osu-api/wiki) 