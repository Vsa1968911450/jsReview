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