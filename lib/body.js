exports.Name =
    prompt('body[argument]', null, function (arg) {
        if (arg) return arg;
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Required =
    prompt('body[option]', 'true', function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Type =
    prompt('body[type]', 'string', function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Description =
    prompt('body[description]', null, function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });