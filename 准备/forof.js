// for of 允许遍历含有iterator接口的数据结构
// 遍历对象是类数组对象 使用Array.from 转为数组
// 不是类数组 添加iterator属性 symbol.interator 指向迭代器
// 创建一个指针对象  指针对象next指向第一个 第二次指向第二个 每一次调用next返回当前成员的信息 返回包含value和done的对象
let person = {
    name:'wdy',
    age:12,
    height:176,
    weight:180,
    sex:'男',
    length:5
}
person[Symbol.iterator] = function(){
    // 第一步拿到key 键值 values 返回所有的值  entries对象包括key value 数组
    keys = Object.keys(this)
    let index = 0
    return {
        next(){
            if(index<keys.length) {
                return {value:person[keys[index]],done:false}  // value 值 done 遍历是否结束 
            }
            return {value:undefined,done:true}
        }
    }
}
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