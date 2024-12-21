function aiPatternDetection(code) {
    const commonAIPatterns = [
        /\bconst\b\s+\w+\s*=\s*function\s*\(/,
        /\bconsole\.log\(/,
        /\breturn\b\s*\(/,
        /(?:\bimport\b.*?;)/,
        /function\s*\(\)\s*\{.*\}/,
        /\/\/\s[A-Z]/g,
        /\/\/\s*Function\s*for\s*\w+/g,
        /\/\/\s*Error\s*:/g
    ];

    let score = 0;
    commonAIPatterns.forEach(pattern => {
        if (pattern.test(code)) score++;
    });

    // More specific rule: if there are multiple structured comments like "Function for adding", flag as AI
    const structuredCommentPattern = /\/\/\s*Function\s*for\s*\w+/g;
    const structuredComments = code.match(structuredCommentPattern) || [];
    if (structuredComments.length > 3) score++;  // If there are more than 3 such comments, it likely indicates AI-generated code.

    return score > 3 ? 'Likely AI generated' : 'Human generated';
}

module.exports = aiPatternDetection;
