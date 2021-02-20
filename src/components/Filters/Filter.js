import React from 'react'
import Style from '../Filters/Filter.module.css'
import * as Data from '../data/data'

function Filter (){
    console.log(Data.categories)
    return (
        <div className={Style.container}>
            <div>
                <label htmlFor="categories">Categories</label>
                <select name="categories">
                    {Data.categories.map(category => {
                        return <option key={category.name}>{category.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="sort">Categories</label>
                <select name="sort">
                    <option>Sort By Lowest</option>
                    <option>Sort By Highest</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
