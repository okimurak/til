var circle = (function() {
  var _r = 5;
  return {
    get r() { return _r;},
    set r(val) {
      if(val < 0){
        throw new Error("r is negative number");
      }
      _r = val;
    }
    ,
    get area() { return this.r * this.r * Math.PI;},
    set area(val) { 
      if(val < 0){
        throw new Error("Area is negative number");
      }
      this.r = Math.sqrt(val / Math.PI);}
    };
})();

console.log(circle.area);
circle.r = 10;
console.log(circle.r);
circle.r = -1;
console.log(circle.r);