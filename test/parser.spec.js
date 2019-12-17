const {parser} = require("../roller/parser");

describe('Parsing regex of the rolling expression', () => {

    it('should validate correctly a valid expression', () => {
        expect(parser).toBeDefined();

        expect(parser.test('/r 1d20+15')).toBeTruthy();
        expect(parser.test('/r 1d20+15+24')).toBeTruthy();
        expect(parser.test('/r d20-15')).toBeTruthy();
        expect(parser.test('/r d20-d4')).toBeTruthy();
    });
});

describe('tokenizer', () => {

    it('should tokenize a simple expression', () => {
        expect(parser.tokenize('/r 1d20+15')).toEqual(['1d20', '+', '15']);
    });

    it('should work on a more complex expression, with more rolls', () => {
        expect(parser.tokenize('/r 1d20+15-7d10-24+2d2')).toEqual(['1d20', '+', '15', '-', '7d10', '-', '24', '+', '2d2']);
    });
});