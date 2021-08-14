const getMaxPow = (code: number): number => {
    if (code < 10) return 8;
    if (code < 100) return 5;
    return 2;
}

export const powMod = (code: number, pow: number, mod: number) => {
    const maxPow = getMaxPow(code);
    if (pow <= maxPow) {
        return Math.pow(code, pow) % mod
    }

    const chunksNumber = Math.ceil(pow / maxPow);
    const maxPowMod = Math.pow(code, maxPow) % mod;

    if (pow % chunksNumber === 0) {
        return powMod(maxPowMod, chunksNumber, mod);
    }

    const mainPart = powMod(maxPowMod, chunksNumber - 1, mod);
    const tailPart = Math.pow(code, pow % maxPow) % mod;

    return (mainPart * tailPart) % mod;
}