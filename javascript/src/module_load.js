var ModuleA = {
  func_a1 : function(){console.log("a1");}
}

var ModuleB = {
  func_b1 : function(){console.log("b1");}
}

var ModuleC = {
  func_c1 : function(){console.log("c1");}
}

var Namespace = Object.create(null);

var [require, unrequire] = (function() {
  // モジュール参照時の衝突防止用Symbol
  var module_symbol = Symbol();

  // require:モジュールを名前空間にロード
  function require(Namespace, ...modules) {
    modules.forEach(function(module) {
      pushPrototypeOf(Namespace,module);
    });
  }
  
  // unrequire:モジュールを名前空間からアンロード
  function unrequire(Namespace, ...modules) {
    modules.forEach(function(module) {removePrototypeOf(Namespace,module);});
  }
  
  // プロトタイプチェーンに追加
  function pushPrototypeOf(obj, proto){
    var newObj = Object.create(null);
    Object.assign(newObj, proto);
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj));
    Object.setPrototypeOf(obj, newObj);
    newObj[module_symbol] = proto;
  }
  
  // プロトタイプチェーンから削除
  function removePrototypeOf(obj, rem) {
    var proto = Object.getPrototypeOf(obj);
    if(proto === null){
      return;
    }
  
    if(proto[module_symbol] === rem){
      Object.setPrototypeOf(obj, Object.getPrototypeOf(proto));
      return;
    }
    removePrototypeOf(proto,rem);
  }

  return [require, unrequire];
}());




require(Namespace, ModuleA, ModuleB, ModuleC);

Namespace.func_a1();
Namespace.func_b1();
Namespace.func_c1();

unrequire(Namespace, ModuleB);

Namespace.func_a1();
//Namespace.func_b1();
Namespace.func_c1();

//ModuleC.func_a1();

var Namespace2 = Object.create(null);
require(Namespace2,ModuleC);

Namespace2.func_c1();
Namespace.func_a1();
Namespace.func_c1();
