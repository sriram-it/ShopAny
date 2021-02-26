import React from 'react'
import TabBar from '../TabBar/TabBar'
import * as Data from '../data/data'
import Style from '../ProductDetail/ProductDetail.module.css'
import {useHistory} from 'react-router-dom'


var history = null
function ProductDetail ({match}) {
    history = useHistory()

    console.log("asd"+Data.products)
    let selectedProduct = findProductById(match.params.productId)
    return (
        <div>
            {selectedProduct == null ?
                (<div>Product Detail Not Found</div>) :
                (
                    <div>
                        <TabBar isSearchHide={true}/> 
                        <div id={Style.container}> 
                            <div>
                                <img id={Style.image} src={`/images/${selectedProduct.id}.jpg`} width="400px" height="400px"></img>
                            </div>
                            <div id={Style.content}>
                                <h1 id={Style.title}>{selectedProduct.name}</h1>
                                <h1 id={Style.price}>{`$${selectedProduct.price}`}</h1>
                                <h4 id={Style.aboutItemTitle}>About the item:</h4>
                                <ul id={Style.description}>{makePoints(selectedProduct.description)}</ul>
                                <div id={Style.actionContainer}>
                                    <button onClick={ () => addToCartHandler(selectedProduct.id, selectedProduct.sellerId)}>Add to Cart</button>
                                    <button onClick={ () => buyHandler(selectedProduct.id, selectedProduct.sellerId)}>Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

function findProductById(id) {
    console.log(Data.products)
    for(let i = 0; i < Data.products.length; i++) {
        if(Data.products[i].id == id) {
            return Data.products[i];
        }
    }
    return null;
}

function makePoints(description){
    let points = description.split("<BULLET>")
    let returnVal = []
    for(let i = 0; i<points.length; i++) {
         returnVal.push(<li key={points[i]} className={Style.bulletsPoints}>{points[i]}</li>)
    }
    return returnVal
}

let addToOrder = function(currentProductId, currentSellerId){
    var currentUserId = parseInt(Data.currentUser[0].id)
    var orderId = 0
    var existOrder = null;

    //Check the Product Already Added in the Cart
    existOrder = isOrderAlreadyExist(currentProductId)
    if(existOrder != null) {
        alert("Product Already Added in the Cart")
        return
    } 

    //Make new order
    if(Data.orders.length > 0) {
        orderId = Data.orders[Data.orders.length-1].id + 1
    } 
    var currentOrder = {id: orderId, userId: currentUserId, sellerId: currentSellerId, productId: currentProductId, status: 1, dateAndTime: new Date()}
    Data.orders.push(currentOrder)
    console.log(Data.orders)
    //history.goBack()
    history.replace('/cart')
}

let addToCartHandler = function(currentProductId, currentSellerId) {
    addToCart(currentProductId, currentSellerId)
    history.replace('/cart')
}

let buyHandler = function(currentProductId, currentSellerId) {
    let cartId = addToCart(currentProductId, currentSellerId)
    history.replace(`/checkout/${cartId}/1`)
}

let addToCart = function(currentProductId, currentSellerId){
    var currentUserId = parseInt(Data.currentUser[0].id)
    var cartId = 0
    var existOnCart = null;

    //Check the Product Already Added in the Cart
    existOnCart = isProductExistOnCart(currentProductId)
    if(existOnCart != null) {
        alert("Product Already Added in the Cart")
        return
    } 

    //Make new order
    if(Data.cart.length > 0) {
        cartId = Data.cart[Data.cart.length-1].id + 1
    } 
    var productInfo = getObject(currentProductId, Data.products)
    var sellerDetails = getObject(currentSellerId, Data.sellers)
    var productToCart = {id: cartId, userId: currentUserId, productId: productInfo.id, productName: productInfo.name, productPrice: productInfo.price, sellerId: sellerDetails.id, sellerName: sellerDetails.name, sellerCompanyName: sellerDetails.companyName, status: 1}
    Data.cart.push(productToCart)
    console.log(Data.cart)
    return productToCart.id
}

function getObject(id, objects) {
    for(let i = 0; i < objects.length; i++) {
        if(objects[i].id == id) {
            return objects[i]
        }
    }
    return null
}

function isProductExistOnCart(currentProductId){
    var cart = Data.cart
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].productId == currentProductId) {
            return cart[i]
        }
    }
    return null
}

function isOrderAlreadyExist(currentProductId){
    var orders = Data.orders
    for(let i = 0; i < orders.length; i++) {
        if(orders[i].productID == currentProductId && orders[i].status == 0) {
            return orders[i]
        }
    }
    return null
}

export default ProductDetail