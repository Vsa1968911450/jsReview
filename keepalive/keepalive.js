// KEEPALIVE 组件缓存  避免组件内的数据重复渲染直接可以在页面中使用  离开的时候存放url 跳转回a再取出url跳转
//原理 有两个生命周期 actived和deactived
// 激活事件 actived 和 deactived  beforerouterleave enter