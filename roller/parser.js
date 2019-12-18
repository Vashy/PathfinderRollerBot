const rollRegex = /^\/(r|roll)\s+(\d*)d(\d+)([+-](\d+|(\d*)d(\d+)))*$/;

function isOperator(operator) {
    return ['+', '-'].includes(operator);
}

exports.parser = {

    test(expression) {
        return rollRegex.test(expression)
    },

    tokenize(expression) {
        const exprWithoutPrefix = expression.split(' ')[1];
        return splitKeepingSeparator(exprWithoutPrefix, /[+-]/);
    },

    compute(tokens) {
        let index = 1;
        let result = evaluate(tokens[0]);
        while (index < tokens.length) {
            let token = tokens[index];
            if (isOperator(token)) {
                result += evalWithOperator(tokens[index + 1], token);
                index += 2;
            } else {
                index++;
            }
        }
        return result;
    },
};

function evaluate(token) {
    return parseInt(token);
}

function evalWithOperator(token, operator) {
    return operator === '+' ? evaluate(token) : -evaluate(token);
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