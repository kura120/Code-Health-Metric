const fs = require('fs');
const path = require('path');
const { cyclomaticComplexity, halsteadComplexity } = require('./metrics/complexities');
const aiPatternDetection = require('./metrics/detectors/aiDetection');
const detectRedundancy = require('./metrics/detectors/redundancyDetection');
const analyzeFolderStructure = require('./metrics/analysis/fileStructureAnalysis');
const parseCode = require('./utils/parseCode');
const {
    checkFunctionSize,
    checkLineLength,
    checkVariable,
    checkIndentation,
    checkFormatting,
} = require('./metrics/codeChecks');

const codeFilePath = path.join(__dirname, '../exampleProject/sampleCode.js');
const folderPath = path.join(__dirname, '../exampleProject'); // root folder for folder structure analysis

try {
    const ast = parseCode(codeFilePath);

    const cyclomaticComplexity = cyclomaticComplexity(ast);
    const halsteadComplexity = halsteadComplexity(ast);
    const aiDetectionResult = aiPatternDetection(code);
    const redundancyResult = detectRedundancy(code);
    const folderDepth = analyzeFolderStructure(folderPath);
    const functionSizeResults = checkFunctionSize(code);
    const lineLengthResults = checkLineLength(code);
    const variableCheckResults = checkVariable(code);
    const indentationScore = checkIndentation(code);
    const formattingScore = checkFormatting(code);

    // results
    console.log('Cyclomatic Complexity:', cyclomaticComplexity);
    console.log('Halstead Complexity:', halsteadComplexity);
    console.log('AI Detection:', aiDetectionResult);
    console.log('Redundancy Detection:', redundancyResult);
    console.log('Folder Structure Depth:', folderDepth);
    console.log('Function Size Issues:', functionSizeResults);
    console.log('Line Length Issues:', lineLengthResults);
    console.log('Variable Naming Issues:', variableCheckResults);
    console.log('Indentation Score:', indentationScore);
    console.log('Formatting Score:', formattingScore);
} catch (error) {
    console.error('Error analyzing code:', error.message);
}
