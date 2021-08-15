import {getG, getP} from "./key-exchange";
import {powMod} from "../utils/powMod";

interface User {
    name: string;
    p: number;
    g: number;
    k?: number;
}

interface UserA extends User {
    x: number;
    xa?: number;
}
interface UserB extends User  {
    y: number;
    yb?: number;
}

describe('diffie–hellman-key-exchange', () => {
    it('Case 1', () => {
        // Step 1
        const p = getP(2000);
        const g = getG(p);

        // Step 2
        const userA: UserA = {
            name: 'User A',
            p,
            g,
            x: Math.round(Math.random() * p)
        }
        userA.xa = powMod(g, userA.x, p);

        // Step 3
        const userB: UserB = {
            name: 'User B',
            p,
            g,
            y: Math.round(Math.random() * p)
        }
        userB.yb = powMod(g, userB.y, userB.p);

        // Step 4
        userA.k = powMod(userB.yb, userA.x, userA.p);

        // Step 4
        userB.k = powMod(userA.xa, userB.y, userB.p);

        expect(userA.k).toBe(userB.k);
        console.dir(userA);
        console.dir(userB);
    })
})