

exports.diceRoller = {

    roll(sides, randomCallback = Math.random) {
        return getRandomIntInclusive(1, sides, randomCallback)
    }
};

function getRandomIntInclusive(min, max, randomCallback = Math.random) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomCallback() * (max - min + 1)) + min;
}