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

    const cyclomaticScore = Math.max(0, Math.min(10, 10 - Math.min(results.cCResults / 2, 10)));
    const halsteadScore = Math.max(0, Math.min(10, 10 - (results.hCResults.V / 2000)));
    const aiDetectionScore = results.aiResults === 'Human generated' ? 10 : 0;
    const redundancyDetectionScore = results.redResults === 'No redundancy detected' ? 10 : 0;
    const folderStructureScore = Math.max(0, Math.min(10, 10 - results.depthResults));
    const functionSizeScore = results.fSizeResults.oversizedFunctions === 0 ? 10 : 0;
    const lineLengthScore = results.lLengthResults.longLines === 0 ? 10 : 0;
    const variableNamingScore = results.vCheckResults.badNames === 0 ? 10 : 0;
    const indentationScore = Math.max(0, Math.min(10, results.indentationScore * 10));
    const formattingScore = results.formattingScore >= 0 ? 10 : 0;

    const totalScore = (
        cyclomaticScore * 0.15 +
        halsteadScore * 0.2 +
        aiDetectionScore * 0.1 +
        redundancyDetectionScore * 0.1 +
        folderStructureScore * 0.1 +
        functionSizeScore * 0.1 +
        lineLengthScore * 0.1 +
        variableNamingScore * 0.05 +
        indentationScore * 0.05 +
        formattingScore * 0.05
    );

    console.log("Total Code Quality Score:", totalScore.toFixed(2));

} catch (error) {
    console.error('Error analyzing code:', error.message);
}
