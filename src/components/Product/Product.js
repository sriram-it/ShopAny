import React, { useRef, useState } from 'react'
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

    var [products, setProducts] = useState(Data.products)
    
    console.log(Data.products)

    const filterByCategory = function(event) {
        console.log(event.target.value)
        let categoryId = event.target.value
        if(categoryId == 0) {
            setProducts(Data.products)
        } else if(categoryId > 0) {
            let filteredProducts = []
            for(let i=0; i < Data.products.length; i++) {
                if(Data.products[i].categoryId == categoryId) {
                    filteredProducts.push(Data.products[i])
                }
            }
            setProducts(filteredProducts)
        }
    }

    const handleSort = function(sortId) {
     //   Data.lastSortId = sortId
        let sortedProducts = []
        if(sortId == 0){
            setProducts(products)
        }else if(sortId == 1) {
            sortedProducts = sortByLowestFirst()
            setProducts(sortedProducts)
        } else if(sortId == 2) {
            let descSortedArray = sortByHighestFirst()
            setProducts(descSortedArray)
        } 

    }

    const sortByLowestFirst = function(){
        let allProducts = Array.from(products)
        let sortedArray = []
        while(allProducts.length > 0) {
            let index = findLowest(allProducts)
            sortedArray.push(allProducts[index])
            allProducts.splice(index, 1)
        }
        return sortedArray
    }

    const sortByHighestFirst = function(){
        let sortedArray = sortByLowestFirst()
        let descSortedArray = sortedArray.reverse()
        return descSortedArray
    }

    const findLowest = function(products) {
        let cheapestProduct = products[0]
        let cheapestProductIndex = 0
        for(let i=1; i<products.length; i++) {
            if(cheapestProduct.price > products[i].price) {
                cheapestProduct = products[i]
                cheapestProductIndex = i
            }
        }
        return cheapestProductIndex
    }

    const searchHandler = function(value) {
        let searchArray = []
        for(let i=0; i < Data.products.length; i++) {
            if(Data.products[i].name.toLowerCase().includes(value.toLowerCase())) {
                searchArray.push(Data.products[i])
            }            
        }
        setProducts(searchArray)
    }

    return (
        <>
            <TabBar isSearchHide = {false} searchHandler={searchHandler}/>
            <Filter categoryHandler = {filterByCategory} sortHandler={handleSort}/>
            <div className={Style.productContainer}>
                {
                    products.map(product => {
                        return (
                        <div className={Style.product} key={product.name}>
                            <img src={`/images/${product.id}.jpg`} width="150px" height="150px" className={Style.productImage}/>
                            <div>
                                <h2 className ={Style.productName}>{product.name}</h2>
                                <h3 className = {Style.price}>{`$${parseFloat(product.price).toFixed(2)}`}</h3>
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