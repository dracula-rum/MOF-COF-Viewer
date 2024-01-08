console.log('script start')  // 同步
async1()
async function async1() {
  await async2()
  console.log('async1 end') // 异步
}
async function async2() {
  console.log('async2 end') // 同步
}


setTimeout(function() {
  console.log('setTimeout') // 宏任务 
}, 0)

new Promise(resolve => {
  console.log('Promise') // 同步
  resolve()
})
.then(function() {
  console.log('promise1') // 异步
})
.then(function() {
  console.log('promise2') // 异步
})

console.log('script end') // 同步


// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout
