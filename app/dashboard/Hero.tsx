"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import EmployeeTable from './EmployeeTable';

interface Employee {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
}

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: 'STAFF',
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/records');
        const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
        setEmployees(data);
      } catch (err: any) {
        setError('Failed to fetch employees: ' + (err.message || 'Unknown error'));
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/records", newEmployee);
      console.log("Employee added:", response.data);
      setEmployees([...employees, response.data]);
      setNewEmployee({ firstname: '', lastname: '', email: '', phone: '', role: 'STAFF' });
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error adding employee:", error);
      setError('Failed to add employee: ' + (error.message || 'Unknown error'));
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/records/${id}`);
      if (response.data.success) {
        setEmployees(employees.filter((emp) => emp._id !== id));
      } else {
        setError(response.data.error || 'Failed to delete employee');
      }
    } catch (err: any) {
      setError('Failed to delete employee: ' + (err.message || 'Unknown error'));
    }
  };

  const handleEdit = (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
    );
  };

  return (
    <div className="py-24 px-16 h-screen">
      <div className="flex justify-between mb-24">
        <h1 className="text-[#013C61] text-3xl font-semibold">Employees</h1>
        <button 
          className="bg-[#2BDA53] text-center px-10 py-2 text-white rounded hover:bg-green-600 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Add New
        </button>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <EmployeeTable 
        employees={filteredEmployees} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-bold text-[#013C61] mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstname" 
                  placeholder="Enter first name" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all" 
                  onChange={handleChange} 
                  value={newEmployee.firstname}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastname" 
                  placeholder="Enter last name" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all" 
                  onChange={handleChange} 
                  value={newEmployee.lastname}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all" 
                  onChange={handleChange} 
                  value={newEmployee.email}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Enter phone number" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all" 
                  onChange={handleChange} 
                  value={newEmployee.phone}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  name="role" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all text-gray-600"
                  onChange={handleChange}
                  value={newEmployee.role}
                >
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewEmployee({ firstname: '', lastname: '', email: '', phone: '', role: 'STAFF' });
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#2BDA53] text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;