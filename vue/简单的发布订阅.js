class Dep{
  constructor(){
    this.subs = [] // 存放依赖
  }
  addSub(watcher){
    this.subs.push(watcher)
  }
  //通知方法
  notify(){
    this.subs.forEach(watcher=>watcher.update()) // dep收集的watcher遍历里面调用update的方法去触发函数
  }
}
class Watcher{
  constructor(cb){// 传入函数
    this.cb = cb
  }
  // 触发函数的方法 如果内容有更新就触发这个函数  更新自己
  update(cb) { 
    this.cb()
  }
}
let fwatcher = new Watcher(()=>{
  console.log('我是第一个发布订阅者')
})
let fwatcher2 = new Watcher(()=>{
  console.log('我是第二个发布订阅者')
})
const dep = new Dep()
dep.addSub(fwatcher)
dep.addSub(fwatcher2)  // 绑定了两个watcher
dep.notify() //数据发生变化时候调用 告诉数据更新了
// fwatcher.update() //只有调用update函数才会触发