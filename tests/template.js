var write2md = require('../lib/template');
var expect = require('chai').expect;
var obj = {
    "name": "grant",
    "type": "post",
    "url": "/api/wallet/batch",
    "body": [
    {
        "Name": "api_key",
        "Required": "true",
        "Type": "string",
        "Description": "注册应用时分配的api_key"
    },
    {
        "Name": "method",
        "Required": "false",
        "Type": "string",
        "Description": "调用的API名称"
    }
]
};

describe('# write2md', function() {
    it('should return correct markdown string', function(done) {
        write2md(obj, function (er, res) {
            var md = '#### grant\n';
            expect(res).to.deep.equal(md);
            done()
        })
    })
});




