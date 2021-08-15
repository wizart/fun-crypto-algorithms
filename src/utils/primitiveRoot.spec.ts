import {getPrimitiveRootsFor} from "./primitiveRoot";

describe('primitiveRoot', () => {
    const cases: [number, number[]][] = [
        [2, [1]],
        [5, [2, 3]],
        [4, [3]],
        [6, [5]],
        [7, [3, 5]],
        [8, []],
        [11, [2, 6, 7, 8]],
        [13, [2, 6, 7, 11]],
        [17, [3, 5, 6, 7, 10, 11, 12, 14]],
        [29, [2, 3, 8, 10, 11, 14, 15, 18, 19, 21, 26, 27]],
        [30, []],
    ];

    it.each(cases)('should found primitive roots for %s', (p, primitiveRoots) => {
        const foundPrimitiveRoots = getPrimitiveRootsFor(p);
        expect(foundPrimitiveRoots).toEqual(primitiveRoots);
    });
})