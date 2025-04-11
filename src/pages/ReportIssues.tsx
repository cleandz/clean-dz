
import React, { useState } from 'react';
import { Camera, MapPin, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Report {
  id: string;
  date: string;
  type: string;
  location: string;
  description: string;
  status: 'pending' | 'inProgress' | 'resolved';
}

const ReportIssues = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([
    { 
      id: '1', 
      date: '2025-04-01', 
      type: 'نقطة سوداء', 
      location: 'حي السلام، شارع الزهور', 
      description: 'تراكم النفايات بشكل كبير وعدم جمعها منذ أسبوع',
      status: 'inProgress'
    },
    { 
      id: '2', 
      date: '2025-04-03', 
      type: 'حاويات تالفة', 
      location: 'حي النور، شارع السلام', 
      description: 'حاويات متضررة وغير صالحة للاستعمال',
      status: 'resolved'
    },
  ]);

  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    description: '',
    imageFile: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport({
      ...newReport,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewReport({
      ...newReport,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewReport({
        ...newReport,
        imageFile: e.target.files[0]
      });
    }
  };

  const submitReport = () => {
    if (!newReport.type || !newReport.location || !newReport.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const report: Report = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: newReport.type,
      location: newReport.location,
      description: newReport.description,
      status: 'pending'
    };

    setReports([...reports, report]);

    // إعادة تعيين النموذج
    setNewReport({
      type: '',
      location: '',
      description: '',
      imageFile: null
    });

    toast({
      title: "تم الإبلاغ بنجاح",
      description: "سيتم مراجعة البلاغ في أقرب وقت ممكن",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'inProgress':
        return 'قيد المعالجة';
      case 'resolved':
        return 'تم الحل';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">الإبلاغ عن المشكلات</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>إبلاغ جديد</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type">نوع المشكلة</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('type', value)}
                        value={newReport.type}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع المشكلة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="نقطة سوداء">نقطة سوداء</SelectItem>
                          <SelectItem value="حاويات تالفة">حاويات تالفة</SelectItem>
                          <SelectItem value="عدم جمع النفايات">عدم جمع النفايات</SelectItem>
                          <SelectItem value="تسرب نفايات">تسرب نفايات</SelectItem>
                          <SelectItem value="أخرى">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">الموقع</Label>
                      <div className="relative">
                        <Input 
                          id="location" 
                          name="location" 
                          placeholder="أدخل الموقع التفصيلي" 
                          value={newReport.location} 
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                        <MapPin className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">وصف المشكلة</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="اكتب وصفاً تفصيلياً للمشكلة" 
                        rows={4}
                        value={newReport.description} 
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="image">صورة (اختياري)</Label>
                      <div className="mt-1 flex items-center">
                        <label htmlFor="image" className="cursor-pointer border rounded p-4 w-full text-center hover:bg-gray-50 transition">
                          <Camera className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500">انقر لإضافة صورة</span>
                          <Input 
                            id="image" 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {newReport.imageFile && (
                        <p className="mt-2 text-sm text-gray-600">
                          تم اختيار: {newReport.imageFile.name}
                        </p>
                      )}
                    </div>
                    
                    <Button className="w-full" onClick={submitReport}>
                      <Send className="ml-2 h-4 w-4" /> إرسال البلاغ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>بلاغاتي</CardTitle>
                </CardHeader>
                <CardContent>
                  {reports.length > 0 ? (
                    <div className="space-y-4">
                      {reports.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{report.type}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(report.status)}`}>
                              {getStatusText(report.status)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mb-1">
                            <MapPin className="inline h-4 w-4 ml-1" />
                            {report.location}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <div className="text-xs text-gray-400">
                            تاريخ الإبلاغ: {report.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>لا توجد بلاغات حتى الآن</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>معلومات مفيدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <div className="bg-primary-green/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        <span className="text-primary-green">1</span>
                      </div>
                      <p>سيتم مراجعة البلاغات خلال 24 ساعة من استلامها.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-primary-green/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        <span className="text-primary-green">2</span>
                      </div>
                      <p>الصور تساعد في تسريع عملية معالجة البلاغات.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-primary-green/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        <span className="text-primary-green">3</span>
                      </div>
                      <p>يمكنك متابعة حالة البلاغ من خلال قائمة "بلاغاتي".</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportIssues;
