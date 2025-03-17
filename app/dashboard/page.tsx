import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Hero from './Hero';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>

    <div className="bg-gray-100 flex flex-col h-screen">
     <Navbar />
       <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
         <Hero/>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}