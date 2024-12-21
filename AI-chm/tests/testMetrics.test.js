const assert = require('assert');
const cyclomaticComplexity = require('../metrics/complexities').cyclomaticComplexity;
const halsteadComplexity = require('../metrics/complexities').halsteadComplexity;
const aiPatternDetection = require('../metrics/detectors/aiDetection');
const detectRedundancy = require('../metrics/detectors/redundancyDetection');
const { checkFormatting, checkIndentation, checkFunctionSize, checkLineLength, checkVariable } = require('../metrics/detectors/codeChecks');
const analyzeFolderStructure = require('../metrics/analysis/fileStructureAnalysis');

describe('Code Health Meter Tests', () => {
    it('should calculate cyclomatic complexity correctly', () => {
        const code = `function test() { if (true) { return 1; } else { return 2; } }`;
        assert.strictEqual(cyclomaticComplexity(code), 3);
    });

    it('should calculate halstead complexity correctly', () => {
        const code = `function add(a, b) { return a + b; }`;
        const result = halsteadComplexity(code);
        assert.strictEqual(result.V > 0, true);
    });

    it('should detect AI generated code', () => {
        const code = `const add = function(a, b) { return a + b; };`;
        assert.strictEqual(aiPatternDetection(code), 'Likely AI generated');
    });

    it('should detect redundant code', () => {
        const code = `const a = 1;\nconst b = 2;\nconst a = 1;`;
        assert.strictEqual(detectRedundancy(code), 'Possible redundant code detected');
    });

    it('should check code formatting violations', () => {
        const code = `const a=1;console.log(a);`;
        const score = checkFormatting(code);
        assert.ok(score < 1, 'Formatting issues detected');
    });

    it('should check indentation consistency', () => {
        const code = `function test() {\n   console.log("Hello");\n    console.log("World");\n}`;
        const score = checkIndentation(code);
        assert.ok(score < 1, 'Indentation issues detected');
    });

    it('should identify oversized functions', () => {
        const code = `
            function largeFunction() {
                console.log('Line 1');
                console.log('Line 2');
                console.log('Line 3');
                console.log('Line 4');
                console.log('Line 5');
                console.log('Line 6');
                console.log('Line 7');
                console.log('Line 8');
                console.log('Line 9');
                console.log('Line 10');
                console.log('Line 11');
                console.log('Line 12');
                console.log('Line 13');
                console.log('Line 14');
                console.log('Line 15');
                console.log('Line 16');
                console.log('Line 17');
                console.log('Line 18');
                console.log('Line 19');
                console.log('Line 20');
                console.log('Line 21');
            }
        `;
        const { oversizedFunctions } = checkFunctionSize(code);
        assert.strictEqual(oversizedFunctions, 1, 'Detected oversized function');
    });

    it('should check line length violations', () => {
        const code = `const a = 'This is a really long line that goes beyond the maximum allowed length for lines of code in most style guides.';`;
        const { longLines } = checkLineLength(code, 80);
        assert.strictEqual(longLines, 1, 'Line length violation detected');
    });

    it('should validate variable naming', () => {
        const code = `const x = 1;\nlet y = 2;\nvar z = 3;`;
        const { badNames } = checkVariable(code);
        assert.strictEqual(badNames, 3, 'Variable naming issues detected');
    });

    it('should analyze folder structure depth', () => {
        const depth = analyzeFolderStructure(__dirname); // Use the test folder as an example
        assert.ok(depth > 0, 'Folder structure depth detected');
    });
});
