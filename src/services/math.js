const badRequest = (message) => {
  const error = new Error(message);
  error.status = 400;
  throw error;
};

export const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) {
    badRequest("Invalid fibonacci input");
  }

  const result = [];

  if (n >= 1) result.push(0);
  if (n >= 2) result.push(1);

  for (let i = 2; i < n; i++) {
    const next =
      result[i - 1] + result[i - 2];
    result.push(next);
  }

  return result;
};

const isPrime = (num) => {
  if (num < 2) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
};

export const primes = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    badRequest("Invalid array");
  }

  const result = [];

  for (let value of array) {
    if (
      Number.isInteger(value) &&
      isPrime(value)
    ) {
      result.push(value);
    }
  }

  return result;
};

const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

export const lcmArray = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    badRequest("Invalid array");
  }

  let result = array[0];

  for (let i = 1; i < array.length; i++) {
    result = lcm(result, array[i]);
  }

  return result;
};

export const hcfArray = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    badRequest("Invalid array");
  }

  let result = array[0];

  for (let i = 1; i < array.length; i++) {
    result = gcd(result, array[i]);
  }

  return result;
};
