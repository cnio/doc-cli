var fs = require('fs');
var j2md = require('json2md');
var j2md_array = require('json2markdown');


var n = (function() {
    return '\n'
})();

module.exports = function write2md(obj, cb) {
    var filename = obj.name + '.md';
    var name = j2md({h4: obj.name}) + n;
    var _type = j2md({ul: [obj.type]}) + n;
    var type = j2md({h6: 'Request Type'}) + n + _type;
    var _url = j2md({ul: [obj.url]}) + n;
    var url = j2md({h6: 'URL'}) + n + _url;
    var _args = j2md_array(obj.body);
    var args = j2md({h6: 'Arguments'}) + n + _args;
    var md = name + type + url + args;

    fs.writeFile(filename, md, 'utf8', function (er) {
        if (er) return cb(er);
        return cb(null, name);
    })
};


