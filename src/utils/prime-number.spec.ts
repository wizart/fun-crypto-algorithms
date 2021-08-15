import {getCoprimeIntegersFor, getPrimeNumbersBy, getRandomPrimeNumber, isPrime} from "./prime-number";

describe('Prime Number', () => {
    describe('isPrime', () => {
        const primeNumbers = [
            1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
            101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
            7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919
        ];
        const notPrimeNumbers = [9, 15, 21, 100, 107*107, 7919*7919];

        it.each(primeNumbers)('should %s be prime', (number: number) => {
            expect(isPrime(number)).toBeTruthy()
        })

        it.each(notPrimeNumbers)('should %s be not prime', (number: number) => {
            expect(isPrime(number)).toBeFalsy()
        })
    });

    describe('getPrimeNumbersBy', () => {
        const cases = [
            {max: 71, primeNumbers: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]},
            {max: 178, primeNumbers: [
                2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
                73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173
            ]},
        ]

        it.each(cases)('should find all primes by $max', ({max, primeNumbers}) => {
            expect(getPrimeNumbersBy(max)).toEqual(primeNumbers)
        })
    });

    describe('getRandomPrimeNumber', () => {
        const cases = [
            {from: 1_000, to: 100_000},
            {from: 2, to: 72},
            {from: 810, to: 946},
            {from: 6834, to: 7000},
            {from: 1, to: 5},
            {from: 80_000, to: 90_000},
            {from: 90_000, to: 130_000},
        ]

        it.each(cases)('should get random prime between $from - $to', ({from, to}) => {
            const primeNumber = getRandomPrimeNumber(from, to);
            expect(primeNumber).toBeGreaterThanOrEqual(from);
            expect(primeNumber).toBeLessThanOrEqual(to);
            expect(isPrime(primeNumber)).toBeTruthy();
        });
    })

    describe('getCoprimeIntegersFor', () => {
        const cases: [num: number, coprimeIntegers: number[]][] = [
            [2, [1]],
            [3, [1, 2]],
            [4, [1, 3]],
            [5, [1, 2, 3, 4]],
            [10, [1, 3, 7, 9]],
            [11, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        ]

        it.each(cases)('should find all coprimeIntegers for %s', (num, coprimeIntegers) => {
            const foundCoprimeIntegers = getCoprimeIntegersFor(num);
            expect(foundCoprimeIntegers).toEqual(coprimeIntegers);
        });
    })
})

