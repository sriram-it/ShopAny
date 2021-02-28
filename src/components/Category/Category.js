import React, { useState } from 'react'
import SideBar from '../SideBar/SideBar'
import TabBar from '../TabBar/TabBar'
import Style from '../Category/Category.module.css'
import * as Data from '../data/data'
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsPlus} from 'react-icons/bs'
import Modal from 'react-modal'

Modal.setAppElement("#root")

function Category() {

    let [isModalOpen ,setModelOpen] = useState(false)
    let [categories, setCategories] = useState(Data.categories)
    let [newCategory, setNewCategory] = useState({id: null, name: ""})


    const onSave = () => {
        let categoryId = 0 

        //Update
        if(newCategory.id) {
            let index = getIndex(newCategory.id, Data.categories)
            Data.categories.splice(index, 1, {id: newCategory.id, name: newCategory.name})
        } else { //Save
            if(Data.categories.length > 0) {
                categoryId = Data.categories[Data.categories.length-1].id + 1
            } 
            Data.categories.push({id: categoryId, name: newCategory.name})
        }
        setCategories(Data.categories)
        setNewCategory({id: null, name: ""})
        setModelOpen(false)
        console.log(Data.categories)
    }

    const onEdit = (category) => {
        setNewCategory(category)
        setModelOpen(true)
    }

    const onCancel = () => {
        console.log("cancel called")
        setNewCategory({id: null, name: ""}) 
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

    
    // const onRemoveTrial = (categoryId) => {
    //     console.log(Data.categories)
    //     //let allCategories = Array.from(Data.categories)
    //     let index = getIndex(categoryId, Data.categories)
    //     Data.categories.splice(index, 1)
    //     console.log(Data.categories)
    //     setCategories(Data.categories)
    //     console.log(Data.categories)
    // }

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
                <SideBar activeTab={1}/>
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
                                    <div className={Style.listActions}>
                                        <p><AiOutlineEdit onClick={()=>onEdit(category)}/></p>
                                        <p><RiDeleteBinLine onClick={()=>onRemove(category.id)}/></p>
                                    </div>
                                </div>  
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} className={Style.modal} style={{overlay:{backgroundColor:'grey', opacity: 0.95, position: 'fixed', zIndex: 2}}}>
                <div className={Style.modalContainer}>
                    <h2 className={Style.modalHeader}>Add Category</h2>
                    <div className={Style.modalBody}>
                        <input type="textbox" className={Style.fields} placeholder="Enter Category Name" value={newCategory.name} onChange={(event)=>{setNewCategory({id:newCategory.id, name: event.target.value})}}/>
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
}

export default Category