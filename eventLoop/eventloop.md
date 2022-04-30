1 解析html 构建dom树
2 构建render树
3 布局render树
4 绘制render树



重绘 以及 重排

动态修改dom


重绘 页面一部分修改 不改变定位  背景 边框
重排 修改定位 文档内容 结构 定位 dom操作增删改form表单 css属性等

position为absolute和fixed重排只涉及自己的子孙原速度 读取一些el属性的时候会重新计算并且重排 

js引擎 v8
内存 堆 栈 压栈
js单线程 一次只做一件事情


eventloop事件循环 
1 首先进入任务队列 任务队列为空 就进入微任务的执行队列  最后进入宏任务任务队列
2 执行任务 
3 任务队列为空 
4 将已经运行完成的任务从任务队列删除
5 更新页面
然后重复循环


node的事件循环 有六个阶段
timers 执行settimeout 和 setinterval中到期的callback
pending callbacks  上一轮循环中少数的callbacks会放在这一阶段执行
idle prepare 只在内部使用
poll 执行pending callbacks 适当情况下阻塞
check 执行setimmediate中的回调
close callbacks 执行close事件的callbacks


宏任务

settimeout
setinterval
i/o
ui交互时间
postmessage
messagechannel
setimmediate

微任务
promise.then
object.observe
process.nexttick
宏任务与微任务的区别可以理解为，微任务是可以插队的，所以宏任务执行前会先看一下有没有微任务插队，如果有微任务要插队的话，那就让微任务先执行，如果没有微任务要插队的话，那就执行宏任务，然后下一个宏任务执行前也会看一下有没有要插队的微任务

node和浏览器eventloop区别
浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。