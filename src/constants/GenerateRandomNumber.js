export function GenerateRandomNumber() {
  // Generate a random number between 1000 and 1 million
  const randomNumber = Math.floor(Math.random() * (999999 - 1000 + 1)) + 1000;

  // Return the generated random number
  return randomNumber;
}
