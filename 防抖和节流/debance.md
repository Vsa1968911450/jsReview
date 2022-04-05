防抖就是将多次操作变成一次 只允许一次操作
function debance(fn,delay){
    let timer = null
    retrun function (){
        if(timer) cleatTimerOut(timer)
        timer = settimeout(fn,delay)
    }
}
节流控制操作次数 比较耗性能的操作减少
function thorrote(fn,delay){
    let timer = null
    return function(){
        if(!timer){
           timer = settimeout(()=>{
               fn()
               timer = null
           },delay)
        }
    }
}