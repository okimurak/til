function Rect (w,h) {
  this.width = w;
  this.height = h;
}
Rect.prototype.calc_area = function(){ return this.width * this.height + 230; };


function RectRotate (w,h,rot_deg) {
  Rect.call(this,w,h);
  this.rotetion = rot_deg;
}
// Override
//RectRotate.prototype.calc_area = function() { return this.width * this.height + 10;};
// call extend source method
RectRotate.prototype.calc_area = function() {
  return Object.getPrototypeOf(RectRotate.prototype).calc_area.call(this);
};


RectRotate.prototype.rotate = function(rot_deg) { this.rotation += rot_deg; };
Object.setPrototypeOf(RectRotate.prototype, Rect.prototype);

var rect = new Rect(20,20);
var rotate = new RectRotate(10, 10, 5);

console.log(rect);
console.log(rect.calc_area())

console.log(rotate);
console.log(rotate.calc_area());