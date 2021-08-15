import {getCoprimeIntegersFor} from "./prime-number";
import {powMod} from "./powMod";

export const getPrimitiveRootsFor = (p: number) => {
    const coprimeIntegers = getCoprimeIntegersFor(p);
    const possiableG = [];
    for (let g = 1; g < p; g += 1) {
        const powModForI = Array.from({ length: p }, (_, i) => powMod(g, i, p))
        const existIntegers = coprimeIntegers.filter(integer => powModForI.includes(integer));
        if (existIntegers.length === coprimeIntegers.length) {
            possiableG.push(g);
        }
    }
    return possiableG;
}