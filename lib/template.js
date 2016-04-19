var fs = require('fs');
var j2md = require('json2md');
var j2md_array = require('json2markdown');

var n = (function() {
    return '\n'
})();

exports.template = function (data, cb) {
    var obj = JSON.parse(data);
    var filename = obj.name + '.md';
    var name = j2md({h4: obj.name}) + n;
    var _type = j2md({ul: [obj.type]}) + n;
    var type = j2md({h6: 'Request Type'}) + n + _type;
    var _url = j2md({ul: [obj.url]}) + n;
    var url = j2md({h6: 'URL'}) + n + _url;

    if (obj.body) {
        var _args = j2md_array(obj.body);
        var args = j2md({h6: 'Parameters'}) + n + _args;
        return cb({filename: filename,
            md: {name: name, type: type, url: url, args: args}
        })
    } else {
        return cb({filename: filename,
            md: {name: name, type: type, url: url}
        })
    }
};


