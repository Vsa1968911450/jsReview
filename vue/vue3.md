创建vue3项目
vue create projectName  基于webpack的项目 编译慢
解决 使用vite构建
vite优势 在开发过程中 大大提升效率

vite + vue3  默认vue3
npm init @vitejs/app projectName



v-if 和 v-for的优先级


2.x v-for > v-if
3.x v-if > v-for


vue3 新增setup 组合式api

object.defineProperty  
必须遍历对象的每一个属性


ref和reactive
ref 定义数据 简单类型
reactive 定义数据  复杂类型


proxy 不需要遍历


生命周期  选项式 api

先执行setup 后执行data

插件  setup  unplugin-auto-import
解决场景：在组建开发中无需每次都引入 


torefs 解构


vuex 和 pinia区别
1 支持选项式api和组合式api的写法
2 pinia没有mutation只有state getters actions
3 pinia分模块不需要modules之前vuex分模块需要modules
4 ts支持
5 自动化代码拆分
6 pinia体积小 性能好


pinia使用
state
getters
actions

yarn add pinia
npm install pinia

npm i pinia-plugin-persist --save  持久化插件  // 默认sessionstorage