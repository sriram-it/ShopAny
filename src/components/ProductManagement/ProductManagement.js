import React, { useEffect, useState } from 'react'
import Style from '../ProductManagement/ProductManagement.module.css'
import SideBar from '../SideBar/SideBar';
import TabBar from '../TabBar/TabBar'
import Modal from 'react-modal'
import * as Data from '../data/data'
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'


function ProductManagement() {

    let [isModalOpen ,setModelOpen] = useState(false)
    let [products, setProducts] = useState([])
    let [newProduct, setNewProduct] = useState({id: null, name:"", image: null, description:"", quantity:0, price: 0, categoryId: null, sellerId: null})


    useEffect(()=>{
        setProducts(filtetCurrentUserProducts())
    }, [])

    const filtetCurrentUserProducts = () => {
        let sellerProducts = []
        for(let i = 0; i < Data.products.length; i++) {
            if(Data.products[i].sellerId == Data.currentUser[0].id) {
                sellerProducts.push(Data.products[i])
            }
        }
        return sellerProducts
    }


    const onSave = () => {
        let productId = 0
        if(newProduct.id) {
            let index = getIndex(newProduct.id, Data.products)
            Data.products.splice(index, 1, {id: newProduct.id, name: newProduct.name, description: newProduct.description, quantity: newProduct.quantity, price: newProduct.price, categoryId: newProduct.categoryId, sellerId: Data.currentUser[0].id})
        } else { //Save
            if(Data.categories.length > 0) {
                productId = Data.products[Data.products.length-1].id + 1
            } 
      //      storeImage(productId)
            Data.products.push({id: productId, name: newProduct.name, description: newProduct.description, quantity: newProduct.quantity, price: newProduct.price, categoryId: newProduct.categoryId, sellerId: Data.currentUser[0].id})
        }
        setProducts(filtetCurrentUserProducts())
        setNewProduct({id: null, name:"", image: null, description:"", quantity:0, price: 0, categoryId: null, sellerId: null})
        setModelOpen(false)
    }

    const storeImage = (imageName) => {
     //   var url = window.URL.createObjectURL(new Blob(newProduct.image))
        var a  = document.createElement('a');
        a.href = newProduct.image
        a.target = '_blank'
        a.download = `${imageName}${new Date()}.jpg+`
        
        //  a.addEventListener("click", function(event){
        //      event.preventDefault()
        //  })
        
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

    }

    const onEdit = (product) => {
        setNewProduct(product)
        setModelOpen(true)
    }

    const onCancel = () => {
        console.log("cancel called")
        setNewProduct({id: null, name:"", image: null, description:"", categoryId: 1, quantity:0, price: 0, categoryId: null, sellerId: null}) 
        setModelOpen(false)
    }

    const onRemove = (productId) => {
         console.log(Data.products)
         let allsellerProducts = Array.from(filtetCurrentUserProducts())
         let allProductsIndex = getIndex(productId, Data.products)
         let sellProductIndex = getIndex(productId, allsellerProducts)
         allsellerProducts.splice(sellProductIndex, 1)
         Data.products.splice(allProductsIndex, 1)
         console.log(allsellerProducts)
         setProducts(allsellerProducts)
         console.log(allsellerProducts)
    }

    const uploadImage = (event) => {
        const reader = new FileReader()
        reader.onload = function () {
            let imageData = reader.result
            setNewProduct({...newProduct, image: imageData})
        }
        reader.readAsDataURL(event.target.files[0])
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
            <TabBar isSearchHide={true}/>
            <div className={Style.root}>
                <SideBar activeTab={2}/>
                <div className={Style.container}>
                    <div className={Style.actions}>
                        <h1 className={Style.title}>Products</h1>
                        <button onClick={()=>{setModelOpen(true)}}>Add</button>
                    </div>
                    <div className={Style.list}>
                    {
                        products.map((product)=>{
                            return (
                                <div key={product.id} className={Style.listItem}>
                                    <p>{product.name}</p>
                                    <div className={Style.listActions}>
                                        <p><AiOutlineEdit onClick={()=>onEdit(product)}/></p>
                                        <p><RiDeleteBinLine onClick={()=>onRemove(product.id)}/></p>
                                    </div>
                                </div>  
                            )
                        })
                    }
                    </div>
                    <Modal isOpen={isModalOpen} className={Style.modal} style={{overlay:{backgroundColor:'grey', opacity: 0.95, position: 'fixed', zIndex: 2}}}>
                        <div className={Style.modalContainer}>
                            <h2 className={Style.modalHeader}>Add Product</h2>
                            <div className={Style.modalBody}>
                                <div>
                                    <img id={Style.image} src={newProduct.id ? `/images/${newProduct.id}.jpg` : newProduct.image} width="200px" height="200px"></img>
                                </div>
                                <div className={Style.modalFormContainer}>
                                    <div className={Style.fieldContainer}>
                                        <label>Name</label>
                                        <input className={Style.fields} type="textbox" placeholder="Enter Product Name" value={newProduct.name} onChange={(event)=>{setNewProduct({...newProduct, name: event.target.value})}}/>
                                    </div>
                                    <div className={Style.fieldContainer}>
                                        <label>Description</label>
                                        <textarea className={Style.fields} placeholder="Enter Product Description" value={newProduct.description} onChange={(event)=>{setNewProduct({...newProduct, description: event.target.value})}}/>
                                    </div>
                                    <div className={Style.fieldContainer}>
                                        <label>Image</label>
                                        <input className={Style.fields} type="file" onChange={(event)=>uploadImage(event)}/>
                                    </div>
                                    <div className={Style.fieldContainer}> 
                                        <label>Category</label>
                                        <select className={Style.fields} value={newProduct.categoryId} name="categories" onChange={(event) => setNewProduct({...newProduct, categoryId: event.target.value })}>
                                            {Data.categories.map(category => {
                                                return <option key={category.name} value={category.id}>{category.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className={Style.fieldContainer}>
                                        <label>Price</label>
                                        <input className={Style.fields} type="textbox" placeholder="Enter Product Price" value={newProduct.price} onChange={(event)=>{setNewProduct({...newProduct, price: event.target.value})}}/>
                                    </div>
                                    <div className={Style.fieldContainer}>
                                        <label>Quantity</label>
                                        <input className={Style.fields} type="textbox" placeholder="Enter Product Quantity" value={newProduct.quantity} onChange={(event)=>{setNewProduct({...newProduct, quantity: event.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.modalFooter}>
                                    <button  onClick={(event) => onSave()}>Save</button>
                                    <button  onClick={onCancel}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </div>   
            </div>
        </div>
    )
}
export default ProductManagement;