import React from 'react'
import Style from './TabBar.module.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FiShoppingBag} from 'react-icons/fi'
import {RiFileList2Line} from 'react-icons/ri'
import {Link} from 'react-router-dom'

function TabBar(props) {
    console.log(props)
    return (
        <div className={Style.container}>
            <h2><AiOutlineShoppingCart className={Style.icon}/> ShopAny</h2>
            <div className={Style.searchBox}>
                <input type="textbox"  style={props.isSearchHide  ? {display: 'none'} : {display: 'block'}} placeholder="Enter the product name to find" onChange={(event) => props.searchHandler(event.target.value)}></input>
            </div>
            <div className={Style.actions}>
                <h2><Link to="/cart"><FiShoppingBag id={Style.cartIcon}></FiShoppingBag></Link></h2>
                <h2><Link to="/order"><RiFileList2Line id={Style.orderIcon}></RiFileList2Line></Link></h2>
                <button className={Style.logout}>Logout</button>
            </div>
        </div>
    )
}

export default TabBar;