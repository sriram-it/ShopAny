import React from 'react'
import TabBar from '../TabBar/TabBar'
import SideBar from '../SideBar/SideBar'
import CategoryChart from './ChildComponents/CategoryChart/CategoryChart'
import Style from '../Statistics/Statistics.module.css'
import ProductChart from './ChildComponents/ProductChart/ProductChart'
import RevenueChart from './ChildComponents/RevenueChart/RevenueChart'

function Statistics(){
    return(
        <div>
            <TabBar isSearchHide={true}/>
            <div className={Style.root}> 
                <SideBar activeTab={0}/>
                <div>
                    <CategoryChart/>
                    <ProductChart/>
                    <RevenueChart/>
                </div>
            </div>
        </div>
    )
}

export default Statistics;