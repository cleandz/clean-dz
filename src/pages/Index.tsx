
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, AlertTriangle, Map, Award, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/home/StatCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow">
        {/* قسم الترويسة الرئيسية */}
        <section className="bg-gradient-to-r from-primary-green to-secondary-blue py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">نحو بيئة أفضل مع وايست وايز عربيا</h1>
            <p className="text-xl text-white mb-8">منصة متكاملة لإدارة النفايات المنزلية وتحسين البيئة</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-green hover:bg-gray-100">
                <Link to="/waste-tracking">ابدأ بتتبع النفايات</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/report-issues">الإبلاغ عن مشكلة</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* قسم الإحصائيات */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">إحصائيات سريعة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="كمية النفايات المجمعة" 
                value="١٥٠٠ طن" 
                icon={<Trash className="h-6 w-6 text-white" />}
                color="bg-primary-green text-white" 
              />
              <StatCard 
                title="المواد المعاد تدويرها" 
                value="٤٠٠ طن" 
                icon={<Recycle className="h-6 w-6 text-white" />}
                color="bg-secondary-blue text-white" 
              />
              <StatCard 
                title="نقاط الجمع" 
                value="١٢٠ نقطة" 
                icon={<Map className="h-6 w-6 text-white" />}
                color="bg-amber-500 text-white" 
              />
              <StatCard 
                title="البلاغات المعالجة" 
                value="٨٥ بلاغ" 
                icon={<AlertTriangle className="h-6 w-6 text-white" />}
                color="bg-red-500 text-white" 
              />
            </div>
          </div>
        </section>

        {/* قسم الخدمات */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">خدماتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-primary-green/20 rounded-full flex items-center justify-center mb-4">
                    <Trash className="h-8 w-8 text-primary-green" />
                  </div>
                  <h3 className="font-bold mb-2">تتبع النفايات</h3>
                  <p className="text-gray-600 mb-4">سجل وتتبع كمية النفايات المنتجة وأنواعها</p>
                  <Button variant="link" className="text-primary-green">
                    <Link to="/waste-tracking">التفاصيل</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="font-bold mb-2">الإبلاغ عن المشكلات</h3>
                  <p className="text-gray-600 mb-4">أبلغ عن النقاط السوداء والتجاوزات البيئية</p>
                  <Button variant="link" className="text-red-500">
                    <Link to="/report-issues">التفاصيل</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-secondary-blue/20 rounded-full flex items-center justify-center mb-4">
                    <Map className="h-8 w-8 text-secondary-blue" />
                  </div>
                  <h3 className="font-bold mb-2">نقاط الجمع</h3>
                  <p className="text-gray-600 mb-4">تصفح خريطة نقاط جمع النفايات القريبة منك</p>
                  <Button variant="link" className="text-secondary-blue">
                    <Link to="/collection-points">التفاصيل</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="font-bold mb-2">المكافآت</h3>
                  <p className="text-gray-600 mb-4">احصل على مكافآت لمساهمتك في تثمين النفايات</p>
                  <Button variant="link" className="text-amber-500">
                    <Link to="/rewards">التفاصيل</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* قسم الترويج */}
        <section className="py-16 bg-primary-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">انضم إلينا اليوم</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">ساهم في تحسين البيئة وإدارة النفايات المنزلية بشكل فعال مع وايست وايز عربيا</p>
            <Button size="lg" className="bg-white text-primary-green hover:bg-gray-100">
              <Link to="/waste-tracking">ابدأ الآن</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
