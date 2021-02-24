import React, {useRef} from 'react'
import Style from '../Filters/Filter.module.css'
import * as Data from '../data/data'


function Filter ({categoryHandler, sortHandler}){
    let categoryNode = useRef(null)
    let sortNode = useRef(null)  

    var setSort = function(sortId) {
        sortNode.current.value =  sortId
    }

    var categoryLocalHandler = function(event) {
        setSort(0)
        categoryHandler(event)
    }

    return (
        <div className={Style.container}>
            <div>
                <label htmlFor="categories">Categories</label>
                <select name="categories" ref={categoryNode} onChange={(e)=>categoryLocalHandler(e)}>
                    {Data.categories.map(category => {
                        return <option key={category.name} value={category.id}>{category.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="sort">Sort</label>
                <select name="sort" ref={sortNode} onChange={(event)=>sortHandler(event.target.value)}>
                    <option value={0}>No Preference</option>
                    <option value={1}>Lowest First</option>
                    <option value={2}>Highest First</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
