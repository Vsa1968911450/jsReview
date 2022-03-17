function func(){
  console.log('aa')
  console.log(this)
}

let cat = {
  name :'喵喵'
}
let dog = {
  name :'11',
  eat(food1,food2){
    console.log(this.name +'喜欢吃' + food1 + food2)
  }
}
func.call(cat) // call可以调用函数  改变this指向
//dog.eat.call(cat,'鱼','肉') // call直接加
//dog.eat.apply(cat,['鱼','肉']) //apply数组
let c = dog.eat.bind(cat,'鱼','肉') // bind不会立即调用 
c()