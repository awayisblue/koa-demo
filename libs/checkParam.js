module.exports.checkObject = (obj,checkerObj)=>{
    let params = Object.getOwnPropertyNames(checkerObj)

    for(let i=0;i<params.length;i++){
        let param = params[i]
        if(!obj[param])throw 'miss '+param
        if(!checkerObj[param](obj[param]))throw 'not match condition: '+param
    }
    return true
}