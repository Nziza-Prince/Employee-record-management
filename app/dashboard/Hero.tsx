"use client";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import AddNewDialog from "./AddNewDialog";
import DeleteComponent from "./DeleteComponent";
interface Record{
  _id:string
  firstname:string
  lastname:string
  email:string
  phone:string
  role:string
}

const Hero = () => {
  const [records,setRecords] = useState<Record[]>([])
  const [deleteLoading,setDeleteLoading] = useState(false) 

  useEffect(()=>{
    const fetchRecords = async ()=>{
      try{
        const response = await axios.get("http://localhost:3000/api/records")
        const data = response.data
        const responseArray = Array.isArray(data) ? data :[data]
        setRecords(responseArray[0].data)
        console.log(responseArray[0].data)
      }catch(err){
        console.error(err)
      }
    }

    fetchRecords()
  },[])
  
const handleDeleteSuccess = (deletedId:string)=>{
  setRecords(prevRecords=>prevRecords.filter(record=>record._id !==deletedId))
  
}
useEffect(() => {
  console.log("Updated Records:", records);
}, [records]); // Runs every time `records` changes


  return (
    <div className="py-24 px-16 h-screen">
      <div className="flex justify-between mb-24">
        <h1 className="text-[#013C61] text-3xl font-semibold">Employees</h1>
        <AddNewDialog setRecords={setRecords}/>
      </div>

      <div className="bg-white flex justify-between px-8 py-10 mb-12 rounded-lg shadow">
        <h1 className="text-4xl text-[#013C61] font-bold">Josh Bakery Ventures</h1>
        <h2 className="text-[#013C61] text-lg">62, Bode Thomas, Surulere, Lagos</h2>
      </div>

      <div className="flex gap-6">
        <select
          name="role"
          className="border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2BDA53] px-3 py-2 rounded text-gray-600"
        >
          <option value="" disabled>Change role</option>
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button className="bg-[#2BDA53] text-white px-10 py-2 rounded hover:bg-green-600 transition-colors">
          Change
        </button>
        <div className="flex gap-3 border px-3 py-1 border-gray-400 rounded items-center">
          <input
            className="border-none focus:outline-none text-gray-600"
            type="text"
            placeholder="Enter staff here..."
          />
          <CiSearch className="w-6 h-6 text-gray-600" />
        </div>
      </div>
      
      <div className="mt-10">
      <Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>FirstName</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>LastName</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>


		</Table.Row>
	</Table.Header>

	<Table.Body>
    {records.map((record,index)=>(
		<Table.Row key={record._id || index}>
			<Table.RowHeaderCell>{record.firstname}</Table.RowHeaderCell>
			<Table.Cell>{record.lastname}</Table.Cell>
			<Table.Cell>{record.email}</Table.Cell>
			<Table.Cell>{record.phone}</Table.Cell>
			<Table.Cell>{record.role}</Table.Cell>
			<Table.Cell className="flex gap-5">
        <DeleteComponent id={record._id} isDeleting={setDeleteLoading} onDeleteSuccess={handleDeleteSuccess}/>
        <FaPen className="cursor-pointer"/>
    </Table.Cell>
      </Table.Row>

    ))}
	</Table.Body>
</Table.Root>
  
  </div>
  {deleteLoading && (
        <div className="fixed top-0 left-0 w-full bg-gray-700 text-white text-center p-3">
          Deleting record... Please wait.
        </div>
      )}

</div>
     
  );
};

export default Hero;