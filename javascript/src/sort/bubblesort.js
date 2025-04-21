'use strict';

function bubbleSort(array) {
  const result = Array.from(array);
  for(let e = result.length - 1; e > 0; e--){
    for(let i = 0; i < e; i++){
      if(result[i] > result[i + 1]){
        [result[i], result[i+1]] = [result[i+1], result[i]];
      }
    }
  }
  return result;
}

module.exports = bubbleSort;
