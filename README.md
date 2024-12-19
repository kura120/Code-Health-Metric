# Code Health Meter
<center><b>Not completed</b></center>

## Overview
This project is a simple tool for measuring the health of your JavaScript code using various static code analysis metrics. These metrics help identify characteristics of the code that indicate potential problems or patterns such as redundancy, excessive complexity, or AI-generated code.

## Metrics Used
- **Cyclomatic Complexity**: Measures the number of linearly independent paths through a program's source code.
- **Halstead Complexity**: Measures the complexity of code based on its operators and operands.
- **AI Pattern Detection**: Detects code patterns that are commonly seen in AI-generated code.
- **Redundancy Detection**: Identifies duplicate or repetitive code blocks.
- **File Structure Analysis**: Analyzes the directory structure of your project to identify overly complex or fragmented file layouts.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kura120/AI-code-health-meter.git
   cd code-health-meter
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. To analyze a code file, use the `index.js` file and point it to your code file.

## Running Tests
You can run tests for the project using:

```bash
npm test
```

This will check the correctness of the various metrics.

## Example Usage

To analyze a specific code file, modify the `filePath` variable in `index.js` and run:

```bash
node index.js
```

This will print out the results of the metrics on your code.

## Additional Features

@ TODO

## Future Improvements

- Add more advanced metrics such as **Code Duplication Detection** or **Code Smell Analysis**.
- Improve AI pattern detection by incorporating machine learning models.
- Integrate with continuous integration (CI) tools like GitHub Actions or CircleCI to automatically analyze code on every commit. --> on GitHub projects

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
