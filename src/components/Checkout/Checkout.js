import React from 'react'
import TabBar from '../TabBar/TabBar'
import * as Data from '../data/data'
import Style from '../Checkout/Checkout.module.css'

function Checkout({match}) {
    let cartId = match.params.cartId


    const placeOrder = function() {
        if(cartId) {
            let cartObject = getObject(cartId, Data.cart)
            let currentUserId = parseInt(Data.currentUser.id)
            let orderId = 0
            if(Data.orders.length > 0) {
                orderId = Data.orders[Data.orders.length-1].id + 1
            } 
            Data.orders.push({id: orderId, userId: currentUserId, productId: cartObject.productId, productName: cartObject.productName, productPrice: cartObject.productPrice, sellerName: cartObject.sellerName, sellerCompanyName: cartObject.sellerCompanyName, status: 1, placedDate: new Date(), DeliveryDate: new Date()})
        } else {

        }
    }

    function getObject(id, objects) {
        for(let i = 0; i < objects.length; i++) {
            if(objects[i].id == id) {
                return objects[i]
            }
        }
        return null
    }


    return(
        <div>
            <TabBar isSearchHide={true}/>
            <h1 className={Style.title}>Delivery Details</h1>
            <div className={Style.rootContainer}>
                <center>
                <h2>Enter your name and address</h2>
                <input type="textbox" placeholder="First Name" className={Style.fullWidth}/>
                <input type="textbox" placeholder="Last Name" className={Style.fullWidth}/>
                <input type="textbox" placeholder="Street Address" className={Style.fullWidth}/>
                <input type="textbox" placeholder="Apt or Suite (optional)" className={Style.fullWidth}/>
                <input type="textbox" placeholder="Town/City" className={Style.fullWidth}/>
                <div>
                    <input type="textbox" placeholder="Province" className={Style.halfWidth}/>
                    <input type="textbox" placeholder="Postal Code" className={Style.halfWidth}/>
                </div>
                <input type="textbox" placeholder="Country/Region" className={Style.fullWidth}/>
                <h2 className={Style.sectionStart}>Contact information</h2>
                <input type="textbox" placeholder="Email Address" className={Style.fullWidth}/>
                <input type="textbox" placeholder="Area Code" className={Style.fullWidth}/>
                <input type="textbox" placeholder="Mobile Phone Number" className={Style.fullWidth}/>
                <div className={Style.sectionStart}>
                    <button id={Style.buttonOrder} onClick={()=>placeOrder()}>Place Order</button>
                </div>
                </center>
            </div>
        </div>
    )
}

export default Checkout;