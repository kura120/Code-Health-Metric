function cyclomaticComplexity(code) {
    const edges = code.match(/\bif\b|\belse\b|\bfor\b|\bwhile\b/g) || [];
    const nodes = code.match(/\bfunction\b|\bconst\b|\blet\b|\bvar\b/g) || [];
    const P = 1; // Assuming one connected component (whole codebase)
    const CC = edges.length - nodes.length + 2 * P;

    return CC;
}

module.exports.cyclomaticComplexity = cyclomaticComplexity;

function halsteadComplexity(code) {
    const operators = /[\+\-\*\/\%\=\!\&\|\^]/g;
    const operands = /\w+/g;

    const n1 = (code.match(operators) || []).length; // Distinct operators
    const n2 = (code.match(operands) || []).length; // Distinct operands
    const N1 = (code.match(operators) || []).length; // Total operators
    const N2 = (code.match(operands) || []).length; // Total operands

    const n = n1 + n2;
    const N = N1 + N2;
    const V = N * Math.log2(n);
    const D = (n1 / 2) * (N2 / n2);
    const E = V * D;

    return { V, D, E };
}

module.exports.halsteadComplexity = halsteadComplexity;
