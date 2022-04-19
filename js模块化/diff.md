conmonjs amd  cmd  umd  es6等
commonjs  moudle.exports 出去 require导入
amd  异步模块加载 异步加载方式 加载不影响代码执行  amd支持cmd写法
cmd  使用就近依赖 按需加载 
umd  通用模块 
es6  import导入 export 导出

区别 
1commonjs 输出 值的拷贝 模块内部不会影响值
 es6 值的引用 模块内的值会变化
2 commonjs是运行才会加载 es6 模块不是对象 对外接口是个定义 在代码静态解析就会生成