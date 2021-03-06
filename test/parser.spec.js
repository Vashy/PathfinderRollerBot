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

describe('Tokenizer', () => {

    it('should tokenize a simple expression', () => {
        expect(parser.tokenize).toBeDefined();
        expect(parser.tokenize('/r 1d20+15')).toEqual(['1d20', '+', '15']);
    });

    it('should work on a more complex expression, with more rolls', () => {
        expect(parser.tokenize('/r 1d20+15-7d10-24+2d2')).toEqual(['1d20', '+', '15', '-', '7d10', '-', '24', '+', '2d2']);
    });
});

describe('Expressions', () => {

    it('should calculate a simple expression', () => {
        expect(parser.compute).toBeDefined();

        expect(parser.compute(['13', '+', '15'])).toEqual(28);
        expect(parser.compute(['15', '-', '13'])).toEqual(2);
    });

    it('should calculate a simple expression with a negative return', () => {
        expect(parser.compute(['-15', '+', '13'])).toEqual(-2);
        expect(parser.compute(['15', '-', '117'])).toEqual(-102);
    });

    it('should evaluate a complex expression', () => {
        expect(parser.compute(['13', '+', '15', '-', '22', '+', '123'])).toEqual(129);
    });

    it('should evaluate a roll', () => {
        let expression = ['1d20'];
        expect(parser.compute(expression, Math.random)).toBeGreaterThanOrEqual(1);
        expect(parser.compute(expression, Math.random)).toBeLessThanOrEqual(20);
    });

    it('should evaluate both roll', () => {
        let expression = ['2d20'];
        expect(parser.compute(expression, () => 0.9999)).toEqual(40);
    });

    it('should evaluate a complex expression with rolls', () => {
        let expression = ['2d20', '+', '14', '-', '1d4'];
        expect(parser.compute(expression, () => 0.9999)).toEqual(40 + 14 - 4);
        // let [result, tokens] = parser.compute(expression, () => 0.9999);
        // expect(result).toEqual(40 + 14 - 4);
        // expect(tokens).toEqual('(20)', '+', '(20)', '+', '14', '-', '(4)');
    });
});