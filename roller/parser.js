const {diceRoller} = require("../roller/dice");

const ROLL_REGEX = /^\/(r|roll)\s+(\d*)d(\d+)([+-](\d+|(\d*)d(\d+)))*$/;
const ROLL_TOKEN_REGEX = /^\d*d[1-9]\d*$/;

function isOperator(operator) {
    return ['+', '-'].includes(operator);
}

exports.parser = {

    test(expression) {
        return ROLL_REGEX.test(expression)
    },

    tokenize(expression) {
        const exprWithoutPrefix = expression.split(' ')[1];
        return splitKeepingSeparator(exprWithoutPrefix, /[+-]/);
    },

    compute(tokens, randomCallback) {
        console.log(tokens);
        let index = 1;
        let result = evaluate(tokens[0], randomCallback);
        while (index < tokens.length) {
            const token = tokens[index];
            if (isOperator(token)) {
                result += evalWithOperator(tokens[index + 1], token, randomCallback);
                index += 2;
            } else {
                index++;
            }
        }
        return result;
    },
};

function evaluate(token, randomCallback) {
    if (isRoll(token)) {
        return computeRoll(token, randomCallback);
    }
    return parseInt(token);

}

function isRoll(token) {
    return new RegExp(ROLL_TOKEN_REGEX).test(token);
}

function computeRoll(token, randomCallback) {
    const split = token.split('d').map(value => parseInt(value));
    let result = 0;
    for (let i = 0; i < split[0]; i++) {
        let res = diceRoller.roll(split[1], randomCallback);
        result += res;
        console.log(`randomCallback: ${randomCallback()}`);
        console.log(`${split[0]}d${split[1]} -> ${res}`);
    }
    return result;
}

function evalWithOperator(token, operator, randomCallback) {
    return operator === '+' ? evaluate(token, randomCallback) : -evaluate(token, randomCallback);
}

function splitKeepingSeparator(expression, regex) {
    let token = '';
    const result = [];
    [...expression].forEach(c => {
        if (regex.test(c)) {
            result.push(token, c);
            token = '';
        } else {
            token = token.concat(c);
        }
    });
    result.push(token);
    return result;
}