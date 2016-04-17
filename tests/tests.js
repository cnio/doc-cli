function isPositiveNum(s){
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s)
}

console.log(isPositiveNum(1.1));