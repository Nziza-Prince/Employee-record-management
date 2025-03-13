"use client";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import AddNewDialog from "./AddNewDialog";
import DeleteComponent from "./DeleteComponent";
import UpdateComponent from "./UpdateComponent";

interface Record {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
}

const Hero = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${backendUrl}/records`);
        const data = response.data;
        const responseArray = Array.isArray(data) ? data : [data];
        setRecords(responseArray[0].data);
        setFilteredRecords(responseArray[0].data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecords();
  }, []);

  const handleDeleteSuccess = (deletedId: string) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record._id !== deletedId));
  };

  useEffect(() => {
    setFilteredRecords(
      records.filter(
        (record) =>
          record.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, records]);

  return (
    <div className="py-24 px-16 h-screen">
      <div className="flex justify-between mb-24">
        <h1 className="text-[#013C61] text-3xl font-semibold">Employees</h1>
        <AddNewDialog setRecords={setRecords} />
      </div>

      <div className="bg-white flex justify-between px-8 py-10 mb-12 rounded-lg shadow">
        <h1 className="text-4xl text-[#013C61] font-bold">Josh Bakery Ventures</h1>
        <h2 className="text-[#013C61] text-lg">62, Bode Thomas, Surulere, Lagos</h2>
      </div>

      <div className="flex gap-6">
        <div className="flex gap-3 border px-3 py-1 border-gray-400 rounded items-center">
          <input
            className="border-none focus:outline-none text-gray-600"
            type="text"
            placeholder="Search employee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredRecords.map((record) => (
              <Table.Row key={record._id}>
                <Table.RowHeaderCell>{record.firstname}</Table.RowHeaderCell>
                <Table.Cell>{record.lastname}</Table.Cell>
                <Table.Cell>{record.email}</Table.Cell>
                <Table.Cell>{record.phone}</Table.Cell>
                <Table.Cell>{record.role}</Table.Cell>
                <Table.Cell className="flex gap-5">
                  <DeleteComponent id={record._id} isDeleting={setDeleteLoading} onDeleteSuccess={handleDeleteSuccess} />
                  <UpdateComponent setRecords={setRecords} id={record._id} />
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
