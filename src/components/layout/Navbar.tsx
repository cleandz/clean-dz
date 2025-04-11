
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary-green shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">وايست وايز عربيا</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4 rtl">
              <Link to="/" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">الرئيسية</Link>
              <Link to="/waste-tracking" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">تتبع النفايات</Link>
              <Link to="/report-issues" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">الإبلاغ عن المشكلات</Link>
              <Link to="/collection-points" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">نقاط الجمع</Link>
              <Link to="/rewards" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">المكافآت</Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* القائمة المنسدلة للموبايل */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-green">
            <Link to="/" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">الرئيسية</Link>
            <Link to="/waste-tracking" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">تتبع النفايات</Link>
            <Link to="/report-issues" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">الإبلاغ عن المشكلات</Link>
            <Link to="/collection-points" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">نقاط الجمع</Link>
            <Link to="/rewards" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">المكافآت</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
