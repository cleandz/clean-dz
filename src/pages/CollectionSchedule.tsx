
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// تمثيل لبيانات مواقيت الجمع
const scheduleData = [
  {
    district: 'حي الأمل',
    schedules: [
      { day: 'السبت', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الثلاثاء', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الخميس', time: '14:00 - 16:00', type: 'نفايات قابلة للتدوير' },
    ]
  },
  {
    district: 'حي النور',
    schedules: [
      { day: 'الأحد', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الأربعاء', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الجمعة', time: '14:00 - 16:00', type: 'نفايات قابلة للتدوير' },
    ]
  },
  {
    district: 'حي السلام',
    schedules: [
      { day: 'الاثنين', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الخميس', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'السبت', time: '14:00 - 16:00', type: 'نفايات قابلة للتدوير' },
    ]
  },
  {
    district: 'حي الزيتون',
    schedules: [
      { day: 'الثلاثاء', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الجمعة', time: '08:00 - 10:00', type: 'نفايات عضوية' },
      { day: 'الأحد', time: '14:00 - 16:00', type: 'نفايات قابلة للتدوير' },
    ]
  }
];

const CollectionSchedule = () => {
  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">مواقيت جمع النفايات</h1>
          
          <div className="mb-8 bg-primary-green/10 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-primary-green rounded-full">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">جدول مواقيت جمع النفايات في وادي ليلي</h2>
                <p className="text-gray-600">يمكنك معرفة مواقيت جمع النفايات في حيك من خلال الجداول أدناه.</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="by-district">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="by-district">حسب الأحياء</TabsTrigger>
              <TabsTrigger value="by-day">حسب الأيام</TabsTrigger>
            </TabsList>
            
            <TabsContent value="by-district" className="space-y-8">
              {scheduleData.map((district, index) => (
                <Card key={index}>
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 ml-2 text-primary-green" />
                      {district.district}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-right">اليوم</th>
                            <th className="px-4 py-3 text-right">الوقت</th>
                            <th className="px-4 py-3 text-right">نوع النفايات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {district.schedules.map((schedule, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-3 border-t">{schedule.day}</td>
                              <td className="px-4 py-3 border-t">{schedule.time}</td>
                              <td className="px-4 py-3 border-t">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  schedule.type.includes('عضوية') 
                                    ? 'bg-primary-green/20 text-primary-green' 
                                    : 'bg-secondary-blue/20 text-secondary-blue'
                                }`}>
                                  {schedule.type}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="by-day">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => (
                  <Card key={index}>
                    <CardHeader className="bg-gradient-to-r from-primary-green/20 to-secondary-blue/20">
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 ml-2" />
                        {day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="space-y-4">
                        {scheduleData
                          .flatMap(district => 
                            district.schedules
                              .filter(schedule => schedule.day === day)
                              .map(schedule => ({
                                district: district.district,
                                time: schedule.time,
                                type: schedule.type
                              }))
                          )
                          .map((item, idx) => (
                            <li key={idx} className="flex justify-between border-b pb-2">
                              <div>
                                <p className="font-medium">{item.district}</p>
                                <p className="text-sm text-gray-500">{item.time}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs h-fit ${
                                item.type.includes('عضوية') 
                                  ? 'bg-primary-green/20 text-primary-green' 
                                  : 'bg-secondary-blue/20 text-secondary-blue'
                              }`}>
                                {item.type}
                              </span>
                            </li>
                          ))}
                        {scheduleData.flatMap(district => 
                          district.schedules.filter(schedule => schedule.day === day)
                        ).length === 0 && (
                          <li className="text-center text-gray-500 py-4">
                            لا توجد جولات جمع مجدولة لهذا اليوم
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800">
              <span className="font-bold">ملاحظة: </span>
              قد تتغير مواقيت الجمع في العطل الرسمية أو في حالة الظروف الطارئة. يرجى متابعة الإعلانات الرسمية.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionSchedule;
