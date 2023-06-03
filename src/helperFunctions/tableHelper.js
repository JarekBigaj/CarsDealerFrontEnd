export const getTableColumnName = (value) => {
    const [firstValue] = value ? value : [''];
    if(!firstValue)
        return [];
    return Object.keys(firstValue).map(key => key);
}

export const getTableColumnNameForOffers = (props) => {
    
    console.log({props})
}