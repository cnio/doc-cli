exports.body = {
    // argument: prompt('body[argument]', null, function (arg) {
    //     var arguments = [];

    //     if (arg) {
    //         return arg;
    //     }
        
    //     var er = new Error('Invalid argument: "' + argument + '"');
    //     er.notValid = true;
    //     return er;
    // }),

    // option: prompt('body[option]', 'true', function (arg) {
    //     var arguments = [];

    //     if (arg) {
    //         return arg;
    //     }
        
    //     var er = new Error('Invalid argument: "' + argument + '"');
    //     er.notValid = true;
    //     return er;
    // }),

    // type: prompt('body[type]', 'string', function (arg) {
    //     var arguments = [];

    //     if (arg) {
    //         console.log('fnnnnn')
    //         return arg;
    //     }
    
    //     var er = new Error('Invalid argument: "' + argument + '"');
    //     er.notValid = true;
    //     return er;
    // }),

    description: prompt('body[description]', null, function (arg) {
        if (arg) {
            return arg;
        }
        var er = new Error('Invalid argument: "' + arg + '"');
        er.notValid = true;
        return er;
    })
}