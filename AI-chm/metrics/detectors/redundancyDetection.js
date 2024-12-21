function detectRedundancy(code) {
    const lines = code.split('\n');
    let repetitions = 0;
    const seenLines = new Set();

    lines.forEach(line => {
        if (seenLines.has(line.trim())) {
            repetitions++;
        } else {
            seenLines.add(line.trim());
        }
    });

    return repetitions > 3 ? 'Possible redundant code detected' : 'No redundancy detected';
}

module.exports = detectRedundancy;
