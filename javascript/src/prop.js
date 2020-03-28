var obj = {a:1, b:10, c:2};
var super_proto = {super: "super"};

Object.setPrototypeOf(obj, super_proto);
Object.defineProperty(super_proto, "d", {value : 12, writable: false});

console.log(obj.d);
obj.d = 20;
console.log(obj.d);
