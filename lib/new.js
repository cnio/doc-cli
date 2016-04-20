var read = require('read');
var fs = require('fs');
var path = require('path');
var PZ = require('promzard').PromZard;
var input = require.resolve('./input.js');
var params = require.resolve('./params.js');
var template = require('./template').template;
var dir = process.cwd();

module.exports = function () {
    return create(dir, input, params, function (er) {
        if (er) console.log('\nbye');
    })
};

function create(dir, input, params, cb) {
    var api = {};
    var pz = new PZ(input, {});

    pz.on('error', cb);
    pz.on('data', function (data) {
        Object.keys(data).forEach(function (k) {
            if (data[k] !== undefined && data[k] !== null) api[k] = data[k]
        });

        //api.type = (api.type.toLowerCase());

        var n = api.keys_length;
        delete api.keys_length;
        if (n === '0') {
            readOne(stringify(api));
        } else {
            getParameters(params, n, function (err, data) {
                if (err) return cb(err);
                api.params = data;
                readOne(stringify(api));
            });
        }

        function stringify(api) {
            api.type = api.type.toUpperCase();
            return JSON.stringify(api, null, 2) + '\n';
        }

        var parameters = [];
        function getParameters(params, n, cb) {
            var _parameters = {};
            var pz = new PZ(params, {});
            pz.on('error', cb);
            pz.on('data', function (data) {
                Object.keys(data).forEach(function (k) {
                    if (data[k] !== undefined && data[k] !== null) _parameters[k] = data[k]
                });
                parameters.push(_parameters);

                if (n > 1) {
                    n--;
                    return getParameters(params, n, cb);
                } else {
                    return cb(null, parameters)
                }
            })
        }


        var filename = api.name + '.json';
        var path2 = path.resolve(dir, filename);

        function readOne(obj) {
            console.log('About to write to %s:\n\n%s\n', path2, obj);
            read({prompt: 'Is this ready? ', default: 'yes'}, function (er, ok) {
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



