function BubbleSort(arr){
    let length = arr.length - 1
    for(let j = length ;j>=0;j--){
        for(let i = 0;i<j;i++){
            if(arr[i]>arr[i+1]){
                temp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = temp
            }
        }
    }
    // for(let i = 0;i<length;i++){
    //     if(arr[i]>arr[i+1]){
    //         temp = arr[i]
    //         arr[i] = arr[i+1]
    //         arr[i+1] = temp
    //     }
    // }
    console.log(arr)
    return arr
}
let arr = [2,3,5,6,7,1,0]
BubbleSort(arr)