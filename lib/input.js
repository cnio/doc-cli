var fs = require('fs');
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
        if (isValid(type)) return type;
        var er = new Error('Invalid type: "' + type + '"');
        er.notValid = true;
        return er;
    });