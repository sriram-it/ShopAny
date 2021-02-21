import React from 'react'
import Style from '../Cart/Cart.module.css'
import * as Data from '../data/data'

function Cart() {
    var productInfo = getObject(Data.orders[0].productId, Data.products)
    var sellerDetails = getObject(Data.orders[0].sellerId, Data.sellers)
    console.log(productInfo)
    console.log(sellerDetails)
    return(
        <div>
            <h1>Cart</h1>
            <div>
                <img src={`/images/${productInfo.id}.jpg`}></img>
                <div className={Style.contentContainer}>
                    <h2>{productInfo.name}</h2>
                    <h3>{sellerDetails.companyName}</h3>
                    <h4>{sellerDetails.name}</h4>
                </div>
            </div>
        </div>
    )
}

function getObject(id, objects) {
    console.log(`ObJECTS:: ${objects[0].id}`)
    for(let i = 0; i < objects.length; i++) {
        if(objects[i].id == id) {
            console.log(`OIN :: ${objects[i]}`)
            return objects[i]
        }
    }
    return null
}

export default Cart