function bigNumberAdd(num1,num2){
    let str1 = num1.split('').reverse()
    let str2 = num2.split('').reverse()
    const length = Math.max(str1.length,str2.length)
    const res = []
    let flag =  0 // 判断加起来是否大于10 满足10进一位
    for(let i = 0;i<length;i++){
        let n1 = Number(str1[i]) || 0
        let n2 = Number(str2[i]) || 0
        let sum = n1 + n2 + flag
        if(sum >= 10){
            sum = sum % 10
            flag = 1
        } else {
            flag = 0
        }
        res.push(sum)
        if(i === length - 1){
            if(flag === 1){
                res.push(flag)
            }
            
        }
    }
   
    return res.reverse().join('')
}
console.log(bigNumberAdd('200001','300000'))