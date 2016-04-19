var template = require('../lib/template').template;
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

var jsonstr = JSON.stringify(obj);
describe('# template', function() {
    it('should return correct markdown string', function(done) {
        template(jsonstr, function (res) {
            var md = '#### grant\n';
            var filename = 'grant.md';
            expect(res.filename).to.deep.equal(filename);
            expect(res.md.name).to.deep.equal(md);
            done()
        })
    })
});




