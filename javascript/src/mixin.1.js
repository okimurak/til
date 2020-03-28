function mixin(obj,mix){
  for (var prop in mix){
    if(mix.hasOwnProperty(prop)){
      obj[prop] = mix[prop];
    }
  }
}

function ObjA(val){
  ObjB.call(this,val);
  this.a = val;
}

ObjA.prototype.method1 = function(){console.log(this.a);};

function ObjB(val){
  this.b = val;
}
ObjB.prototype.method2 = function(){console.log(this.b);};

mixin(ObjA.prototype,ObjB.prototype);

var obj_a1 = new ObjA(1);
var obj_a2 = new ObjA(2);

obj_a1.method1();
obj_a1.method2();
obj_a2.method1();
obj_a2.method2();
