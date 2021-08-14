import {powMod} from "./powMod";

describe('powMod', () => {
    const cases: [code: number, pow: number, mod: number, result: number][] = [
        [5, 7, 33, 14],
        [29, 7, 33, 17],
        [0, 7, 33, 0],
        [10, 10, 10, 0],
        [10, 11, 11, 10],
        [10, 15, 11, 10],
        [10, 16, 13, 3],
        [10, 79, 3337, 3269],
        [3333, 7777, 31, 8],
        [105, 577, 3127, 847],
        [86, 3527, 6557, 4817],
    ];

    it.each(cases)('should %s ^ %s mod %s = %s', (code, pow, mod, result) => {
        expect(powMod(code, pow, mod)).toEqual(result);
    })
})