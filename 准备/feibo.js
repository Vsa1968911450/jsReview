function fib(n){
    let fib = []
    let i = 0
    while(i<=n){
        if(n<=1){
            fib.push(i)
        } else {
            fib.push(fib(i-1) + fib(n-2))
        }
        i++
    }
    return fib
}