exports.Name =
    prompt('Parameter', null, function (arg) {
        if (arg) return arg;
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Required =
    prompt('Required', 'true', function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Type =
    prompt('Type', 'string', function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Description =
    prompt('Description', null, function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });