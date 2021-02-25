import React, { useState } from 'react'
import SideBar from '../SideBar/SideBar'
import TabBar from '../TabBar/TabBar'
import Style from '../Category/Category.module.css'
import * as Data from '../data/data'
import {RiDeleteBinLine} from 'react-icons/ri'
import Modal from 'react-modal'

Modal.setAppElement("#root")

function Category() {

    let [isModalOpen ,setModelOpen] = useState(false)
    let [categories, setCategories] = useState(Data.categories)
    let [newCategory, setNewCategory] = useState("")


    const onSave = () => {
        let categoryId = 0 
        if(Data.categories.length > 0) {
            categoryId = Data.categories[Data.categories.length-1].id + 1
        } 
        Data.categories.push({id: categoryId, name: newCategory})
        setCategories(Data.categories)
        setNewCategory("")
        setModelOpen(false)
    }

    const onRemove = (categoryId) => {
        console.log(Data.categories)
        let allCategories = Array.from(Data.categories)
        let index = getIndex(categoryId, Data.categories)
        allCategories.splice(index, 1)
        Data.categories.splice(index, 1)
        console.log(allCategories)
        setCategories(allCategories)
        console.log(allCategories)
    }

    
    const onRemoveTrial = (categoryId) => {
        console.log(Data.categories)
        //let allCategories = Array.from(Data.categories)
        let index = getIndex(categoryId, Data.categories)
        Data.categories.splice(index, 1)
        console.log(Data.categories)
        setCategories(Data.categories)
        console.log(Data.categories)
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
            <div className={Style.root}>
                <SideBar activeTab={0}/>
                <div className={Style.container}>
                    <div className={Style.actions}>
                        <h1 className={Style.title}>Categories</h1>
                        <button onClick={()=>{setModelOpen(true)}}>Add</button>
                    </div>
                    <div className={Style.list}>
                    {
                        categories.map((category)=>{
                            return (
                                <div key={category.id} className={Style.listItem}>
                                    <p>{category.name}</p>
                                    <p><RiDeleteBinLine onClick={()=>onRemove(category.id)}/></p>
                                </div>  
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} className={Style.modal} style={{overlay:{backgroundColor:'grey', opacity: 0.95}}}>
                <div className={Style.modalContainer}>
                    <h2 className={Style.modalHeader}>Add Category</h2>
                    <div className={Style.modalBody}>
                        <input type="textbox" placeholder="Enter Category Name" value={newCategory} onChange={(event)=>{setNewCategory(event.target.value)}}/>
                    </div>
                    <div className={Style.modalFooter}>
                        <center>
                            <button  onClick={(event) => onSave()}>Save</button>
                            <button  onClick={()=>{setModelOpen(false)}}>Cancel</button>
                        </center>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Category