// 获取页面内所有元素
document.querySelectorAll('*')  // 返回标签数组 伪数组
//伪数组变成数组
let a = [].slice.call(document.querySelectorAll('*'))