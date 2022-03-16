// 下次的初始值 为上个的return的值 比如累加
let arr = [1,2,3,4,5,67]
//累加
let total = 0
arr.forEach(item=>{
  total += item
})
// reduce 循环当前数组
//fn 是上次循环的结果
// const totals = arr.reduce((val,item)=>{return val + item},0)
function getsum(totals,num){
  return totals + num
}
// let sum = arr.reduce(function (prev, cur) {
//   return prev + cur;
// },0);
let sum =arr.reduce(getsum,0)
console.log(sum)




// 链式获取属性的值
let obj ={
  name:'zs',
  info:{
    address:{
      location:'123'
    }
  }
}
// obj.info.address.location
// reduce
const attrs = ['info','address','location']
const s= attrs.reduce(getLocation,obj)
function getLocation(newO,K){
  return newO[K]
}
console.log(s)

const str = 'info.address.location'
let news =str.split('.').reduce((newO,key)=>{return newO[key]},obj)
console.log(news)

// //有问题的简单深克隆 没有判断array类型 因为typeof array也是object
// let cloneOBJ = {}
// function getChildren(object,cloneOBJ){
//   cloneOBJ = cloneOBJ || {}
//   for(let key in object){
//     if(typeof object[key] === 'object' && object[key] !==null){ // 因为typeof null 也是object
//       console.log('我是对象我还能递归')
//       cloneOBJ[key] = {}
//       getChildren(object[key],cloneOBJ[key])
//     } else {
//       console.log('哈哈哈哈我输出了');
//       cloneOBJ[key] = object[key]
//       // console.log(object[key])
//       // return object[key]
//     }
//   }
//   return cloneOBJ
// }

// let clonedeeep = getChildren(obj)
// console.log(clonedeeep)
