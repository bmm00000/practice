// watch out with this behaviour:
function printSinger(_a) {
    var name = _a.name, lastName = _a.lastName;
    console.log("This is ".concat(name, " ").concat(lastName, "."));
}
printSinger({ name: 'Mick', lastName: 'Jagger' });
