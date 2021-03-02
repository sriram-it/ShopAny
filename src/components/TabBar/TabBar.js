import React from 'react'
import Style from './TabBar.module.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FiShoppingBag} from 'react-icons/fi'
import {RiFileList2Line} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import * as Data from '../data/data'





function TabBar(props) {

    var history = useHistory()

    const onLogout = () => {
        Data.currentUser.splice(Data.currentUser.length)
        history.replace(`/product`)
    }

    console.log(props)
    return (
        <div className={Style.container}>
            <h2 className={Style.logo}><AiOutlineShoppingCart className={Style.icon}/> ShopAny</h2>
            <div className={Style.searchBox}>
                <input type="textbox"  style={props.isSearchHide  ? {display: 'none'} : {display: 'block'}} placeholder={ Data.currentUser[0].userType == 0 ? "Enter the product name to find" : "Enter the customer email to find"} onChange={(event) => props.searchHandler(event.target.value)}></input>
            </div>
            <div className={Style.actions}>
                {
                    Data.currentUser[0].userType == 0 ? (
                        <>
                            <h2><Link to="/cart"><FiShoppingBag id={Style.cartIcon}></FiShoppingBag></Link></h2>
                            <h2><Link to="/order"><RiFileList2Line id={Style.orderIcon}></RiFileList2Line></Link></h2>
                        </>) : (<div></div>)
                }
                <Link to="/"><button className={Style.logout}>Logout</button></Link>
            </div>
        </div>
    )
}

export default TabBar;