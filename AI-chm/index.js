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
    const code = parseCode(codeFilePath);

    const results = {
        cCResults: cyclomaticComplexity(code),
        hCResults: halsteadComplexity(code),
        aiResults: aiPatternDetection(code),
        redResults: detectRedundancy(code),
        depthResults: analyzeFolderStructure(folderPath),
        fSizeResults: checkFunctionSize(code),
        lLengthResults: checkLineLength(code),
        vCheckResults: checkVariable(code),
        indentationScore: checkIndentation(code),
        formattingScore: checkFormatting(code),
    };

    const normalizedScores = {
        cyclomaticComplexity: 10 - results.cCResults, // Lower is better
        halsteadV: results.hCResults.V / 1000, // Normalize Halstead Volume, scale down the number to fit 0-10
        aiDetection: results.aiResults === 'Human generated' ? 1 : 0, // Human code is better
        redundancyDetection: results.redResults === 'No redundancy detected' ? 1 : 0, // No redundancy is better
        folderStructureDepth: Math.max(0, 10 - results.depthResults), // Normalize structure depth
        functionSizeIssues: results.fSizeResults.oversizedFunctions === 0 ? 1 : 0, // No oversized function is better
        lineLengthIssues: results.lLengthResults.longLines === 0 ? 1 : 0, // No long lines is better
        variableNamingIssues: results.vCheckResults.badNames === 0 ? 1 : 0, // No bad names is better
        indentationScore: Math.max(0, Math.min(1, results.indentationScore)), // Normalize to 0-1
        formattingScore: results.formattingScore >= 0 ? 1 : 0, // Positive score is better
    };

    // results
    const totalScore = (
        normalizedScores.cyclomaticComplexity * 0.1 +
        normalizedScores.halsteadV * 0.2 +
        normalizedScores.aiDetection * 0.1 +
        normalizedScores.redundancyDetection * 0.1 +
        normalizedScores.folderStructureDepth * 0.05 +
        normalizedScores.functionSizeIssues * 0.05 +
        normalizedScores.lineLengthIssues * 0.05 +
        normalizedScores.variableNamingIssues * 0.05 +
        normalizedScores.indentationScore * 0.05 +
        normalizedScores.formattingScore * 0.05
    );

    const finalScore = Math.min(10, Math.max(0, totalScore));
    console.log("Total Code Quality Score:", finalScore.toFixed(2));
} catch (error) {
    console.error('Error analyzing code:', error.message);
}
