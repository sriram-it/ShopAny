import React, { useEffect, useState } from 'react'
import Style from '../Cart/Cart.module.css'
import * as Data from '../data/data'
import TabBar from '../TabBar/TabBar'
import {Link} from 'react-router-dom'



function Cart() {
    var [cartDetails, setCartDetails] = useState([])
    var [totalPrice, setTotalPrice] = useState(0.0)

    useEffect(()=>{
        let tempCartDetails = []
        let totPrice = 0.0
        for(let i=0; i < Data.cart.length; i++) {
            if(Data.cart[i].userId == Data.currentUser.id) {
                tempCartDetails.push(Data.cart[i])
                totPrice += Data.cart[i].productPrice
            }
        }
        setCartDetails(tempCartDetails)
        setTotalPrice(totPrice)
    }, [])

     useEffect(() => {
         calculateTotalPrice()
         return (()=> {
             updateCartStatus()
         })
     }, [cartDetails])

    const onCheckHandler = function(index){
        let updatedArray = Array.from(cartDetails)
        let cartDetail = cartDetails[index]
        let orderStatus = cartDetails[index].status == 0 ? 1 : 0
        updatedArray.splice(index, 1, {id: cartDetail.id, userId: cartDetail.userId, productId: cartDetail.productId, productName: cartDetail.productName, productPrice: cartDetail.productPrice, sellerName: cartDetail.sellerName, sellerCompanyName: cartDetail.sellerCompanyName, status: orderStatus, })
        setCartDetails(updatedArray)
    }

    const calculateTotalPrice = function() {
        var totPrice = 0.0
        cartDetails.map((cartDetail)=> {
            if(cartDetail.status == 1) {
                totPrice += cartDetail.productPrice
            }
        })
        setTotalPrice(totPrice)
    }

    const updateCartStatus = function(){
        console.log("Before::" + Data.cart)
        for(let i=0; i < cartDetails.length; i++) {
            let index = findIndex(cartDetails[i])   
            if(index != -1) {
                Data.cart.splice(index, 1, cartDetails[i])
            }
        }
        console.log("After::" + Data.cart)
    }

    const findIndex = function(cartProduct){
        let index = -1
        for(let i=0; i < Data.cart.length; i++){
            if(Data.cart[i].id == cartProduct.id) {
                index = i
                break;
            }
        }
        return index
    }

    return(
        <div>
        <TabBar isSearchHide={true}/>  
        <h1 className={Style.title}>Cart</h1>
            {
                cartDetails.map((cartDetail,index) => {
                    console.log(cartDetail)
                    return (
                    <div key={cartDetail.productId} className={Style.listContainer}>
                        <div className={Style.contentContainer}>
                            <input type="checkbox" className={Style.checkBox} checked={cartDetail.status == 1} onChange={(event)=>{onCheckHandler(index)}} />
                            <img src={`/images/${cartDetail.productId}.jpg`} width="200px" height="200px"></img>
                            <div>
                                <h2>{cartDetail.productName}</h2>
                                <h3>{cartDetail.sellerCompanyName}</h3>
                                <h4>{cartDetail.sellerName}</h4>
                            </div>
                            <div>
                                <h2>{`$${cartDetail.productPrice}`}</h2>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
            <div className={Style.summaryContainer}>
                <h2>Total Price</h2>
                <h2>{`$${totalPrice.toFixed(2)}`}</h2>
            </div>
            <div className={Style.actions}>
                <center><Link to="/checkout"><button>Proceed to checkout</button></Link></center>
            </div>
        </div>
    )
}

export default Cart