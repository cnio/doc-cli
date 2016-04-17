var read = require('read');
var fs = require('fs');
var path = require('path');
var PZ = require('promzard').PromZard;
var input = require.resolve('./input.js');
var body = require.resolve('./body.js')
var async = require('async')
var dir = process.cwd();

module.exports = function() {
  console.log(123456)
    return create(dir, input, body, function(er, data) {
        if (er) console.log(er);
        else console.log('successfully', data)
    })
}

function create(dir, input, body, cb) {
    var api = {};
    var pz = new PZ(input, {});
    
    pz.on('error', cb);
    pz.on('data', function (data) {
        Object.keys(data).forEach(function (k) {
            if (data[k] !== undefined && data[k] !== null) api[k] = data[k]
        });
console.log(api)
        // var obj = JSON.stringify(api, null, 2) + '\n';

        // var filename = api['name'] + '.json';
        // var path2 = path.resolve(dir, filename);
        // function write() {
        //     fs.writeFile(filename, obj, 'utf8', function (er) {
        //         if (!er) {
        //             //console.log('Wrote to %s:\n\n%s\n', filename, obj)
        //         }
        //         return cb(er, api)
        //     })
        // }

        // console.log('About to write to %s:\n\n%s\n', path2, obj);
        // read({prompt: 'Is this ok? ', default: 'yes'}, function (er, ok) {
        //     if (!ok ||  ok.toLowerCase().charAt(0) !== 'y') {
        //         console.log('Aborted.')
        //     } else {
        //         return write();
        //     }
        // })
        // var apiType = api.type.toLowerCase();
        // if (apiType === 'post') {
        //     createBody(body, cb); 
        // }

        var apiType = api.type.toLowerCase();
        if (apiType === 'post') {
            //createBody(body, cb)
            async.times(1, function(body, next) {
                console.log(1)
                createBody(body, cb)
                
            }, function(err, bodies) {
                console.log(bodies)
            })
        }
    })
}

function createBody(body, cb) {
    console.log('2')
    var api2 = {}
    pz2 = new PZ(body, {})
    pz2.on('error', cb);
    pz2.on('data', function (data) {
        Object.keys(data).forEach(function (k) {
            if (data[k] !== undefined && data[k] !== null) api2[k] = data[k]
        });
console.log(api2)
    cb(null, api2);
})
}

