const obj = {
  name :'zs',
  age:20
}
Object.defineProperty(obj,'name',{
  enumerable:true, // 可枚举
  configurable:true,// 可修改
  //writable:true, //可写
  get(){
    console.log('111')
  },
  set(val){

  }
})
console.log(obj.name)