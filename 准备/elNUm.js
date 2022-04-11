let arr = ['name','name','job','jobs']
let result = arr.reduce((pre,cur)=>{
    if(!pre[cur]){
        pre[cur] = 1
    } else {
        pre[cur] ++
    }
    return pre
},{})
console.log(result)