// new关键字做了什么 创建一个对象 this指向新对象
// 构造函数用来创造对象
// function Fn(){
//  // console.log(this) //this指向构造的对象
//   // setTimeout(()=>{
//   //   console.log(this)
//   // })
  
// }
// let f = new Fn()

// let cat = {
//   say(){
//     setTimeout(()=>{
//       console.log(this) // cat对象
//     })
//     // setTimeout(function(){
//     //   console.log(this) // window
//     // },100)
//   }
// }
// cat.say()

window.id = 0;
// 声明一个函数fn
const fn = {
  id: 1,
  say: function() {
    console.log('id:', this.id);
  },
  sayArrow: () => {
    console.log('id:', this.id);
  },
  say1: function() {
    setTimeout(function() {
      console.log('id:', this.id);
    }, 1000);
  },
  say2: function() {
    let that = this;
    setTimeout(function() {
      console.log('id:', that.id);
    }, 1000);
  },
  say3: function() {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 1000);
  },
  say4: () => {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 1000);
  },
  say5: () => {
    setTimeout(function() {
      console.log('id:', this.id);
    }, 1000);
  },
};


fn.say();
fn.sayArrow();
setTimeout(fn.say, 1000);
setTimeout(fn.sayArrow, 1000);
setTimeout(() => fn.say(), 1000);
setTimeout(() => fn.sayArrow(), 1000);
fn.say1();
fn.say2();
fn.say3();
fn.say4();
fn.say5();