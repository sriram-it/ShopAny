import React from 'react'
import TabBar from '../TabBar/TabBar'
import * as Data from '../data/data'
import Style from '../ProductDetail/ProductDetail.module.css'

function ProductDetail ({match}) {
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
                                    <button>Add to Cart</button>
                                    <button>Buy</button>
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
         returnVal.push(<li>{points[i]}</li>)
    }
    return returnVal
}

export default ProductDetail