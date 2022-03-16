vue的发布订阅者模式
dep类 容器 收集依赖  一个数组存放订阅信息 
watcher 观察是否数据发生变化
dom元素 也就是数据 订阅者 为什么是订阅者 当vue发现数据变化 根据这些数据渲染dom
页面重新渲染 赋值的时候就调用dep的notify告诉他们去更新 根据dom去渲染最新的数据结构


object.defineProperty(obj,key,{})