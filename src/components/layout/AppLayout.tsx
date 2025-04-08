
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-6 px-4 pb-20"> {/* Add padding at bottom for bottom navigation */}
        <Outlet />
      </div>
      <BottomNavigation />
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
