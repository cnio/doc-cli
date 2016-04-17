var isValid = require('validate-request-types');

exports.name =
    prompt('name', null, function (name) {
        if (name) return name;
        var er = new Error('Invalid name: "' + name + '"');
        er.notValid = true;
        return er;
    });

exports.type =
    prompt('type', 'post', function (type) {
        if (isValid(type)) {
            return type;
        }
        var er = new Error('Invalid type: "' + type + '"');
        er.notValid = true;
        return er;
    });

exports.url =
    prompt('url', null, function (url) {
        if (url) return url;
        var er = new Error('Invalid url: "' + url + '"');
        er.notValid = true;
        return er;
    });

exports.keys_length =
    prompt('Please input the number of needed arguments', null, function (num) {
        if (isPositiveNum(num)) return num;
        var er = new Error('The number must be positive integer: "' + num + '"');
        er.notValid = true;
        return er;
    });

function isPositiveNum(s) {
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s)
}

