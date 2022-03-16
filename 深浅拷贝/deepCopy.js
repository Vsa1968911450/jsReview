let obj = {
  a:1,
  b:{
    c:3,
    d:{
      e:5,
      f:[1,2,3,4,5]
    }
  }
}
let arr = [20]
// let clobeObJ = {}
// 也有可能是数组
function deepClone(obj,clobeObJ){
  // 判断cloneObJ是否为空
  clobeObJ = clobeObJ || {}
  for(let key in obj) {
    if(obj[key] !== null && typeof obj[key] === 'object'){  //包函数组还需要去判断obj[key]是不是数组
      // clobeObJ[key] = {} // obj[key] 也有可能是数组 
      // if(obj[key] instanceof Array) {
      //   clobeObJ[key] = []
      // } else {
      //   clobeObJ[key] = {}
      // }
      clobeObJ[key] = obj[key] instanceof Array ?  [] :  {}
      deepClone(obj[key],clobeObJ[key])
    } else{
      clobeObJ[key] = obj[key]
    }
  }
  // console.log(clobeObJ)
  return clobeObJ
}
let obj1 = deepClone(obj)



// Json.stringfy() Json.parse()
function ESNew(obj){
  return JSON.parse(JSON.stringify(obj))  // 深拷贝
}
let objs = ESNew(obj)
console.log(objs)

// 第三种

obj.b.c = 20
obj.b.d.f.push(7)
console.log(obj1) // { a: 1, b: { c: 3, d: { e: 5 } } } 赋值后虽然obj里面内容变化 但是obj1里面内容没有改变 深拷贝就成功了
console.log(obj) //{ a: 1, b: { c: 20, d: { e: 5 } } }
//console.log(typeof arr) // object