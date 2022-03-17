// new关键字做了什么 创建一个对象 this指向新对象
// 构造函数用来创造对象
// function Fn(){
//  // console.log(this) //this指向构造的对象
//   // setTimeout(()=>{
//   //   console.log(this)
//   // })
  
// }
// let f = new Fn()

let cat = {
  say(){
    // setTimeout(()=>{
    //   console.log(this) //
    // })
    setTimeout(function(){
      console.log(this) // window
    },100)
  }
}
cat.say()