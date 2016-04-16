var read = require('read');
var fs = require('fs');
var path = require('path');
var PZ = require('promzard').PromZard;
var input = require.resolve('./input.js');
var dir = process.cwd();

module.exports = function() {
  console.log(123456)
    return create(dir, input, function(er, data) {
        console.log('successfully')
    })
}

function create(dir, input, cb) {
    var api = {};
    var pz = new PZ(input, {});
    pz.on('error', cb);
    pz.on('data', function (data) {
        Object.keys(data).forEach(function (k) {
            if (data[k] !== undefined && data[k] !== null) api[k] = data[k]
        });

        var obj = JSON.stringify(api, null, 2) + '\n';

        var filename = api['name'] + '.json';
        var path2 = path.resolve(dir, filename);
        function write() {
            fs.writeFile(filename, obj, 'utf8', function (er) {
                if (!er) {
                    //console.log('Wrote to %s:\n\n%s\n', filename, obj)
                }
                return cb(er, api)
            })
        }

        console.log('About to write to %s:\n\n%s\n', path2, obj);
        read({prompt: 'Is this ok? ', default: 'yes'}, function (er, ok) {
            if (!ok ||  ok.toLowerCase().charAt(0) !== 'y') {
                console.log('Aborted.')
            } else {
                return write();
            }
        })
    })
}