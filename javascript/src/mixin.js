// mix in function
function mixin(obj, mix) {
  for(var prop in mix){
    obj[prop] = mix[prop];
  }
}

var obj1 = {a:1};
var mix1 = {b:2, method1: function(){ console.log(this.a);}};

mixin(obj1,mix1);

console.log(obj1.b);
obj1.method1();

function ObjA (val){
  this.a = val;
}

var MixA = {method1 :function(){ console.log(this.a);}};

mixin(ObjA.prototype, MixA);

var obja = new ObjA(1);
var objb = new ObjA(2);

obja.method1();
objb.method1();
