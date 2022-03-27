class Animal{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    say(){
        console.log(this.name + '讲话')
    }
}
class Cat extends Animal{
    constructor(name,age){
        super()
        this.name = name 
        this.age = age
    }
}
let buou = new Cat('布偶',18)
buou.say()
