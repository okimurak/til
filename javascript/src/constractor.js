function Myobj () {}

class Myclass {
  method(){}
}

var myobj1 = new Myobj();
var myclass = new Myclass();

console.log(myobj1.constructor.name);
console.log(myclass.constructor.name);

console.log(Object.getPrototypeOf(myobj1));
console.log(Object.getPrototypeOf(myclass));
