const {diceRoller} = require("../roller/dice");

const rollRegExp = /^\/(r|roll)\s+(\d*)d(\d+)([+-](\d+|(\d*)d(\d+)))*$/;
const rollTokenRegExp = /^\d*d[1-9]\d*$/;

function isOperator(operator) {
    return ['+', '-'].includes(operator);
}

exports.parser = {

    test(expression) {
        return rollRegExp.test(expression)
    },

    tokenize(expression) {
        const expressionWithoutPrefix = expression.split(' ')[1];
        return splitInTokens(expressionWithoutPrefix, /[+-]/);
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
    return new RegExp(rollTokenRegExp).test(token);
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

function splitInTokens(expression, regex) {
    let token = '';
    const result = [];
    [...expression].forEach(char => {
        if (regex.test(char)) {
            result.push(token, char);
            token = '';
        } else {
            token = token.concat(char);
        }
    });
    result.push(token);
    return result;
}