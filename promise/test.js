// index文件原生promise promise.js进行 自定义Promise test文件进行测试
const Promise = require('./promise')
 new Promise((resolve,reject)=>{
  //  console.log('开始了123')
  //  throw new Error('1212')
  // setTimeout(()=>{ // 异步
  //   resolve(2)
  // })
   resolve(1)
 })
 .then(val=>{
   return 'haha'
 },reason=>{
   console.log('reason' + reason)
 })
 .then(val=>{
  return 'lala'
},reason=>{
  console.log('reason' + reason)
})
.then(val=>{
  return 'dd'
},reason=>{
  console.log('reason' + reason)
})