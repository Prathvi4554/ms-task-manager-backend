const crypto = require('crypto');

async function createHash(data) {
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex');
}

module.exports = {
    createHash
}
