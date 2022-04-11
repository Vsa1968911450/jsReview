function fn(str){
    console.log(str)
}
function fnOne(str){
    return function(){
        fn(str)
    }
}
setTimeout(fnOne('123'),1000)

function delayTime(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('success')
        },time)
    })
}
await delayTime(1000)

// function fn(str){
//     console.log(fn)
// }
// function fn2(str){
//     return function(){
//         fn(str)
//     }
// }
// setTimeout(fn2('12121'),1000)

function delayPromise(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('success')
        },time)
    })
}
await delayPromise(1000)