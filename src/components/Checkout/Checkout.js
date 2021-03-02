import React, {useState} from 'react'
import TabBar from '../TabBar/TabBar'
import * as Data from '../data/data'
import Style from '../Checkout/Checkout.module.css'
import Modal from 'react-modal'


function Checkout({match}) {
    let cartId = match.params.cartId
    let navfrom = match.params.navfrom
    let [isModalOpen ,setModelOpen] = useState(false)


    const placeOrder = function() {
        let futureDeliveryDate = new Date()
        futureDeliveryDate.setDate(futureDeliveryDate.getDate() + 10)

        console.log(navfrom)
        if(cartId != null && navfrom == 1) {
            let cartObject = getObject(cartId, Data.cart)
            let productInfo = getObject(cartObject.productId, Data.products)
            let currentUserId = parseInt(Data.currentUser[0].id)
            let orderId = 0
            if(Data.orders.length > 0) {
                orderId = Data.orders[Data.orders.length-1].id + 1
            } 
            Data.orders.push({id: orderId, userId: currentUserId, userName: Data.currentUser[0].name, userEmail: Data.currentUser[0].email , productId: cartObject.productId, productName: cartObject.productName, productPrice: cartObject.productPrice, categoryId: productInfo.categoryId, sellerId: cartObject.sellerId, sellerName: cartObject.sellerName, sellerCompanyName: cartObject.sellerCompanyName, status: 1, placedDate: new Date(), deliveryDate: futureDeliveryDate})
            
            let index = getIndex(cartId, Data.cart)
            Data.cart.splice(index, 1)
            setModelOpen(true)
        } else if(cartId != null && navfrom == 0) {
            let cartIds = cartId.split('~')
            for(let i=0; i< cartIds.length-1; i++) {
                console.log(Data.cart)
                let cartObject = getObject(cartIds[i], Data.cart)
                let productInfo = getObject(cartObject.productId, Data.products)
                let currentUserId = parseInt(Data.currentUser[0].id)
                let orderId = 0
                if(Data.orders.length > 0) {
                    orderId = Data.orders[Data.orders.length-1].id + 1
                } 
                Data.orders.push({id: orderId, userId: currentUserId, userName: Data.currentUser[0].name, userEmail: Data.currentUser[0].email , productId: cartObject.productId, productName: cartObject.productName, productPrice: cartObject.productPrice, categoryId: productInfo.categoryId, sellerId: cartObject.sellerId, sellerName: cartObject.sellerName, sellerCompanyName: cartObject.sellerCompanyName, status: 1, placedDate: new Date(), deliveryDate: futureDeliveryDate})
                
                let index = getIndex(cartIds[i], Data.cart)
                Data.cart.splice(index, 1)
            }
            setModelOpen(true)
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

    function getIndex(id, objects){
        let index = -1
        for(let i = 0; i < objects.length; i++) {
            if(objects[i].id == id) {
                index = i
                break
            }
        }
        return index
    }

    return(
        <div>
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
            <Modal isOpen={isModalOpen} className="modal" style={{overlay:{backgroundColor:'grey', opacity: 0.95}}}>
                <div class="root">
                    <div className="modal-header">
                        <p>Message</p>
                    </div>
                    <div className="model-body">Ordered Successfully.</div>
                    <div className="modal-footer">
                        <button onClick={()=>setModelOpen(false)}>Close</button>
                    </div>
                </div> 
            </Modal>
        </div>
    )
}

export default Checkout;