function calculatePercent(number) {
  // Check if the input is a valid number
  if (typeof number !== 'number') {
    return 'Please provide a valid number';
  }

  // Calculate 80% of the number
  const result = 0.8 * number;

  // Return the result
  return result;
}

export default calculatePercent;
