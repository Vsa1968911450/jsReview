class Vue{
  constructor(options){
    this.$data = options.data
    this.el = options.el
    //console.log(this.el)
    //console.log(this)
    // 调用数据劫持的方法
    Observe(this.$data)
    //属性代理 通过this可以访问到属性
    Object.keys(this.$data).forEach(key=>{
      Object.defineProperty(this,key,{
        enumerable:true,
        configurable:true,
        get(){
          return this.$data[key]
        },
        set(val){
          this.$data[key] = val
        }
      })
    })
    Compile(this.el,this)
  }
}
function Observe(obj){
  if(typeof obj !== 'object' || obj ===null) return
  const dep = new Dep()
  Object.keys(obj).forEach(key=>{
    let value = obj[key]
    Observe(value)
    Object.defineProperty(obj,key,{
      enumerable:true,
      configurable:true,
      get(){ // 下面watcher触发函数会通过object.defineProperty进行数据劫持 比如取值 我们可以在后面进行收集依赖
        Dep.target && dep.addsub(Dep.target) // new watcher的实例就放到dep里面 Dep.target指向new watcher的实例
        return value
      },
      set(val){
        value = val
        Observe(value)
        // get里面获取到了新值 这个时候需要告诉dep 要通知dom去更新
        dep.notify()
      }
    })
  })
}
// 重绘 内容变 重排 位置变
function Compile(el,vm){
  vm.$el = document.querySelector(el) //获取id为app的第一个元素
  //console.log(document.querySelector(el))
  const fragment = document.createDocumentFragment()
  while(childNode = vm.$el.firstChild){
    fragment.appendChild(childNode)  //所有子节点放到文档碎片中
  }
  // 进行模板编译
  replace(fragment)
  vm.$el.appendChild(fragment) // 再放回vm的$el上
  function replace(node){
    const regMustache = /\{\{\s*(\S+)\s*\}\}/  // 匹配差值表达式的正则
    // nodetype 表示节点类型 1 元素 2 属性 3 文本内容
    if(node.nodeType === 3){ // 文本节点
      //console.log(node.textContent) // 里面所有的节点内容
      const text = node.textContent
      const execRes = regMustache.exec(text)
      //console.log(execRes)
      if(execRes){
       const value = execRes[1].split('.').reduce((newO,K)=>newO[K],vm) // 获取值
       //console.log(value)
       node.textContent = text.replace(regMustache,value) // 匹配更新数据 这一步之后创建watcher实例 因为这一步进行数据变化了
       new Watcher(vm,execRes[1],(newval)=>{
        node.textContent = text.replace(regMustache,newval) //调用回调函数 去更新
       })
      }
      return 
    }
    if(node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT'){
      const attrs = Array.from(node.attributes)
      const findRes = attrs.find((x)=>{
        return x.name === 'v-model'// 找到v-model的内容
      }) 
      if(findRes) {
        const expStr = findRes.value // v-model的值
        //console.log(expStr) // 对应属性的key
        let inputValues = expStr.split('.').reduce((newO,k)=>newO[k],vm)
        //console.log(inputValues) // 找出对应属性的value
        node.value = inputValues
        new Watcher(vm,expStr,(newVal)=>{
          node.value = newVal
        })
        // 监听文本框 拿到最新的值 
        node.addEventListener('input',(e)=>{
          const keyArr = expStr.split('.')
          const obj = keyArr.slice(0, keyArr.length - 1).reduce((newObj, k) => newObj[k], vm)
          const leafKey = keyArr[keyArr.length - 1]
          obj[leafKey] = e.target.value
        })
      }
    }
    node.childNodes.forEach(child=>{ 
      return replace(child) // 递归循环 必须有结束条件
    })
  }
}

class Dep{
  constructor(){
    this.subs = [] //存放依赖
  }
  addsub(watcher){
    this.subs.push(watcher)
  }
  // 通知每个watcher
  notify(){
    this.subs.forEach(watcher=>watcher.update())
  }
}
class Watcher{
  constructor(vm,key,cb){ // 回调函数 和 vm数据都在vm上 key更新文本所需要的key 告诉你那个值需要更新
    this.cb = cb
    this.vm = vm
    this.key = key
    Dep.target = this // 指向new watcher的实例
    key.split('.').reduce((newO,key)=>newO[key],vm) // 这个时候就可以拿到值 用reduce
    Dep.target = null
  }
  update(){
    let newVal = this.key.split('.').reduce((newO,key)=>newO[key],vm)
    this.cb(newVal)
  }
}