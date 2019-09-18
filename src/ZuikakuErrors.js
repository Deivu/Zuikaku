class ZuikakuTimeout extends Error {
    constructor(message) {
        super(message);
        this.name = 'ZuikakuTimeout';
    }
}

class ZuikakuError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ZuikakuError';
    }
}

module.exports = { ZuikakuError, ZuikakuTimeout };