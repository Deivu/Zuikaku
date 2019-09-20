const Fetch = require('node-fetch');
const Abort = require('abort-controller');
const { ZuikakuError, ZuikakuTimeout } = require('./ZuikakuErrors');

class Zuikaku {
    /**
     * Zuikaku, osu! API Wrappper
     * @param {string} token Token that is needed by Zuikaku to query in osu! api
     * @param {number} timeout Timeout before cancelling a request
     */
    constructor(token, timeout) {
        if (!token)
            throw new ZuikakuError('Token not specified');
        Object.defineProperty(this, 'token', { value: token });
        Object.defineProperty(this, 'timeout', { value: timeout || 5000 });
        Object.defineProperty(this, 'baseurl', { value: 'https://osu.ppy.sh/api' });
    }

    /**
     * Retrieves info about a beatmap
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#beatmap
     * @returns {Promise<Array>} A JSON list containing all beatmaps (one per difficulty) matching criteria.
     */
    getBeatmaps(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_beatmaps', parameters);
    }

    /**
     * Retrieves info about a user
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#apiget_user
     * @returns {Promise<Array>} A JSON list containing user information.
     */
    getUser(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_user', parameters);
    }

    /**
     * Retrieves the top 100 scores from a specific beatmap.
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#apiget_scores
     * @returns {Promise<Array>} A JSON list containing the top 100 scores of the specified beatmap.
     */
    getScores(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_scores', parameters);
    }

    /**
     * Gets the top scores from a specific user
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#apiget_user_best
     * @returns {Promise<Array>} A JSON list containing the top 10 scores for the specified user.
     */
    getUserBest(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_user_best', parameters);
    }

    /**
     * Gets the user's ten most recent plays over the last 24 hours.
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#apiget_user_recent
     * @returns {Promise<Array>} A JSON list containing the user's ten most recent songs played.
     */
    getUserRecent(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_user_recent', parameters);
    }

    /**
     * Retrieve information about multiplayer match.
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#apiget_match
     * @returns {Promise<JSON>} A JSON object containing match information, and player's result.
     */
    getMatch(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_match', parameters);
    }

    /**
     * Get the replay data of a user's score on a map.
     * @param {Object} parameters Query Parameters that follow the osu! api wiki format. https://github.com/ppy/osu-api/wiki#get-replay-data
     * @returns {Promise<JSON>} A JSON object containing the key "content", which is a base64-encoded replay.
     */
    getReplay(parameters) {
        if (!parameters) throw new ZuikakuError('Parameters is not specified');
        return this._fetch('/get_replay', parameters);
    }
    /**
     * Get the replay data of a user's score on a map.
     * @param {string} endpoint the endpoint to use.
     * @param {Object} options the options for that endpoint.
     * @returns {Promise<*>} The response of the request
     * @private
     */
    _fetch(endpoint, options) {
        const url = new URL(this.baseurl + endpoint);
        options.k = this.token;
        url.search = new URLSearchParams(options);
        const controller = new Abort();
        const timeout = setTimeout(() => controller.abort(), this.timeout);
        return Fetch(url.toString(), { signal: controller.signal })
            .then((response) => {
                if (response.status !== 200)
                    throw new ZuikakuError(`Request error, code ${response.status}`);
                return response.json();
            })
            .catch((error) => {
                error.name === 'AbortError' ? error = new ZuikakuTimeout('Request timed out') : error = new ZuikakuError(error.message);
                throw error;
            })
            .finally(() => clearTimeout(timeout));
    }
}

module.exports = Zuikaku;