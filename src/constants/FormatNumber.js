function formatMoney(value) {
  // Normalize input: allow numbers and numeric strings; default others to 0
  let numericValue = 0;

  if (typeof value === 'number') {
    numericValue = value;
  } else if (typeof value === 'string') {
    // Remove commas/spaces and parse
    const cleaned = value.replace(/[,\s]/g, '');
    const parsed = parseFloat(cleaned);
    numericValue = Number.isNaN(parsed) ? 0 : parsed;
  } else if (value != null) {
    // Try parsing other primitive types
    const parsed = parseFloat(String(value));
    numericValue = Number.isNaN(parsed) ? 0 : parsed;
  }

  return numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default formatMoney;
