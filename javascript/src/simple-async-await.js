// Promise よりもネストが浅くなり、キレイに書ける

function timer2Seconds() {
  return new Promise(resolve =>{
    setTimeout(()=> {
      resolve('resolved');
    },2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await timer2Seconds();
  console.log(result);
}

asyncCall();
