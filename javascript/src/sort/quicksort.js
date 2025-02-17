'use strict';

function quickSort(array, start = 0, end = array.length - 1){
// クイックソート
  if(end <= start){
    return;
  }

  const pivot = selectPivot(array, start, end);

  let left  = start;
  let right = end;
  while(true){
    while(array[left]  < pivot) { left++; }
    while(array[right] > pivot) { right--; }
    if(left >= right) { break; } // leftとrightが逆転 = 探索終了
    [array[left], array[right]] = [array[right], array[left]];
    left++;
    right--;
  }

  // 前半後半で、再起処理
  quickSort(array, start, left - 1);
  quickSort(array, right + 1, end);

    // ピボットを選ぶ
  function selectPivot(array, start , end){
    // 配列の先頭、中央、末尾の中央値をピボットとする。
    const [x, y, z]  = [ array[start],
                         array[Math.floor((start + end) / 2.0)],
                         array[end] ];
    if(x > y){
      return y < z ? y :
             z < x ? x : z;
    } else {
      return z < y ? y :
             x < z ? x : z;
    }
  }
}

module.exports = quickSort;
