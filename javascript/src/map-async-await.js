// Array を Array.map で async await を使って非同期処理をする例
// 参考 : JavaScriptの配列のmapでasync/awaitを使う方法 - Qiita https://qiita.com/kwbt/items/6c0fe424c89a9f7553c1

function funcPromise(value) {
  return new Promise((resolve, reject)=>{
    if(value) {
      resolve("OK");
    } else {
      reject("ERROR");
    }
  });
}

(async() => {
  const array = [1, 2, 3];

  const result = await Promise.all(
    array.map((v) => {
      return funcPromise(true);
  }));

  // async (v) => {
  //   const dummy = await funcPromise(true);
  //   return dummy;
  // }
  // 上記は funcPromise で返した Promise から await で結果を取得した後
  // さらに async で Promise にすることになるため冗長。よって不要。
  console.log(result); // [ 'OK', 'OK', 'OK' ]
})();
