const {diceRoller} = require("../roller/dice");

describe('Dice ranndom roller', () => {

    it('should return a value between 1 and 20, close to 1', () => {
        expect(diceRoller).toBeDefined();

        const rolled = diceRoller.roll(20, () => 0.1);
        expect(rolled).toBe(3);
    });

    it('should return a value between 1 and 20, close to 20', () => {
        expect(diceRoller).toBeDefined();

        const rolled = diceRoller.roll(20, () => 0.9);
        expect(rolled).toBe(19);
    });

    it('should return 20', () => {
        expect(diceRoller).toBeDefined();

        const rolled = diceRoller.roll(20, () => 0.9999);
        expect(rolled).toBe(20);
    });

    it('should be between 1 and 20 on an actual random call', () => {
        expect(diceRoller.roll(20)).toBeGreaterThanOrEqual(0);
        expect(diceRoller.roll(20)).toBeLessThanOrEqual(20);
    });

});