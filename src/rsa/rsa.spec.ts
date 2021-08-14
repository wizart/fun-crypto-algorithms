import {decoding, encoding, generateKeys, getDKey, hydrateContentToCodes, transformCodesToContent} from "./rsa";

describe('getDKey', () => {
    const cases = [
        {eulerPhi: 3220, e: 79},
        {eulerPhi: 7200, e: 7},
        {eulerPhi: 345534, e: 13}
    ]
    it.each(cases)('Searching D for Phi = $eulerPhi and e = $e', (values) => {
        const d = getDKey(values);
        expect((values.e * d) % values.eulerPhi).toBe(1);
    })
})

describe('Hydrate and transform content and codes', () => {
    const cases = [
        '1234567890',
        'abcdefg',
        ':&*)#_@'
    ]

    it.each(cases)('Should hydrate and transform %s', (content) => {
        const codes = hydrateContentToCodes(content);
        expect(transformCodesToContent(codes)).toBe(content);
    })
})

describe('Encoding & Decoding', () => {
    const cases = [
        'Viktor Ostapchuk zpi18',
        'Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails.'
    ]
    it.each(cases)('Encoding and decoding %s', (text) => {
        const keys = generateKeys(200);
        const encodedText = encoding(text, keys.public, keys.n);
        const decodingText = decoding(encodedText, keys.secret, keys.n);
        expect(decodingText).toBe(text);
    })
})

describe('Play with name', () => {
    const name = 'Viktor Ostapchuk zpi18';
    const encodedText = '䰸ͱ福䯄耮㕙灑弳堟䯄㻟越Ɛ鈗唿福灑摎越ͱ᫂萛'
    const keys = { public: 6703, secret: 19119, n: 37909 };

    it('Encoding', () => {
        expect(encoding(name, keys.public, keys.n)).toBe(encodedText);
    });

    it('Decoding', () => {
        expect(decoding(encodedText, keys.secret, keys.n)).toBe(name);
    });

})