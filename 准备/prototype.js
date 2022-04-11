class Animal{
    constructor(age,name){
        this.age = age
        this.name = name
    }
}
Object.prototype.sing = function(){
    console.log('123')
}
class Dog extends Animal{
}
let hsq = new Dog()
hsq.sing()