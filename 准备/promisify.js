function promisify(func){  // 转为同步操作  函数链式调用
    return function(...args){
        return new Promise((resolve,reject)=>{
           args.push(function(err,data){
            if(err){
                reject(err)
            }
            resolve(data)
           })
           func.apply(null,args)
        })
    }
}


let add = (a,b, callback) => {
    let result = a+b;
    if(typeof result === 'number') {
        callback(null,result)
    }else {
        callback("请输入正确数字")
    }
}

const addCall = promisify(add);
addCall(2,6).then((res) => {
    console.log(res);
})