function shared_calc_area() {
  console.log(this.width * this.height);
}

var obj1 = {width : 10, height: 5, method : shared_calc_area};
var obj2 = {width : 20, height: 50, method : shared_calc_area};

shared_calc_area.call(obj1);
shared_calc_area.apply(obj1);

var bind2 = shared_calc_area.bind(obj2);

bind2();

