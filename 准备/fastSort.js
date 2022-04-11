// function quickSort(arr){
//     if(!Array.isArray(arr)){
//         throw new Error("传入的不是数组")
//     }
//     if(arr.length<=1){
//         return arr
//     }
//     let pivotIndex = Math.floor(arr.length /2)
//     let pivot = arr.splice(pivot,1)[0]
//     let left = []
//     let right = []
//     for(let i = 0;i<arr.length;i++){
//         if(arr[i]<pivot){
//             left.push(arr[i])
//         } else {
//             right.push(arr[i])
//         }
//     }
//     return quickSort(left).concat([pivot],quickSort(right))
// }




function quickSort(arr){
    if(!Array.isArray(arr)){
        throw new Error("传进来的不是数组")
    }
    if(arr.length <= 1) { return arr }
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex,1)[0]
    console.log(pivot)
    let left = []
    let right = []
    for(let i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    let arr1 = quickSort(left).concat([pivot],quickSort(right))
    console.log(arr1)
    return arr1
}
let arr = [8,2,1,4,6,9,10]
quickSort(arr)