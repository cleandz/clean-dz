
import React, { useState } from 'react';
import { MapPin, Search, Clock, Phone, Calendar, Info, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  wasteTypes: string[];
  hours: string;
  phone: string;
  lastCollection: string;
}

const CollectionPoints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wasteTypeFilter, setWasteTypeFilter] = useState('');
  
  const collectionPoints: CollectionPoint[] = [
    {
      id: '1',
      name: 'مركز إعادة التدوير الرئيسي',
      address: 'حي السلام، شارع الصناعة',
      wasteTypes: ['بلاستيك', 'ورق', 'زجاج', 'معدن'],
      hours: 'السبت - الخميس: 08:00 - 18:00',
      phone: '0123456789',
      lastCollection: '2025-04-04',
    },
    {
      id: '2',
      name: 'نقطة جمع الشمال',
      address: 'حي النور، شارع الأمل',
      wasteTypes: ['بلاستيك', 'ورق'],
      hours: 'السبت - الأربعاء: 09:00 - 17:00',
      phone: '0123456788',
      lastCollection: '2025-04-03',
    },
    {
      id: '3',
      name: 'مركز التدوير الخاص',
      address: 'حي الزهور، شارع الورود',
      wasteTypes: ['إلكترونيات', 'بطاريات'],
      hours: 'الأحد - الخميس: 10:00 - 16:00',
      phone: '0123456787',
      lastCollection: '2025-04-02',
    },
    {
      id: '4',
      name: 'نقطة جمع المنطقة الصناعية',
      address: 'المنطقة الصناعية، شارع العمل',
      wasteTypes: ['معدن', 'زجاج', 'مواد كيميائية'],
      hours: 'السبت - الخميس: 07:00 - 19:00',
      phone: '0123456786',
      lastCollection: '2025-04-01',
    },
  ];

  const filteredPoints = collectionPoints.filter((point) => {
    const matchesSearch = point.name.includes(searchTerm) || 
                          point.address.includes(searchTerm);
    
    const matchesWasteType = wasteTypeFilter === '' || 
                             point.wasteTypes.includes(wasteTypeFilter);
    
    return matchesSearch && matchesWasteType;
  });

  const wasteTypeOptions = ['بلاستيك', 'ورق', 'زجاج', 'معدن', 'إلكترونيات', 'بطاريات', 'مواد كيميائية'];

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">نقاط الجمع</h1>
          
          {/* عنصر الخريطة (يتطلب مكتبة خرائط متكاملة) */}
          <div className="bg-gray-200 rounded-lg h-64 md:h-96 mb-8 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 mx-auto mb-2 text-primary-green" />
              <p className="text-gray-600">هنا ستظهر خريطة نقاط الجمع</p>
              <p className="text-sm text-gray-500">يمكن استخدام Google Maps أو OpenStreetMap</p>
            </div>
          </div>
          
          {/* أدوات البحث والتصفية */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="ابحث عن نقطة جمع..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Select
                  value={wasteTypeFilter}
                  onValueChange={setWasteTypeFilter}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="تصفية حسب نوع النفايات" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأنواع</SelectItem>
                    {wasteTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="hidden md:block" variant="outline">
                <MapPin className="mr-2 h-4 w-4" /> عرض الأقرب إلي
              </Button>
            </div>
          </div>
          
          {/* قائمة نقاط الجمع */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoints.length > 0 ? (
              filteredPoints.map((point) => (
                <Card key={point.id} className="overflow-hidden">
                  <div className="h-4 bg-primary-green" />
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">{point.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>{point.address}</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">أنواع النفايات:</p>
                          <div className="flex flex-wrap gap-2">
                            {point.wasteTypes.map((type) => (
                              <span 
                                key={type}
                                className="bg-primary-green/10 text-primary-green text-xs px-2 py-1 rounded-full"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>{point.hours}</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span dir="ltr">{point.phone}</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>آخر جمع: {point.lastCollection}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="w-full" variant="outline">عرض التفاصيل</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
                <p className="text-gray-500">
                  لم يتم العثور على نقاط جمع تطابق معايير البحث
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPoints;
