import MonthOptions from './MonthOptions'

export * from './MonthOptions'

const getAccountDetail = (category, id) => {
    return category.find((item) => item.id === id)
}

const numberFormat = (number) => {
    const str = number.toString()
    let result = ''
    let comma = 0

    for(let i = str.length - 1; i >= 0; i--) {
        if(comma === 3) {
            result = str[i] + ',' + result
            comma = 0
        } else {
            result = str[i] + result
        }
        comma++
        
        if(str[i] === '.') comma = 0
    }

    return result
}

export {
    getAccountDetail,
    numberFormat,
    MonthOptions
}