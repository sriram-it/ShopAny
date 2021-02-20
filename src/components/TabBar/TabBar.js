import React from 'react'
import Style from './TabBar.module.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

function TabBar(props) {
    console.log(props)
    return (
        <div className={Style.container}>
            <h2><AiOutlineShoppingCart className={Style.icon}/> ShopAny</h2>
            <div className={Style.searchBox}>
                <input type="textbox"  style={props.isSearchHide  ? {display: 'none'} : {display: 'block'}} placeholder="Enter the product name to find"></input>
            </div>
            <div>
                <button className={Style.logout}>Logout</button>
            </div>
        </div>
    )
}

export default TabBar;