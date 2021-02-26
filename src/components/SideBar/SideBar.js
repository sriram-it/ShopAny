import React from 'react'
import Style from  '../SideBar/SideBar.module.css'
import {Link} from 'react-router-dom'

function SideBar({activeTab}){
    return(
        <div className={Style.container}>
            <ul>
                <Link to="/statistics" className={Style.link}><li className={activeTab == 0 ? Style.activeTab : ''}>Statistics</li></Link>
                <Link to="/category" className={Style.link}><li className={activeTab == 1 ? Style.activeTab : ''}>Category Management</li></Link>
                <Link to="/productManagement" className={Style.link}><li className={activeTab == 2 ? Style.activeTab : ''}>Product Management</li></Link>
                <Link to="/orderManagement" className={Style.link}><li className={activeTab == 3 ? Style.activeTab : ''}>Order Management</li></Link>
                {/* <Link to="/" className={Style.link}><li className={activeTab == 3 ? Style.activeTab : ''}>O</li></Link> */}
            </ul>
        </div>
    )
}

export default SideBar;