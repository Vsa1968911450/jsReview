// 浅拷贝  对象赋值的是引用
// 为什么需要拷贝  
// es3
let obj = {
  a:1,
  b:2
}
let cloneOBj = {}
function SimpleCopy(obj){
  for(let key in obj) { // key键名
    cloneOBj[key] = obj[key]
  }
  return cloneOBj
}
SimpleCopy(obj)
// es6 利用Object的属性  for of
// console.log(Object.keys(obj)) // key值 [ 'a', 'b' ]
// console.log(Object.entries(obj)) // 键值对[ [ 'a', 1 ], [ 'b', 2 ] ]
// console.log(Object.values(obj)) // 值 [ 1, 2 ]
// for of 是获取值 for in是遍历key
for(let key of Object.keys(obj)){ // 遍历[ 'a', 'b' ]
  cloneOBj[key] = obj[key]
}
// 使用键值对
for(let [key,value] of Object.entries(obj)){
  cloneOBj[key] = value
}
// es5 使用
let oo =Object.getOwnPropertyNames(obj)
console.log(oo) //[ 'a', 'b' ]
oo.forEach((item,key)=>{
  console.log(item,key)
  cloneOBj[key] = item
})