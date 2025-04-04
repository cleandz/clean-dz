
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-green-dark text-white rtl">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-10 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">وايست وايز عربيا</h3>
            <p className="text-sm">تطبيق لإدارة النفايات المنزلية، يساعد في تحسين البيئة وتثمين النفايات</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط مفيدة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">الرئيسية</Link></li>
              <li><Link to="/waste-tracking" className="hover:underline">تتبع النفايات</Link></li>
              <li><Link to="/report-issues" className="hover:underline">الإبلاغ عن المشكلات</Link></li>
              <li><Link to="/collection-points" className="hover:underline">نقاط الجمع</Link></li>
              <li><Link to="/rewards" className="hover:underline">المكافآت</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <p className="text-sm mb-2">البريد الإلكتروني: info@wastewise.com</p>
            <p className="text-sm mb-2">الهاتف: +123456789</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-green text-center">
          <p className="text-sm">© {new Date().getFullYear()} وايست وايز عربيا. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
