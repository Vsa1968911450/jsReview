let arr = [1,2,3]
console.log(Object.prototype.toString.call(arr))
debugger
console.log(Array.prototype.isPrototypeOf(arr))
console.log(arr.constructor.toString())


// 判断数组五种
// 1 Array.isArray()
// 2 Object.prototype.toString.call(arr) obj的原型
// 3 Array.prototype.isPrototypeOf(arr) isprotoOF
// 4 arr.constructor.toString()
// let arrs = [1,[2,3],[4,6]]
// console.log(arr.join(',').split(','))