function person(name,age){
  this.name = name
  this.age = age
  console.log(this.age)
  console.log(this.name)
}
let teacher = {
  name:'wdy',
  age:26
}
Function.prototype.newCall = function(obj,...args){
  console.log(obj.fun)
  obj.fun = this // person方法 改变指向
  console.log(obj.fun)
  obj.fun(...args)
  delete obj.fun
}
person.newCall(teacher,'wdy',28)