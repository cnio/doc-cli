exports.Type =
    prompt('Response Type', 'JSON', function (arg) {
        if (arg) return arg.trim();
    });

exports.response_keys_length =
    prompt('Please input the number of response parameters', '0', function (num) {
        if (isPositiveNum(num)) return num;
        var er = new Error('The number must be positive integer: "' + num + '"');
        er.notValid = true;
        return er;
    });

function isPositiveNum(s) {
    var re = /^[0-9]*[0-9][0-9]*$/;
    return re.test(s)
}