优先级问题  vue2 v-for 优先于 v-if  可以看渲染函数 是先循环 在判断  所以v-for 优先于 v-if 
解决方案 v-if和v-for不同级   vm.$option.render


data不能是 对象 必须是function 因为函数有自己的定义域  如果不是函数 就会污染参数
vue组件要是函数 可能有多个 function防止参数污染 根实例不需要是 因为根实例只有一个



key的作用 工作原理
一个key对应一个vue 按照key去进行数据劫持 进行diff算法 key和节点名称想同 才是认为想同节点

高效更新虚拟dom patch函数讲vnonde挂载到node上 进行diff算法比较 避免每次都暴力删除 插入 提高效率
 v-for的key 不能使用indexx 使用其他 比如有删除的时候 index发生变化就会重新渲染节点 提高性能



 怎么看diff算法
 diff算法 深度优先 同层比较
 新前旧前
 新后旧后
 新后旧前
 新前旧后
 然后进行循环 插入到最前面

 时间复杂度为O（n）
 每个对象都有一个watcher 一旦数据发生变化 会导致节点更新
 节点更新会对比 旧节点和新节点
 diff算法遵循深度优先 同层比较的策略 进行新前旧前 新后旧后
 新后旧前 新后旧后四次比较 如果都没有命中就循环旧节点拿到和新前指针指到的内容 进行插入


 vue组件化  组件化优点 从生命周期去看 
  是vue核心特点 是独立和可以复用的组织单元 便于测试 分为页面组件 业务组件 通用组件
  合理的功能切割 提升应用性能 高内聚 低耦合 单向数据流
  组件化技术 父子 兄弟传参等
  三要素 
  prop 传参
  slot 插槽
  自定义事件

  设计思想 
  独立可复用 只会渲染那个数据变化的组件 不会渲染其他组件
  高内聚 功能独立  每个组件都去完成对应的事情
  低耦合 减少模块之间的联系


  vue设计原则
  特点 
  渐进式的js框架：vue是从底向上的逐层应用 关注视图层 
  易用 数据提供响应式 有html css js基础就可以使用
  灵活 可以根据需要导入路由等内容去管理项目
  高效  diff算法  vue3 双向绑定使用proxy数据响应式 也能更加高效


mvvm 和 mvc
mvc 后端前端代码都粘在一起 代码比较复杂  前端页面效率不高 前后端职责不清
Model:负责保存数据
controller:业务逻辑
view：视图展示

mvvm 出现ajax之后 前后端就分离 前端进行数据交互 后端给数据 效率变高了


解决 model 和 view的耦合问题 
代码分层 mvc 数据流混乱
mvp persenter 作为中间层负责通信 但是容易臃肿
mvvm dom操作（diff） 提高开发效率 可读性变高


vue性能
1 路由懒加载  （按需加载）
2 keep-alive （缓存） 控制缓存
3 v-show复用dom
4 v-for遍历避免同时使用v-if 计算属性可以进行过滤 代替v-if
5 如果纯粹是数据展示 就不需要做响应式object.freeze数据冻结 或者 obj.defineproperty configurable变成false不可变
6 图片懒加载
7 第三方插件 比如el-ui 按需引入 
8 组件使用方式 展示组件可以标记为函数式组件 <template functional><template>
9 子组件分割
10 频繁使用计算属性会导致性能降低 可以变成一个变量
11 ssr 


vue3 新特性
更快 

1 虚拟dom重写 编译会有更多报错 增加了元素节点判断 比如子元素判断 是否有 有多少个 有没有key等之类的都有参数去判断
2 优化slots 减少不必要的渲染
3 静态树 静态属性的提升
4 数据绑定proxy  兼容性变差了 ie11不兼容

更小 
1 通过tree shaking去优化核心库 代码打包会更小

更容易维护
1 ts+模块化  代码检测 错误检测

更加友好
1 运行编译器核心与平台无关 

容易使用
1 ts报错
2 调试
3 响应式更快



vue项目优化 
1 代码
路由懒加载
图片懒加载
第三方插件按需引入
v-if 和 v-show 使用
v-for遍历不使用index 使用唯一的key 如果进行删除 index会变化要重新渲染

2 webpack优化
webpack对图片进行压缩
提取公共代码  js css进行提取
模板预编译
字体文件压缩

3 web
gzip压缩
浏览器缓存  避免重新加载数据
cdn使用 



vue模板编译
 将template转化为render函数的过程
 第一步 模板字符串转换成ast虚拟树
 第二步 对ast进行静态节点标记 用来渲染虚拟dom
 第三部 生成render函数（h函数）

 vue.extends
 使用vue构造器 创建一个子类

<div id="mount-point"></div>
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')

使用：从接口动态渲染组件 

nextick
nextick中的回调实在下次dom更新循环结束之后执行的延迟回调 修改数据之后立即使用这个方法 获取更新后的dom


diff算法 最小量更新 key看是否是同一节点 key sel（同层比较） vue3 还加了 判断  v-for要有key 没有key没次都是暴力删除再添加新的 消耗性能
新前旧前 新后旧后  新后旧前 新前旧后 没有就循环 有了 就++

组件调用顺序 先父后子 组件渲染完成是先子后父
组建销毁操作 先父后子 销毁完成的顺序是先子后父


加载渲染过程
父 beforecreate -> 父 created -> 父 beforeMount > 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 Mounted  -> 父 mounted

自组件更新
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

销毁过程 
父 beforedestroy -> 子 beforedestroy -> 子 detroyed -> 父 destroyed

自定义指令 原理是什么
指令的本质是装饰器 给html添加自定义功能

自定义指令有五个生命周期
bind 只调用一次 指令第一次绑定元素时调用 这个钩子函数可以定义绑定时执行一次的初始化动作
inserted 被绑元素插入父节点
update 被绑元素锁在模板更新时调用
componentUpdated 模板完成一次更新周期时调用
unbind   解除绑定

定义自定义指令
vue.directive(指令名,{bind:function(el,binding){}})

原理 
生成ast语法树 添加directives属性
通过genDirectives生成指令代码
patch前将指令的钩子提取到回调函数中，在patch里面写下相应的钩子
知悉对应指令调用该语法



computed 和 watch
watch     是监听里面数据发生变化才响应 一对多 可以不用return   immediate第一次加载
computed  必须return 是计算某一个属性的变化 如果一个值改变了 才会去返回  多对一


computed和methods
computed 有缓存 多次调用时计算属性只会调用一次
methods  没有缓存 调用方法几次就执行几次


created 和mounted
created 在模板渲染成html前调用
mounted 渲染成html时候调用


eventBus 和 vuex
eventBus适合少量数据 数据不同步
vuex 数据量大 数据同步

生命周期
beforecreate  创建vue示例之前的钩子函数
created 实例创建完成之后的钩子函数
beforemount 开始挂载编译
mounted 页面加载完成 
beforeupdate 试试监控数据变化
updated 页面和data保持同步
beforeDestory vue实例方法都还可以使用 马上进入销毁
destored  组件销毁 方法不可用

nexttick
类似于一个settimeout为0 判断promise是否存在 如果存在就是微任务

数据更新只会调用一次


