const parseCode = require('./utils/parseCode');
const cyclomaticComplexity = require('./metrics/cyclomaticComplexity');
const halsteadComplexity = require('./metrics/halsteadComplexity');
const aiPatternDetection = require('./metrics/aiDetection');
const detectRedundancy = require('./metrics/redundancyDetection');
const analyzeFolderStructure = require('./metrics/fileStructureAnalysis');

const filePath = './sampleCode.js'; // Example code file

const code = parseCode(filePath);
const cc = cyclomaticComplexity(code);
const halstead = halsteadComplexity(code);
const aiDetectionResult = aiPatternDetection(code);
const redundancyResult = detectRedundancy(code);
const folderDepth = analyzeFolderStructure('./');

console.log(`Cyclomatic Complexity: ${cc}`);
console.log(`Halstead Complexity: ${JSON.stringify(halstead)}`);
console.log(`AI Detection: ${aiDetectionResult}`);
console.log(`Redundancy Detection: ${redundancyResult}`);
console.log(`Folder Structure Depth: ${folderDepth}`);
