const formatStorage = (amount, decimals=1) => {
    let MB = Math.pow(10, 6)
    let GB = Math.pow(10, 9)
    let TB = Math.pow(10, 12)
    let PB = Math.pow(10, 15)
    
    if (amount >= PB){ return `${(amount / PB).toFixed(decimals)} PB` }
    else if (amount >= TB){ return `${(amount / TB).toFixed(decimals)} TB` }
    else if (amount >= GB){ return `${(amount / GB).toFixed(decimals)} GB` }
    else { return `${(amount / MB).toFixed(decimals)} MB` }
}

export default formatStorage