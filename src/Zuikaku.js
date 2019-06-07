const Fetch = require('node-fetch');
const Abort = require('abort-controller');

class Zuikaku {
    constructor(token) {
        Object.defineProperty(this, 'token', { value: token });
        this.baseurl = 'https://osu.ppy.sh/api';
    }

    // Beatmap
    getBeatmaps(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_beatmaps', parameters);
    }

    // User
    getUser(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_user', parameters);
    }

    // Scores
    getScores(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_scores', parameters);
    }

    // Best Performance
    getUserBest(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_user_best', parameters);
    }

    // Recently Played
    getUserRecent(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_user_recent', parameters);
    }

    // Multiplayer
    getMatch(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_match', parameters);
    }

    // Replay Data
    getReplay(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_replay', parameters);
    }

    _fetch(endpoint, options) {
        const url = new URL(this.baseurl + endpoint);
        options.k = this.token;
        url.search = new URLSearchParams(options);
        const controller = new Abort();
        const timeout = setTimeout(() => controller.abort(), 15000);
        return Fetch(url.toString(), { signal: controller.signal })
            .then((response) => {
                clearTimeout(timeout);
                if (response.status !== 200)
                    throw new Error(`Zuikaku_Error: Code ${response.status}`);
                return response.json();
            }, (error) => {
                clearTimeout(timeout);
                error.name === 'AbortError' ? error = new Error('Zuikaku_Error: Request Timed Out') : error = new Error(`Zuikaku_Error: ${error}`);
                throw error;
            });
    }
}

module.exports = Zuikaku;