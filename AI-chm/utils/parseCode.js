const fs = require('fs');

function parseCode(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    return code;
}

module.exports = parseCode;
