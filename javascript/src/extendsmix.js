function mixin(obj, mix){
  Object.getOwnPropertyNames(mix).forEach(function(name){
    Object.defineProperty(obj, name,
      Object.getOwnPropertyDescriptor(mix, name));
  });
}

function mix(Base, ...Objs){
  class mixObj extends Base{
    constructor(params){
      super(...params.shift());
      Objs.forEach(Obj => mixin(this, new Obj(...params.shift()))); // コンストラクタはnewしないと作れないので。
    }
  }
  Objs.forEach(Obj => mixin(mixObj.prototype, Obj.prototype));// こっちはクラスのプロパティ、メソッドをコピー
  return mixObj;
}

class ObjD{
  constructor(val){
    this.d = val;
  }
  method4 () { console.log(this.d); }
}

class ObjC{
  constructor(val){
    this.c = val;
  }
  method3 () { console.log(this.c); }
}

class ObjB{
  constructor(val){
    this.b = val;
  }
  method2 () { console.log(this.b); }
}

class ObjA extends mix(ObjB, ObjC, ObjD) {
  constructor(val, ...params) {
    super(params);
    this.a = val;
  }

  method1 () { console.log(this.a); }
}

var obj_a1 = new ObjA(1,[2],[3],[4]);

obj_a1.method1();
obj_a1.method2();
obj_a1.method3();
obj_a1.method4();

console.log(obj_a1 instanceof ObjA);// 元なのでtrue
console.log(obj_a1 instanceof ObjB);// 継承しているはずなのでtrue
console.log(obj_a1 instanceof ObjC);// mixinなのでfalse
console.log(obj_a1 instanceof ObjD);// mixinなのでfalse
