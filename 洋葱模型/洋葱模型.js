// 方法和洋葱一样 一层一层往里执行 到中心点 在一层一层往外走出来
const middleware = [];
middleware.push(function (next) {
    console.log(1);
    next();
    console.log(4);
});
middleware.push(function (next) {
    console.log(2);
    next();
    console.log(5);
});
middleware.push(function (next) {
    console.log(3);
    next();
    console.log(6);
});
//compose必须返回的是一个函数，并且每次函数执行，都需要将下一个函数作为参数传给它，这样才能够让方法一层层的执行下去，直到最里面一层：
function compose(middleware) {
    return function () {
        function dispatch(i) {
            const fn = middleware[i];
            if (typeof fn === 'function') {
                i++;
                const next = function () {
                    dispatch(i);
                };
                fn(next);
            }
        }

        dispatch(0);
    }
}

// 调用
compose(middleware)();