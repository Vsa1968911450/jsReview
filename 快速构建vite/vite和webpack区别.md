vite 开发环境不需要打包操作 快速启动
轻量快速热重载
真正的按需编译


webpack是从entry开始加载 等到所有模块加载完毕 在bundle 最后启动
vite流程是启动服务器 以懒加载的方式进行处理模块 需要就进行加载


webpack动态加载 加载模块的引用类似于require  转换成_webpack_require
import('./'+filename).then(moudle=>{

}).catch(err=>{

})