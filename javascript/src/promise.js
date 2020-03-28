// 1秒後に表示するが、非同期のため一斉に表示
/*
setTimeout(() => console.log(1), 1000);
setTimeout(() => console.log(2), 1000);
setTimeout(() => console.log(3), 1000);
*/

// callbackを使う。1秒毎に表示される。
// ただしネスト地獄で可読性が悪い。setTimeoutを呼び出すたびにネスト増える
/*
setTimeout(() => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    setTimeout(() => {
      console.log(3);
    },1000);
  }, 1000);
}, 1000);
*/

// Promiseを生成する、callback
function setTimeoutAsync(time, occurError = false) {
  return new Promise((resolve, reject) => {
    if(occurError) {
      reject(new Error('Error!!!!!!!'));
    } else {
      setTimeout(() => {
        resolve(`${time}ミリ秒経過したどんどこどん`); // 処理部分。
      }, time);
    }
  });
}

// Promiseを使う。チェインで書くことができ、ネストが減って可読性が上がる
/*setTimeoutAsync(1000).then(() => {
  console.log(1);
  return setTimeoutAsync(1000);
}).then(() =>{
  console.log(2);
  return setTimeoutAsync(1000);
}).then(() => {
  console.log(3);
})
*/

setTimeoutAsync(1000).then((text) => {
  console.log(text);
  return `次のthenを実行`;
}).then((text) => {
  console.log(text);
  return setTimeoutAsync(1500);
}).then((text) =>{
  console.log(text);
  return setTimeoutAsync(2000, true);// catchが呼ばれる
}).then((text) =>{
  console.log('catchが飛ぶので、ここは実行されないはず');
}).catch((err) => {
  console.log(err.message);
});
