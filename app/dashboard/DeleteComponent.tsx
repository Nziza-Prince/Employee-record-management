import axios from 'axios';
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

interface Props{
   id:string
   isDeleting:(deleting:boolean)=>void
   onDeleteSuccess:(deletedId:string)=>void
}

const DeleteComponent = ({id,isDeleting,onDeleteSuccess}:Props) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const handleDelete = async ()=>{
      isDeleting(true)
      
      try{
        const deletedRecord = await axios.delete(`${backendUrl}/records/${id}`)
        console.log("Deleted Successfully",deletedRecord)
        onDeleteSuccess(id)
      }catch(err){
        console.error(err)
        isDeleting(false)
      }finally{
        isDeleting(false)
      }
    }
  return (
    <div>
      <FaRegTrashAlt className='cursor-pointer' onClick={handleDelete}/>
    </div>
  )
}

export default DeleteComponent
