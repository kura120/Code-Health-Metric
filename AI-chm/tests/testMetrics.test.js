const assert = require('assert');
const cyclomaticComplexity = require('../metrics/cyclomaticComplexity');
const halsteadComplexity = require('../metrics/halsteadComplexity');
const aiPatternDetection = require('../metrics/aiDetection');
const detectRedundancy = require('../metrics/redundancyDetection');

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
});
