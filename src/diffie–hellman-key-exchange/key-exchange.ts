import {getPrimeNumbersBy} from "../utils/prime-number";
import {getPrimitiveRootsFor} from "../utils/primitiveRoot";

export const getP = (max: number): number => {
    const primeNumbers = getPrimeNumbersBy(max);
    const randomIndex = Math.trunc(Math.random() * primeNumbers.length);
    return primeNumbers[randomIndex];
}

export const getG = (p: number) => {
    const possiableG = getPrimitiveRootsFor(p);
    const randomIndex = Math.trunc(Math.random() * possiableG.length);
    return possiableG[randomIndex];
}