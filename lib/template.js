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

    var _obj = {};
    _obj.filename = filename;
    _obj.md = { name: name, type: type, url: url };
    if (obj.params) {
        var _args = j2md_array(obj.params);
        var args = j2md({h6: 'Request Parameters'}) + n + _args;
        _obj.md.args = args;
    }

    if (obj.response) {
        var _res_type = obj.response.type + n;
        var res_type = j2md({h6: 'Response Type'}) + n + _res_type;

        var _res_params = j2md_array(obj.response);
        var res_params = j2md({h6: 'Response Parameters'}) + n + _res_params;
        _obj.md.response = res_type + res_params;
    }

    return cb(_obj);
};


