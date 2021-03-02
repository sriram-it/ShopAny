import React, { useEffect, useState } from 'react'
import Style from '../OrderManagement/OrderManagement.module.css'
import SideBar from '../SideBar/SideBar';
import TabBar from '../TabBar/TabBar'
import Modal from 'react-modal'
import * as Data from '../data/data'
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'

function OrderManagement() {

    let [isModalOpen ,setModelOpen] = useState(false)
    let [orders, setOrders] = useState([])
    let [updateOrder, setUpdateOrder] = useState({id: null, userId: null, userName: null, userEmail: null , productId: null, productName: null, productPrice: null, sellerName: null, sellerCompanyName: null, status: null, placedDate: null, deliveryDate: null})

    useEffect(()=>{
        setOrders(filterCurrentOrders())
    }, [])


    const onEdit = (order) => {
        setUpdateOrder(order)
        setModelOpen(true)
    }

    const onSave = () => {
        let index = getIndex(updateOrder.id, Data.orders)
        Data.orders.splice(index, 1, {...updateOrder, status: updateOrder.status, deliveryDate: updateOrder.deliveryDate})

        setOrders(filterCurrentOrders())
        setUpdateOrder({id: null, userId: null, userName: null, userEmail: null , productId: null, productName: null, productPrice: null, sellerName: null, sellerCompanyName: null, status: null, placedDate: null, deliveryDate: null}) 
        setModelOpen(false)
    }

    const onCancel = () => {
        console.log("cancel called")
        setUpdateOrder({id: null, userId: null, userName: null, userEmail: null , productId: null, productName: null, productPrice: null, sellerName: null, sellerCompanyName: null, status: null, placedDate: null, deliveryDate: null}) 
        setModelOpen(false)
    }

    const filterCurrentOrders = () => {
        let sellerOrder= []
        for(let i = 0; i < Data.orders.length; i++) {
            if(Data.orders[i].sellerId == Data.currentUser[0].id) {
                sellerOrder.push(Data.orders[i])
            }
        }
        return sellerOrder
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

    function formatDate(dateValue) {
        let formattedDate = null
        if(typeof(dateValue) == "string") {
            formattedDate = new Date(dateValue.replace(/-/g, '\/')).toLocaleDateString("en-US")
        } else {
            formattedDate = dateValue.toLocaleDateString("en-US")
        }
        return formattedDate
    }

    function searchHandler(value) {
        let searchArray = []
        for(let i=0; i < Data.orders.length; i++) {
            if( (Data.orders[i].sellerId == Data.currentUser[0].id) && (Data.orders[i].userEmail.toLowerCase().includes(value.toLowerCase()))) {
                searchArray.push(Data.orders[i])
            }            
        }
        setOrders(searchArray)
    }

    return(
        <div>
            <TabBar isSearchHide={false} searchHandler={searchHandler}/>
            <div className={Style.root}>
                <SideBar activeTab={3}/>
                <div className={Style.container}>
                    <div className={Style.actions}>
                        <h1 className={Style.title}>Order Management</h1>
                        {/* <button onClick={()=>{setModelOpen(true)}}>Add</button> */}
                    </div>
                    <div className={Style.list}>
                    {
                        orders.map((order)=>{
                            return (
                                <div>
                                    <div key={order.id} className={Style.listItem}>
                                        <div>
                                            <img src={`/images/${order.productId}.jpg`} width="200px" height="200px"></img>
                                        </div>
                                        <div>
                                            <p className={Style.formField}>{`Product Name: ${order.productName}`}</p>
                                            <p className={Style.formField}>{`Product Price: $${parseFloat(order.productPrice).toFixed(2)}`}</p>
                                            <p className={Style.formField}>{`Customer Name: ${order.userName}`}</p>
                                            <p className={Style.formField}>{`Customer Email: ${order.userEmail}`}</p>
                                        </div>
                                        <div>
                                            <p className={Style.formField}>{`Order Id: ${order.id}`}</p>
                                            <p className={Style.formField} style={{color:'green', fontWeight: 650}}>{`Status: ${Data.orderStatus[order.status-1].name}`}</p>
                                            <p className={Style.formField}>{`Placed Date: ${formatDate(order.placedDate)}`}</p>
                                            <p className={Style.formField} style={{color:'blue', fontWeight: 650}}>{`Delivery Date: ${formatDate(order.deliveryDate)}`}</p>
                                        </div>
                                        {/* <p>{order.productName}</p> */}
                                        <div className={Style.listActions}>
                                            <p><AiOutlineEdit style={{marginLeft:'40px'}}onClick={()=>onEdit(order)}/></p>
                                        </div>
                                    </div>  
                                    <Modal isOpen={isModalOpen} className={Style.modal} style={{overlay:{backgroundColor:'grey', opacity: 0.95, position: 'fixed', zIndex: 2}}}>
                                        <div className={Style.modalContainer}>
                                            <h2 className={Style.modalHeader}>Update Order</h2>
                                            <div className={Style.modalBody}>
                                                <div>
                                                    <div className={Style.fieldContainer}>
                                                        <label className={Style.fields} style={{border: 0}}>Status</label>
                                                        <select className={Style.fields} value={updateOrder.status} onChange={(event) => (setUpdateOrder({...updateOrder, status: event.target.value}))}>
                                                        {Data.orderStatus.map((status) => {
                                                            return <option value={status.id}>{status.name}</option>
                                                        })}
                                                        </select>
                                                    </div>
                                                    <div className={Style.fieldContainer}>
                                                        <label className={Style.fields} style={{border: 0}}>Expected Delivery Date</label>
                                                        <input  className={Style.fields} type="date" value={updateOrder.deliveryDate} onChange={(event) => (setUpdateOrder({...updateOrder, deliveryDate: event.target.value}))}></input>
                                                    </div>
                                                </div>
                                                {/* <input type="textbox" placeholder="Enter Category Name" value={updateOrder.name} onChange={(event)=>{setUpdateOrder({id:order.id, name: event.target.value})}}/> */}
                                            </div>
                                            <div className={Style.modalFooter}>
                                                <center>
                                                    <button  onClick={(event) => onSave()}>Save</button>
                                                    <button  onClick={onCancel}>Cancel</button>
                                                </center>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            )
                        })
                    }
                    </div>
                   
                </div>   
            </div>
        </div>
    )
}

export default OrderManagement;
