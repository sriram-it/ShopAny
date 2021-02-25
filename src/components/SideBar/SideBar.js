import React from 'react'
import Style from  '../SideBar/SideBar.module.css'

function SideBar({activeTab}){
    return(
        <div className={Style.container}>
            <ul>
                <li className={activeTab == 0 ? Style.activeTab : ''}>Category Management</li>
                <li className={activeTab == 1 ? Style.activeTab : ''}>Product Management</li>
                <li className={activeTab == 2 ? Style.activeTab : ''}>Order Management</li>
                <li className={activeTab == 3 ? Style.activeTab : ''}>Statistics</li>
            </ul>
        </div>
    )
}

export default SideBar;