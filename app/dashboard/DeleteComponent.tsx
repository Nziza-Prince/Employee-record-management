import axios from 'axios';
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'sonner';

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
        toast.success("Removed the record successfully")
      }catch(err){
        console.error(err)
        isDeleting(false)
        toast.error("Couldnt delete the record")
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
