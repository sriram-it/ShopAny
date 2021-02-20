import React from 'react'
import Style from './Product.module.css'
import Headset from '../../images/headset.jpeg'
import Bag from '../../images/bag.jpeg'
import Shoe from '../../images/shoe.jpeg'
import Table from '../../images/table.jpeg'
import Wallet from '../../images/wallet.jpeg'
import Belt from '../../images/belt.jpeg'
import TabBar from '../TabBar/TabBar'
import {Link} from 'react-router-dom'
import Filter from '../Filters/Filter'
import * as Data from "../data/data"


function Product () {
    /*var products = [
        {
            name:"Headset",
            price:"$10.50",
            image: Headset
        },
        {
            name:"Shoe",
            price:"$52.00",
            image: Shoe
        },
        {
            name:"Bag",
            price:"$31.50",
            image: Bag
        },
        {
            name:"Wallet",
            price:"$24.00",
            image: Wallet
        },
        {
            name:"Belt",
            price:"$19.75",
            image: Belt
        },
        {
            name:"Table",
            price:"$220.00",
            image: Table
        }
    ]*/
    var products = Data.products
    console.log(Data.products)
    return (
        <>
            <TabBar isSearchHide = {false}/>
            <Filter/>
            <div className={Style.productContainer}>
                {
                    products.map(product => {
                        return (
                        <div className={Style.product} key={product.name}>
                            <img src={`/images/${product.id}.jpg`} width="120px" height="120px" className={Style.productImage}/>
                            <div>
                                <h2 className ={Style.productName}>{product.name}</h2>
                                <h3 className = {Style.price}>{`$${product.price}`}</h3>
                            </div>
                            <Link to={`/productDetail/${product.id}`}>
                                <button className = {Style.view}>View Product</button>
                            </Link>
                        </div>
                        )
                    })
                }
            </div>
        </>
    )
}


export default Product