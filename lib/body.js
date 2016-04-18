exports.argument =
    prompt('body[argument]', null, function (arg) {
        if (arg) {
            return arg;
        }

        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.option =
    prompt('body[option]', 'true', function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.type =
    prompt('body[type]', 'string', function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + argument + '"');
        er.notValid = true;
        return er;
    });

exports.description =
    prompt('body[description]', null, function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    });