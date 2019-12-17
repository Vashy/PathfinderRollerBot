

exports.diceRoller = {

    roll(sides, randomCallback = Math.random) {
        return randInt(1, sides, randomCallback)
    }
};

function randInt(min, max, randomCallback = Math.random) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomCallback() * (max - min + 1)) + min;
}