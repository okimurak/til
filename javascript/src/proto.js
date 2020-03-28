var obj1 = {a : 1}
var obj2 = {b : 3}
Object.setPrototypeOf(obj1,obj2);

console.log(obj1.a);
console.log(obj1.b);
console.log(obj1.toString);
console.log(obj1.c);
