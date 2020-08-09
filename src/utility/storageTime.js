const hoursInThisMonth = () => {
    let now = new Date()
    let monthFirst = new Date(now.getFullYear(), now.getMonth(), 1)
    return (now - monthFirst) / 3600000
}

export default hoursInThisMonth