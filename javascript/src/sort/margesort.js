'use strict';

function margeSort(array){

  if( array.length < 2 ){ return array; }
  const middle = Math.floor(array.length / 2.0);
  let left  = array.slice(0, middle);
  let right = array.slice(middle);

  return marge(margeSort(left), margeSort(right));

  // 配列をソートしながら一つに統合する
  function marge(left, right){
    let result = [];
    let leftIndex  = 0;
    let rightIndex = 0;

    while(leftIndex < left.length && rightIndex < right.length){
      if(left[leftIndex] < right[rightIndex]){
        result.push(left[leftIndex++]);
      }else{
        result.push(right[rightIndex++]);
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
}

module.exports = margeSort;