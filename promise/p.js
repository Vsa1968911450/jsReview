class Promise{
  constructor(executor){
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
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
    if(this.state = Promise.PENDING){
      this.value = value
      this.state = Promise.FULFILLED
      this.onFulfilledCallBacks.forEach(fn=>fn(this.value))
    }
  }
  reject(reason){
    if(this.state = Promise.PENDING){
      this.reason = reason
      this.state = Promise.REJECTED
      this.onRejectedCallBacks.forEach(fn=>fn(this.reason))
    }
  }
  initValue(){
    this.state = Promise.PENDING
    this.value = null
    this.reason = null
    this.onFulfilledCallBacks = []
    this.onRejectedCallBacks = []
  }
  initBind(){
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  then(onFulfilled,onRejected){
    //类型判断
    if(typeof onFulfilled !== 'function'){
      onFulfilled = function(value){
        return value
      }
    }
    if(typeof onRejected !== 'function'){
      onRejected = function(reason){
        throw reason
      }
    }
    // 返回一个promise对象
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
    return promise2
  }
}
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'reject'
Promise.resolvePromise = function(promise2,x,resolve,reject){
  if(promise2 === x){
    reject(new TypeError('Chaining cycle detected for promise'))
  }
  let called = false
  if(x instanceof Promise){
    x.then(
      value=>{
        Promise.resolvePromise(promise2,value,resolve,reject)
      },
      reason=>{
        reject(reason)
      }
    )
  } else if(x !== null && (typeof x === 'function' || typeof x === 'object')){
    try{
      let then = x.then
        if(typeof then === 'function'){
          then.call(
            x,
            value=>{
              if(called) return
              called = true
              Promise.resolvePromise(promise2,value,resolve,reject)
            },
            reason=>{
              if(called) return 
              called = true
              reject(reason)
            }
          )
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