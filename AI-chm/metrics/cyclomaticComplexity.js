function cyclomaticComplexity(code) {
    const edges = code.match(/\bif\b|\belse\b|\bfor\b|\bwhile\b/g) || [];
    const nodes = code.match(/\bfunction\b|\bconst\b|\blet\b|\bvar\b/g) || [];
    const P = 1; // Assuming one connected component (whole codebase)
    const CC = edges.length - nodes.length + 2 * P;

    return CC;
}

module.exports = cyclomaticComplexity;