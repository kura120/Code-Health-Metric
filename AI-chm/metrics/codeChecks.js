const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function checkFormatting(code) {
    const lines = code.split('\n');
    const regexPatterns = [
        /[^ ](,|=|\+|-|\*|\/)/, // Missing space before or after operators
        /\s$/,                  // Trailing whitespace
    ];
    let violations = 0;

    lines.forEach(line => {
        regexPatterns.forEach(pattern => {
            if (pattern.test(line)) violations++;
        });
    });

    return 1 - violations / lines.length;
}

module.exports.checkFormatting = checkFormatting;

function checkFunctionSize(code, maxLines = 30, maxParams = 5) {
    const ast = parse(code, { sourceType: "module" });
    let oversizedFunctions = 0;
    let totalFunctions = 0;

    traverse(ast, {
        FunctionDeclaration(path) {
            totalFunctions++;
            const functionBodyLines = path.node.loc.end.line - path.node.loc.start.line + 1;
            const paramsCount = path.node.params.length;

            if (functionBodyLines > maxLines || paramsCount > maxParams) {
                oversizedFunctions++;
            }
        },
        ArrowFunctionExpression(path) {
            if (path.parent.type === "VariableDeclarator") {
                totalFunctions++;
                const functionBodyLines = path.node.loc.end.line - path.node.loc.start.line + 1;
                const paramsCount = path.node.params.length;

                if (functionBodyLines > maxLines || paramsCount > maxParams) {
                    oversizedFunctions++;
                }
            }
        },
    });

    return {
        oversizedFunctions,
        score: 1 - oversizedFunctions / totalFunctions,
    };
}

module.exports.checkFunctionSize = checkFunctionSize;

function checkIndentation(code) {
    const lines = code.split('\n');
    let inconsistentCount = 0;
    const expectedIndentation = 4; // Customize as needed

    lines.forEach((line, index) => {
        const leadingSpaces = line.match(/^ */)[0].length;
        if (leadingSpaces % expectedIndentation !== 0) {
            inconsistentCount++;
        }
    });

    return 1 - inconsistentCount / lines.length;
}
module.exports.checkIndentation = checkIndentation;

function checkLineLength(code, maxLength = 120) {
    const lines = code.split("\n");
    let longLines = 0;

    lines.forEach((line) => {
        if (line.length > maxLength) {
            longLines++;
        }
    });

    return {
        longLines,
        score: 1 - longLines / lines.length,
    };
}

module.exports.checkLineLength = checkLineLength;

function checkVariable(code) {
    const lines = code.split("\n");
    const variableRegex = /(?:const|let|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g;
    const badNameRegex = /^[a-z]$/; // Matches single-letter names (except 'i', 'j', 'x', etc.)

    let totalVariables = 0;
    let badNames = 0;

    lines.forEach((line) => {
        let match;
        while ((match = variableRegex.exec(line)) !== null) {
            totalVariables++;
            if (badNameRegex.test(match[1])) {
                badNames++;
            }
        }
    });

    return {
        badNames,
        score: 1 - badNames / totalVariables,
    };
}

module.exports.checkVariable = checkVariable;