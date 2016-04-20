var read = require('read');
var fs = require('fs');
var path = require('path');
var PZ = require('promzard').PromZard;
var input = require.resolve('./input.js');
var params = require.resolve('./params.js');
var resp = require.resolve('./response.js');
var template = require('./template').template;
var dir = process.cwd();
var Q = require('q');

module.exports = function () {
    return create(dir, input, params, resp, function (er) {
        if (er) console.log('\nbye');
    })
};

function create(dir, input, params, resp, cb) {
    var api = {};
    var pz = new PZ(input, {});
    pz.on('error', cb);
    pz.on('data', function (data) {
        Object.keys(data).forEach(function (k) {
            if (data[k] !== undefined && data[k] !== null) api[k] = data[k]
        });

        var n = api.keys_length;
        delete api.keys_length;
        if (n === '0') {
            getResParams(resp, function(err, res) {
                if (err) return cb(err);

                var res_n = res.res_keys_length;
                if (res_n === '0') {
                    readOne(stringify(api));
                } else {
                    api.response = {};
                    api.response.type = res.type;
                    getParameters(params, res_n, function (err, data) {
                        if (err) return cb(err);
                        api.response.params = data;
                        console.log('api=================')
                        console.log(api);
                        console.log('api=================')
                        readOne(stringify(api));
                    });
                }
            })
        } else {
            Q.nfcall(getParameters, params, n)
                .then(function(data) {
                    var data2 = data;
                    parameters = null;
                    api.params = data2;
                    return Q.nfcall(getResParams, resp)
                })
                .then(function(res) {
                    console.log(res)
                    var res_n = res.res_keys_length;
                    //console.log(api)
                    if (res_n === '0') {
                        readOne(stringify(api));
                    } else {
                        api.response = {};
                        api.response.type = res.type;
                        console.log(4567)
                        return Q.nfcall(getParams, params, res_n);

                    }
                })
                .then(function(ret) {
                    console.log(ret)
                    api.response.params = ret;
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

        var params_copy = [];
        function getParams(params, n, cb) {
            var _parameters = {};
            var pz = new PZ(params, {});
            pz.on('error', cb);
            pz.on('data', function (data) {
                Object.keys(data).forEach(function (k) {
                    if (data[k] !== undefined && data[k] !== null) _parameters[k] = data[k]
                });
                params_copy.push(_parameters);

                if (n > 1) {
                    n--;
                    return getParams(params, n, cb);
                } else {
                    return cb(null, params_copy)
                }
            })
        }

        function getResParams(resp, cb) {
            var res_params = {};
            var pz = new PZ(resp, {});
            pz.on('error', cb);
            pz.on('data', function(data) {
                Object.keys(data).forEach(function (k) {
                    if (data[k] !== undefined && data[k] !== null) res_params[k] = data[k]
                });
                return cb(null, res_params);
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
            if (md.response) {
                mdstr += md.response;
            }
            fs.writeFile(filename, mdstr, 'utf8', function (er) {
                if (er) return cb(er);
            })
        }
    })
}



