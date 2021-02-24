import React,{useEffect, useState} from 'react'
import TabBar from '../TabBar/TabBar'
import Style from '../Order/Order.module.css'

import * as Data from '../data/data'

function Order(){
    var [orders, setOrders] = useState([])

    useEffect(()=>{
        let tempOrder = []
        for(let i=0; i < Data.orders.length; i++) {
            if(Data.orders[i].userId == Data.currentUser.id) {
                tempOrder.push(Data.orders[i])
            }
        }
        setOrders(tempOrder)
    }, [])

    return(
        // <div>
        //     <TabBar isHideSearch={true}/>
        //     <div>
        //        { Data.orders.map((order)=>{
        //            return <div>{order.id}</div>
        //        })}
        //     </div>
        // </div>

            <div>
            <TabBar isSearchHide={true}/>  
            <h1 className={Style.title}>Orders</h1>
                {
                    orders.map((order,index) => {
                        console.log(order)
                        return (
                        <div key={order.id} className={Style.listContainer}>
                            <div className={Style.contentContainer}>
                                <img src={`/images/${order.productId}.jpg`} width="200px" height="200px"></img>
                                <div>
                                    <h2>{order.productName}</h2>
                                    <h3>{order.sellerCompanyName}</h3>
                                    <h4>{order.sellerName}</h4>
                                </div>
                                <div>
                                    <h2>{`$${order.productPrice}`}</h2>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
    )
}

export default Order