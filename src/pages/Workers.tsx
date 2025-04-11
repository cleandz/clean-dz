
import React, { useEffect } from 'react';
import { Building, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Workers = () => {
  useEffect(() => {
    // This is just to log that the page was viewed
    console.log('Workers page visited');
  }, []);

  const handleRedirectToSNID = () => {
    // Open SNID website in a new tab
    window.open('https://snid.dz', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">فضاء العمال</h1>
          
          <Card className="mb-8">
            <CardHeader className="bg-primary-green text-white">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                <span>منصة SNID لإحصاء النفايات</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-xl mb-4">مرحبًا بكم في فضاء العمال الخاص بمنصة وادي ليلي بروبر</p>
                <p className="text-gray-600 mb-6">
                  هذه المنصة مخصصة لعمال النظافة لتسجيل كميات النفايات المجمعة عن طريق خدمة SNID.
                  انقر على الزر أدناه للانتقال إلى موقع SNID مباشرة.
                </p>
                
                <Button 
                  size="lg" 
                  className="bg-primary-green hover:bg-primary-green/90"
                  onClick={handleRedirectToSNID}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  الانتقال إلى منصة SNID
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-bold mb-3">تعليمات الاستخدام:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary-green/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary-green">1</span>
                    </div>
                    <p>سجل الدخول باستخدام بيانات الاعتماد الخاصة بك في منصة SNID</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary-green/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary-green">2</span>
                    </div>
                    <p>قم بتسجيل كميات النفايات المجمعة حسب النوع والوزن</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary-green/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary-green">3</span>
                    </div>
                    <p>تأكد من حفظ البيانات قبل تسجيل الخروج من المنصة</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 flex items-center">
              <span className="font-bold ml-2">ملاحظة:</span>
              للحصول على الدعم الفني أو في حالة وجود أي مشاكل، يرجى التواصل مع المشرف المباشر.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Workers;
