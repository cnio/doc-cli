var read = require('read');
var fs = require('fs');
var path = require('path');
var PZ = require('promzard').PromZard;
var input = require.resolve('./input.js');
var body = require.resolve('./body.js');
var template = require('./template').template;
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

        var apiType = api.type.toLowerCase();
        if (apiType === 'post') {
            var n = api.keys_length;
            delete api.keys_length;
            if (n === '0') {
                readOne(stringify(api));
            } else {
                getParameters(body, n, function (err, data) {
                    if (err) return cb(err);
                    api.body = data;
                    readOne(stringify(api));
                });
            }

            function stringify(api) {
                return JSON.stringify(api, null, 2) + '\n';
            }

            var bodies = [];
            function getParameters(body, n, cb) {
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
                        return getParameters(body, n, cb);
                    } else {
                        return cb(null, bodies)
                    }
                })
            }
        }

        var filename = api.name + '.json';
        var path2 = path.resolve(dir, filename);

        function readOne(obj) {
            console.log('About to write to %s:\n\n%s\n', path2, obj);
            read({prompt: 'Is this ok? ', default: 'yes'}, function (er, ok) {
                if (!ok || ok.toLowerCase().charAt(0) !== 'y') {
                    console.log('Aborted.')
                } else {
                    template(obj, function (res) {
                        write2md(res.filename, res.md)
                    });
                }
            })
        }

        function write2md(filename, md) {
            var mdstr = md.name + md.type + md.url;
            if (md.args) {
                mdstr += md.args;
            }
            fs.writeFile(filename, mdstr, 'utf8', function (er) {
                if (er) return cb(er);
            })
        }
    })
}



