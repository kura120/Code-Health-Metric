// Simple calculator with basic operations

// Function for adding two numbers
function add(a, b) {
  return a + b;
}

// Function for subtracting two numbers
function subtract(a, b) {
  return a - b;
}

// Function for multiplying two numbers
function multiply(a, b) {
  return a * b;
}

// Function for dividing two numbers
function divide(a, b) {
  if (b === 0) {
      console.error("Error: Division by zero");
      return null;
  }
  return a / b;
}

// Function to calculate the square root of a number
function squareRoot(a) {
  if (a < 0) {
      console.error("Error: Cannot calculate square root of a negative number");
      return null;
  }
  return Math.sqrt(a);
}

// Function for power operation
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Function to calculate the factorial of a number
function factorial(n) {
  if (n < 0) {
      console.error("Error: Factorial is not defined for negative numbers");
      return null;
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
      result *= i;
  }
  return result;
}

// Function for finding the maximum of an array
function findMax(arr) {
  if (arr.length === 0) {
      console.error("Error: Array is empty");
      return null;
  }
  return Math.max(...arr);
}

// Function for finding the minimum of an array
function findMin(arr) {
  if (arr.length === 0) {
      console.error("Error: Array is empty");
      return null;
  }
  return Math.min(...arr);
}

// Main function for testing
function testCalculator() {
  console.log("Testing Calculator Operations");

  // Test basic operations
  const num1 = 10;
  const num2 = 5;
  console.log("Addition: ", add(num1, num2)); // 15
  console.log("Subtraction: ", subtract(num1, num2)); // 5
  console.log("Multiplication: ", multiply(num1, num2)); // 50
  console.log("Division: ", divide(num1, num2)); // 2
  console.log("Square Root of 16: ", squareRoot(16)); // 4
  console.log("Power: ", power(2, 3)); // 8
  console.log("Factorial of 5: ", factorial(5)); // 120
  console.log("Max in [1, 2, 3]: ", findMax([1, 2, 3])); // 3
  console.log("Min in [1, 2, 3]: ", findMin([1, 2, 3])); // 1
}

testCalculator();
