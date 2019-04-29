export function arrSort(arr, sortKey){
    let newArr = arr.sort((obj1, obj2) => {
        let val1 = obj1[sortKey]
        let val2 = obj2[sortKey]
        if (val1 < val2) {
            return -1
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }
    })
    return newArr
}