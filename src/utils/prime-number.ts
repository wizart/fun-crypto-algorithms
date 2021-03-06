let initialPrimeNumbers = [2];

export const isPrime = (num: number) => {
    if (num < 3) {
        return true;
    }
    const maxPossible = Math.floor(Math.sqrt(num));
    for(let i = 3; i <= maxPossible; i += 2) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

export const getPrimeNumbersBy = (max: number): number[] => {
    const primeNumbers = initialPrimeNumbers.filter(number => number <= max);

    let number = primeNumbers[primeNumbers.length - 1] + 1;
    do {
        let isPrime = true;
        for(let i = 0; i < primeNumbers.length; i++) {
            if (number % primeNumbers[i] === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primeNumbers.push(number);
        }
        number += 1;
    } while (number <= max);

    if (primeNumbers[primeNumbers.length - 1] > initialPrimeNumbers[initialPrimeNumbers.length - 1]) {
        initialPrimeNumbers = primeNumbers;
    }
    return primeNumbers;
}

export const getRandomPrimeNumber = (min: number, max: number) => {
    const primeNumbers = getPrimeNumbersBy(max);
    const primeNumbersInRange = primeNumbers.filter(number => number >= min && number <= max);
    const randomIndex = Math.floor(Math.random() * primeNumbersInRange.length)
    return primeNumbersInRange[randomIndex]
}

export const getCoprimeIntegersFor = (num: number) => {
    const coprimeIntegers = [];
    const divisors = getPrimeNumbersBy(num).filter(divisor => num % divisor === 0);

    for(let i = 1; i < num; i += 1) {
        let hasCommonDivisors = false;
        let divisorIndex = 0;
        while (i >= divisors[divisorIndex] && !hasCommonDivisors && divisorIndex < divisors.length) {
            if (i % divisors[divisorIndex] === 0) {
                hasCommonDivisors = true;
            }
            divisorIndex += 1;
        }

        if (!hasCommonDivisors) {
            coprimeIntegers.push(i);
        }
    }

    return coprimeIntegers;
}