//同步异步 同步代码实在栈 异步是任务队列  
// 同步
// nextTick
// 异步
// setimmediate  当前事件循环结束后执行

// 宏任务 计时器 ajax 读取文件
// 微任务 Promise.then
// 1 同步
// 2 nexttick
// 3 微任务
// 4 宏任务
// 5 setimmediate

//promise async
async function func(){
  return 1  // 返回是promise对象 func()就是promise对象
}
func().then((data)=>{
  console.log(data)  // 1
})
let p = new Promise((resolve,reject)=>{
  // console.log(aa)
  resolve(1) // 调用resolve才会调用then
})
p.then(()=>{

})


let p1 = new Promise((resolve,reject)=>{
  resolve(1)
})

let p2 = new Promise((resolve,reject)=>{
  resolve(2)
})
async function funPro(){
  let a = await p1
  let b = await p2
  console.log(a)
  console.log(b)
}
funPro()