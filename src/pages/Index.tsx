
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, AlertTriangle, Map, Award, Trash, Calendar, Building, BarChart3 } from 'lucide-react';
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">وادي ليلي بروبر - Ouedlili Propre</h1>
            <p className="text-xl text-white mb-8">منصة متكاملة لإدارة النفايات وتحسين البيئة في وادي ليلي</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-green hover:bg-gray-100">
                <Link to="/waste-tracking">تتبع النفايات</Link>
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
            <h2 className="text-2xl font-bold text-center mb-8">إحصائيات وادي ليلي</h2>
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
                    <Building className="h-8 w-8 text-primary-green" />
                  </div>
                  <h3 className="font-bold mb-2">فضاء العمال</h3>
                  <p className="text-gray-600 mb-4">منصة خاصة بعمال النظافة للوصول المباشر لموقع SNID</p>
                  <Button variant="link" className="text-primary-green">
                    <Link to="/workers">الدخول للمنصة</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="font-bold mb-2">الإبلاغ عن التجاوزات</h3>
                  <p className="text-gray-600 mb-4">أبلغ عن النقاط السوداء والتجاوزات البيئية</p>
                  <Button variant="link" className="text-red-500">
                    <Link to="/report-issues">الإبلاغ</Link>
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
                    <Link to="/collection-points">عرض الخريطة</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="font-bold mb-2">مواقيت الجمع</h3>
                  <p className="text-gray-600 mb-4">تعرف على مواقيت جمع النفايات في حيك</p>
                  <Button variant="link" className="text-amber-500">
                    <Link to="/collection-schedule">المواقيت</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* قسم المكافآت */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">نظام المكافآت</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary-green/20">
                      <Award className="h-8 w-8 text-primary-green" />
                    </div>
                    <h3 className="text-xl font-bold">اربح نقاط</h3>
                  </div>
                  <p className="text-gray-600 mb-4">شارك في الأنشطة البيئية واجمع النقاط من خلال:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                      <span>المساهمة في جمع النفايات</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                      <span>المشاركة في حملات التنظيف</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                      <span>الإبلاغ عن التجاوزات البيئية</span>
                    </li>
                  </ul>
                  <Button className="mt-4 w-full">
                    <Link to="/rewards">عرض رصيد النقاط</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-secondary-blue/20">
                      <BarChart3 className="h-8 w-8 text-secondary-blue" />
                    </div>
                    <h3 className="text-xl font-bold">استبدل مكافآتك</h3>
                  </div>
                  <p className="text-gray-600 mb-4">يمكنك استبدال نقاطك بمكافآت متنوعة:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary-blue"></div>
                      <span>قسائم خصم من سوق الرحمة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary-blue"></div>
                      <span>أشجار مجانية للزراعة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary-blue"></div>
                      <span>دورات تدريبية وورش عمل</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary-blue"></div>
                      <span>أولوية في الحصول على خدمات البلدية</span>
                    </li>
                  </ul>
                  <Button className="mt-4 w-full" variant="outline">
                    <Link to="/rewards">عرض المكافآت المتاحة</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* قسم الترويج */}
        <section className="py-16 bg-primary-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">شارك في جعل وادي ليلي أنظف</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">ساهم معنا في تحسين البيئة وإدارة النفايات بشكل فعال في وادي ليلي</p>
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
