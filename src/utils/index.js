module.exports = {
    hiddenKeyword:(arr,keys)=>{
        if (!(arr instanceof Array) || !(keys instanceof Array)) {
            keys.forEach((key) => {
                delete arr[key];
            })
            return arr;
        }
        return arr.map((it) => {
            filterIt = {
                ...it
            };
            keys.forEach((key)=>{
                delete filterIt[key];
            })
            return filterIt;
        })
    }
}