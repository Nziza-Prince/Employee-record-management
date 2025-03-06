'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt, FaPenAlt } from 'react-icons/fa';
import Modal from './Modal'; // Adjust the import path as needed

interface Employee {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onDelete?: (id: string) => Promise<void>; // Updated to handle async deletion
  onEdit?: (employee: Employee) => void; // Callback for edit action
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete, onEdit }) => {
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Local error state

  const handleEditClick = (employee: Employee) => {
    setEditEmployee({ ...employee });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editEmployee) return;
    try {
      const response = await axios.put(
        `http://localhost:3000/api/records/${editEmployee._id}`,
        editEmployee
      );
      if (response.data.success && onEdit) {
        onEdit(response.data.data); // Notify parent to update state
        setIsModalOpen(false);
        setEditEmployee(null);
      } else {
        setError(response.data.error || 'Failed to update employee');
      }
    } catch (err: any) {
      setError('Failed to update employee: ' + (err.message || 'Unknown error'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editEmployee) {
      setEditEmployee((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (!onDelete) return;
    try {
      const response = await axios.delete(`http://localhost:3000/api/records/${id}`);
      if (response.data.success) {
        await onDelete(id); // Trigger parent to handle state update
      } else {
        setError(response.data.error || 'Failed to delete employee');
      }
    } catch (err: any) {
      setError('Failed to delete employee: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="bg-white p-6 mt-6 rounded-lg shadow">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="p-2">{employee.firstname}</td>
                <td className="p-2">{employee.lastname}</td>
                <td className="p-2">{employee.email}</td>
                <td className="p-2">{employee.phone}</td>
                <td className="p-2">{employee.role}</td>
                <td className="p-2 flex gap-3">
                  {onDelete && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(employee._id)}
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(employee)}
                    >
                      <FaPenAlt size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-2 text-center text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditEmployee(null);
          setError(null); // Clear error on close
        }}
        title="Edit Employee"
        onSave={handleSave}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={editEmployee?.firstname || ''}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={editEmployee?.lastname || ''}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={editEmployee?.email || ''}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={editEmployee?.phone || ''}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={editEmployee?.role || ''}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BDA53] transition-all text-gray-600"
              required
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeTable;