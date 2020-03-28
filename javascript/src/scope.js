const b = 'b';

{
  let a = 'a';
  const b = 'p';
  var c = 'c';
  console.log(a);
  console.log(b);
}

//console.log(a);
console.log(b);
console.log(c);
console.time('timer');
console.timeEnd('timer');