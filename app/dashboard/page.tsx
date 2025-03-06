"use client";
import { useSession } from "next-auth/react";

const Dashboard = () => {
    const { data: session } = useSession();

    if (session) {
      return (
        <div>
        
        </div>
      );
    }
};

export default Dashboard;
