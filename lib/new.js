var read = require('read');
var fs = require('fs');
var path = require('path');
var PZ = require('promzard').PromZard;
var input = require.resolve('./input.js');
var body = require.resolve('./body.js');
var dir = process.cwd();

module.exports = function () {
    return create(dir, input, body, function (er) {
        if (er) console.log('\nbye');
    })
};

function create(dir, input, body, cb) {
    var api = {};
    var pz = new PZ(input, {});

    pz.on('error', cb);
    pz.on('data', function (data) {
        Object.keys(data).forEach(function (k) {
            if (data[k] !== undefined && data[k] !== null) api[k] = data[k]
        });
        //console.log(api);

        var apiType = api.type.toLowerCase();
        if (apiType === 'post') {
            var n = api.keys_length;
            delete api.keys_length;
            createBody(body, n, function (err, data) {
                if (err) return cb(err);
                api.body = data;
                var obj = JSON.stringify(api, null, 2) + '\n';
                readOne(obj);
            });

            var bodies = [];
            function createBody(body, n, cb) {
                var _body = {};
                var pzbody = new PZ(body, {});
                pzbody.on('error', cb);
                pzbody.on('data', function (data) {
                    Object.keys(data).forEach(function (k) {
                        if (data[k] !== undefined && data[k] !== null) _body[k] = data[k]
                    });
                    bodies.push(_body);

                    if (n > 1) {
                        n--;
                        return createBody(body, n, cb);
                    } else {
                        return cb(null, bodies)
                    }
                })
            }
        }

        var filename = api.name + '.json';
        var path2 = path.resolve(dir, filename);

        function write(obj) {
            fs.writeFile(filename, obj, 'utf8', function (er) {
                return cb(er)
            })
        }

        function readOne(obj) {
            console.log('About to write to %s:\n\n%s\n', path2, obj);
            read({prompt: 'Is this ok? ', default: 'yes'}, function (er, ok) {
                if (!ok || ok.toLowerCase().charAt(0) !== 'y') {
                    console.log('Aborted.')
                } else {
                    return write(obj);
                }
            })
        }
    })
}



