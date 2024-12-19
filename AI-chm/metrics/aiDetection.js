function aiPatternDetection(code) {
    const commonAIPatterns = [
        /\bconst\b\s+\w+\s*=\s*function\s*\(/,
        /\bconsole\.log\(/,
        /\breturn\b\s*\(/,
        /(?:\bimport\b.*?;)/,
        /function\s*\(\)\s*\{.*\}/,
    ];

    let score = 0;
    commonAIPatterns.forEach(pattern => {
        if (pattern.test(code)) score++;
    });

    return score > 2 ? 'Likely AI generated' : 'Human generated';
}

module.exports = aiPatternDetection;
