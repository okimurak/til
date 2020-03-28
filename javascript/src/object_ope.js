var obj1 = {a:50,b:60};
var obj2 = {"test": 60, 0x15: 5, ab : "c"};

console.table(obj1);
console.table(obj2);
console.log("obj2 : test = " +  obj2["test"]);
console.log("obj2 : 0x1f = " +  obj2[21]);
console.log("obj2 : ab = " +  obj2.ab);