function BubbleSort(arr){
    if(!Array.isArray(arr)){
        throw new Error('传入的不是数组')
    }
    let length = arr.length - 1 
    for(let j = length;j>0;j--){
        for(let i = 0;i<j;i++){
            if(arr[i]>arr[i+1]){
               swap(arr,i,i+1)
            }
        }
    }
    console.log(arr)
    return arr
}
function swap(arr,i,j){
    if(!Array.isArray(arr)){
        throw new Error('传入的不是数组')
    }
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
let arr = [2,1,9,4,7,10,0]
BubbleSort(arr)


// function BubbleSort(arr){
//     let length = arr.length - 1
//     for(let j = length;j>0;j--){
//         for(let i = 0;i<j;i++){

//         }
//     }
// }