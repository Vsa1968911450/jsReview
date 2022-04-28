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
// 数组 for forEach map for in for of
//遍历对象 
// for in 
// object.keys()
// object.getownpropertyNames()
// relect.ownkeys()


// 类数组 转成 数组 
// 1 Array.from
// 2 扩展运算符 浅拷贝
// 3 数组的slice方法 返回新的数组 不改变原数组
Array.prototype.myslice = function(start,end){
    let res = new Array()
    start = start || 0
    end = end || this.length
    for(i=start;i<end;i++){
        res.push(this[i])
    }
    return res // 返回一个数组
}