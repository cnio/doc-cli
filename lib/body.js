exports.Name =
    prompt('Parameter', null, function (arg) {
        if (arg) return arg.trim();
        var er = new Error('fatal: Parameter can not be empty: "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Required =
    prompt('Required', 'true', function (arg) {
        arg = arg.trim();
        if (arg === 'true' || arg === 'false' || arg === 'f') {
            if (arg === 'f') return 'false';
            return arg;
        }
        var er = new Error('fatal: The input type is boolean, true || false || f : "' + arg + '"');
        er.notValid = true;
        return er;
    });

exports.Type =
    prompt('Type', 'string', function (arg) {
        arg = arg.trim();
        if (arg === '') {
            var er = new Error('fatal: Type can not be empty: "' + arg + '"');
            er.notValid = true;
            return er;
        }
        return arg;
    });

exports.Description =
    prompt('Description', null, function (arg) {
        if (arg === '') {
            console.log('warning: Description is empty!');
            return '';
        }
        return arg.trim();
        //var er = new Error('fatal: Description can not be empty: "' + arg + '"');
        //er.notValid = true;
        //return er;
    });