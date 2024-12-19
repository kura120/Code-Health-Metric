const fs = require('fs');
const path = require('path');

function analyzeFolderStructure(directory) {
    let depth = 0;
    function checkDepth(dir, currentDepth) {
        const files = fs.readdirSync(dir);
        depth = Math.max(depth, currentDepth);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                checkDepth(fullPath, currentDepth + 1);
            }
        });
    }
    checkDepth(directory, 1);
    return depth;
}

module.exports = analyzeFolderStructure;
