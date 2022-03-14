// 新建一个promise类
class Promise{
  constructor(executor){ // 不能相信用户的输入
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.initvalue()
    this.initBind()
    try{
      executor(this.resolve,this.reject)
    } catch(e){
      this.reject(e)
    }
  }

  initBind(){
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  initvalue(){
     // 初始化值
     this.value = null // 终值
     this.reason = null // 原因
     this.state = Promise.PENDING // 状态  fulfilled 和rejected是一个终值 不可以改变
     this.onFulfilledCallbacks = [] // 成功回调
    this.onRejectedCallbacks = [] // 失败回调
  }
  resolve(value) {
    // 成功后的一系列操作(状态的改变, 成功回调的执行)
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => fn(this.value))
    }
  }

  reject(reason) {
    // 失败后的一系列操作(状态的改变, 失败回调的执行)
    if (this.state === 'pending') {
      this.state = Promise.REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }
  then(onFulfilled, onRejected) {
    // 参数校检
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function(value) {
        return value
      }
    }

    if (typeof onRejected !== 'function') {
      onRejected = function(reason) {
        throw reason
      }
    }

    // 实现链式调用, 且改变了后面then的值, 必须通过新的实例
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push(value => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onRejectedCallbacks.push(reason => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
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
Promise.resolvePromise = function(promise2, x, resolve, reject) {
  // x 与 promise 相等
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called = false
  if (x instanceof Promise) {
    // 判断 x 为 Promise
    x.then(
      value => {
        Promise.resolvePromise(promise2, value, resolve, reject)
      },
      reason => {
        reject(reason)
      }
    )
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // x 为对象或函数
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          value => {
            if (called) return
            called = true
            Promise.resolvePromise(promise2, value, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
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