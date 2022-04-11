class Promise{
    constructor(executor){
        if(typeof executor !== 'function'){
					throw new Error(`${executor} is not a function`)
        }
        this.initValue()
        this.initBind()
        try{
            executor(this.resolve,this.reject)
        }catch(e){
            this.reject(e)
        }
    }
    resolve(value){
        if(this.state === Promise.PENDING){
            this.value = value
            this.state = Promise.FULLFILLED
            this.onFulfilledCallBacks.forEach(fn=>fn(this.value))
        }
    }
    reject(reason){
        if(this.state === Promise.PENDING){
            this.reason = reason
            this.state = Promise.REJECTED
            this.onRejectedCallbacks.forEach(fn=>fn(this.reason))
        } 
    }
    initValue(){
        this.state = Promise.PENDING
        this.value = null
        this.reason = null
        this.onFulfilledCallBacks = []
        this.onRejectedCallbacks = []
    }
    initBind(){
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }
    then(onFulfilled,onRejected){
        if(typeof onFulfilled !== 'function'){
            onFulfilled = function(value){
                return value
            }
        }
        if(typeof onRejected !== 'function'){
            onRejected = function(reason){
                return reason
            }
        }
        let promise2 = new Promise((resolve,reject)=>{
            if(this.state === Promise.FULFILLED){
                setTimeout(()=>{
                    try{
                        const x = onFulfilled(this.value)
                        Promise.resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.state === Promise.REJECTED){
                setTimeout(()=>{
                    try{
                        const x = onRejected(this.reason)
                        Promise.resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.state === Promise.PENDING){
                this.onFulfilledCallBacks.push((value)=>{
                    setTimeout(()=>{
                        try{
                            const x = onFulfilled(value)
                            Promise.resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallBacks.push((reason)=>{
                    setTimeout(()=>{
                        try{
                            const x = onRejected(this.reason)
                            Promise.resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
				return Promise2
    }
}
Promise.PENDING = 'pending'
Promise.FULLFILLED = 'fullfilled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise = function(promise2,x,resolve,reject){ // 对于x进行判断 看是否为promise 或者 不为空 切是 object和 fuction
    if(promise2 === x){
        reject(TypeError('Chaining cycle detected for promise'))
    }
    let called = false 
    if(x instanceof Promise){
        x.then(
            value=>{
                Promise.resolvePromise(promise2,value,resolve,reject)
            },
            reason=>{
                reject(reason)
            })
    } else if(x !== null && (typeof x === 'function' || typeof x === 'object')){
        try{
            const then = x.then
            if(typeof then === 'function'){
                then.call(
                    x,
                    value=>{
                        if(called) return
                        called = true
                        Promise.resolvePromise(promise2,value,resolve,reject)
                    },reason=>{
                        if(called) return
                        called = true
                        reject(reason)
                    })
            } else {
                if(called) return
                called = true
                resolve(x)
            }
        }catch(e){
            if(called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
Promise.defer = Promise.deferred = function() {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}
module.exports = Promise