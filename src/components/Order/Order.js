import React,{useEffect, useState} from 'react'
import TabBar from '../TabBar/TabBar'
import Style from '../Order/Order.module.css'

import * as Data from '../data/data'

function Order(){
    var [orders, setOrders] = useState([])

    useEffect(()=>{
        let tempOrder = []
        for(let i=0; i < Data.orders.length; i++) {
            if(Data.orders[i].userId == Data.currentUser[0].id) {
                tempOrder.push(Data.orders[i])
            }
        }
        setOrders(tempOrder)
    }, [])

    function formatDate(dateValue) {
        let formattedDate = null
        if(typeof(dateValue) == "string") {
            formattedDate = new Date(dateValue.replace(/-/g, '\/')).toLocaleDateString("en-US")
        } else {
            formattedDate = dateValue.toLocaleDateString("en-US")
        }
        return formattedDate
    }

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
                                <div>
                                    <img src={`/images/${order.productId}.jpg`} width="200px" height="200px"></img>
                                </div>
                                <div>
                                    <p className={Style.fields}>{`Product Name: ${order.productName}`}</p>
                                    <p className={Style.fields}>{`Product Price: $${parseFloat(order.productPrice).toFixed(2)}`}</p>
                                    <p className={Style.fields}>{`Seller Name: ${order.sellerName}`}</p>
                                    <p className={Style.fields}>{`Seller Company Name: ${order.sellerCompanyName}`}</p>
                                </div>
                                <div>
                                    <p className={Style.fields}>{`Order Id: ${order.id}`}</p>
                                    <p className={Style.fields} style={{color:'green', fontWeight: 650}}>{`Status: ${Data.orderStatus[order.status-1].name}`}</p>
                                    <p className={Style.fields}>{`Placed Date: ${formatDate(order.placedDate)}`}</p>
                                    <p className={Style.fields} style={{color:'blue', fontWeight: 650}} >{`Delivery Date: ${formatDate(order.deliveryDate)}`}</p>
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