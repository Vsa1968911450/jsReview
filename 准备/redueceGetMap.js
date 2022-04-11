// Array.prototype.Mmap = function (fn, thisArg) {
//       const result = [];
//       this.reduce((prev, curr, index, array) => {
//         result[index] = fn.call(thisArg, array[index], index, array);
//       }, 0);
//       return result;
//     };

Array.prototype.Amap = function(fn,arg){
    const result = []
    this.reduce((pre,cur,index,array)=>{
        result[index] = fn.call(arg,array[index],index,array)
    },0)
    return result
}