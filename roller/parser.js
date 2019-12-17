

const rollRegex = /^\/(r|roll)\s+(\d*)d(\d+)([+-](\d+|(\d*)d(\d+)))*$/;

exports.parser = {

    test(expression) {
        return rollRegex.test(expression)
    },

    tokenize(expression) {
        const exprWithoutPrefix = expression.split(' ')[1];
        return splitKeepingSeparator(exprWithoutPrefix, /[+-]/);
    },

};

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