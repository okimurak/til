'use strict';

function measureElapseTime(func, dataNum, targetName){
  let measureTarget = `${targetName} times elapse time`;

  // ランダムな配列データを作成
  const array = [];
  for(let i = 0; i < dataNum; i++) {
    const value = Math.random();
    array.push(value);
  }
  
  console.time(measureTarget);
  func(array);
  console.timeEnd(measureTarget);
}

module.exports = measureElapseTime;