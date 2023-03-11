import React from 'react'

const Filters = ({ data, filtersBy }) => {
    const Keys = Object.keys(filtersBy);
    Keys.forEach((i) => {
        data = data.filter(item => {
            if (typeof (filtersBy[i]) === 'object' && item[i] >= filtersBy[i]['from'] && item[i] <= filtersBy[i]['to']) {
                return item;
            }
            else if (item[i] === filtersBy[i] || filtersBy[i] === 'all') {
                return item
            }
        })
    })
    return data
}

export default Filters
