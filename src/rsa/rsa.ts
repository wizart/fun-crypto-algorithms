import {getRandomPrimeNumber} from "../utils/prime-number";
import {powMod} from "../utils/powMod";

const getP = (min: number, max: number) => {
    return getRandomPrimeNumber(min, max)
}

const getQ = (p: number, min: number, max: number) => {
    let q;
    do {
        q = getRandomPrimeNumber(min, max);
    } while (p === q)
    return q;
}

const getEulerPhi = (p: number, q: number) => {
    return (p - 1) * (q - 1);
}

const getE = (eulerPhi: number) => {
    return  getRandomPrimeNumber(1, eulerPhi);
}

interface DKeyArgs {
    eulerPhi: number;
    e: number
}
interface Operation {
    r: number;
    q: number;
    u: number;
    v: number;
}
export const getDKey = ({ eulerPhi, e }: DKeyArgs) => {
    const operations = [] as Operation[];
    operations.push({ r: eulerPhi, q: 0, u: 1, v: 0 });
    operations.push({ r: e, q: 0, u: 0, v: 1 });
    do {
        const lastIndex = operations.length - 1;
        const operation = {} as Operation;
        operation.r = operations[lastIndex - 1].r % operations[lastIndex].r;
        operation.q = Math.trunc(operations[lastIndex - 1].r / operations[lastIndex].r);
        operation.u = operations[lastIndex - 1].u - operation.q * operations[lastIndex].u;
        operation.v = operations[lastIndex - 1].v - operation.q * operations[lastIndex].v;
        operations.push(operation)
    } while (operations[operations.length -1].r > 1)

    return operations[operations.length - 1].v < 0
        ? operations[operations.length - 1].v + eulerPhi
        : operations[operations.length - 1].v;
}

export const hydrateContentToCodes = (content: string): number[] => {
    const codes = [];
    for (let i = 0; i < content.length; i += 1) {
        codes.push(content.charCodeAt(i));
    }
    return codes;
}

export const transformCodesToContent = (codes: number[]): string => {
    return String.fromCharCode(...codes);
}

export const encodingCode = (code: number, e: number, n: number): number => {
  return powMod(code, e, n);
}

export const decodingCode = (code: number, d: number, n: number): number => {
    return powMod(code, d, n);
}

export const generateKeys = (limit: number) => {
    const p = getP(Math.trunc(limit / 2), limit);
    const q = getQ(p, Math.trunc(limit / 2), limit);
    const n = p * q;
    const phi = getEulerPhi(p, q);
    const e = getE(phi);
    const d = getDKey({eulerPhi: phi, e})
    return { public: e, secret: d, n }
}

export const encoding = (content: string, publicKey: number, n: number) => {
    const codes = hydrateContentToCodes(content);
    const encodedCodes = codes.map( code => encodingCode(code, publicKey, n) )
    return transformCodesToContent(encodedCodes);
}

export const decoding = (content: string, privateKey: number, n: number) => {
    const codes = hydrateContentToCodes(content);
    const encodedCodes = codes.map( code => encodingCode(code, privateKey, n) )
    return transformCodesToContent(encodedCodes);
}

