
import React, { useState } from 'react';
import { 
  Trash2, Plus, ArrowRight, Save, RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface WasteEntry {
  id: string;
  date: string;
  type: string;
  weight: number;
  recyclable: boolean;
}

const WasteTracking = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<WasteEntry[]>([
    { id: '1', date: '2025-04-01', type: 'بلاستيك', weight: 2.5, recyclable: true },
    { id: '2', date: '2025-04-02', type: 'ورق', weight: 1.8, recyclable: true },
    { id: '3', date: '2025-04-03', type: 'طعام', weight: 3.2, recyclable: false },
  ]);
  
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    weight: 0,
    recyclable: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewEntry({
      ...newEntry,
      [name]: value
    });
  };

  const addWasteEntry = () => {
    if (!newEntry.type || newEntry.weight <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    const entry: WasteEntry = {
      id: Date.now().toString(),
      date: newEntry.date,
      type: newEntry.type,
      weight: newEntry.weight,
      recyclable: newEntry.recyclable
    };
    
    setEntries([...entries, entry]);
    
    // إعادة تعيين النموذج
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      type: '',
      weight: 0,
      recyclable: false
    });
    
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة بيانات النفايات بنجاح",
    });
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف السجل بنجاح",
    });
  };

  const getTotalWeight = () => {
    return entries.reduce((total, entry) => total + entry.weight, 0).toFixed(2);
  };
  
  const getRecyclableWeight = () => {
    return entries.filter(entry => entry.recyclable)
      .reduce((total, entry) => total + entry.weight, 0).toFixed(2);
  };
  
  const getNonRecyclableWeight = () => {
    return entries.filter(entry => !entry.recyclable)
      .reduce((total, entry) => total + entry.weight, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">تتبع النفايات</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">إجمالي النفايات</p>
                    <h3 className="text-2xl font-bold">{getTotalWeight()} كغ</h3>
                  </div>
                  <div className="p-3 bg-primary-green/10 rounded-full">
                    <Trash2 className="h-6 w-6 text-primary-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">قابل للتدوير</p>
                    <h3 className="text-2xl font-bold">{getRecyclableWeight()} كغ</h3>
                  </div>
                  <div className="p-3 bg-secondary-blue/10 rounded-full">
                    <RefreshCcw className="h-6 w-6 text-secondary-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">غير قابل للتدوير</p>
                    <h3 className="text-2xl font-bold">{getNonRecyclableWeight()} كغ</h3>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-full">
                    <ArrowRight className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>إضافة سجل جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">التاريخ</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      value={newEntry.date} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">نوع النفايات</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('type', value)}
                      value={newEntry.type || "select_type"} 
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع النفايات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="بلاستيك">بلاستيك</SelectItem>
                        <SelectItem value="ورق">ورق</SelectItem>
                        <SelectItem value="زجاج">زجاج</SelectItem>
                        <SelectItem value="معدن">معدن</SelectItem>
                        <SelectItem value="طعام">طعام</SelectItem>
                        <SelectItem value="أخرى">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">الوزن (كغ)</Label>
                    <Input 
                      id="weight" 
                      name="weight" 
                      type="number" 
                      min="0"
                      step="0.1"
                      value={newEntry.weight} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      id="recyclable" 
                      name="recyclable" 
                      type="checkbox" 
                      className="w-4 h-4 text-primary-green"
                      checked={newEntry.recyclable} 
                      onChange={handleInputChange}
                    />
                    <Label htmlFor="recyclable">قابل للتدوير</Label>
                  </div>
                  
                  <Button className="w-full" onClick={addWasteEntry}>
                    <Plus className="mr-2 h-4 w-4" /> إضافة سجل
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>سجلات النفايات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-right border-b">التاريخ</th>
                        <th className="p-3 text-right border-b">النوع</th>
                        <th className="p-3 text-right border-b">الوزن (كغ)</th>
                        <th className="p-3 text-right border-b">قابل للتدوير</th>
                        <th className="p-3 text-right border-b">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.length > 0 ? (
                        entries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{entry.date}</td>
                            <td className="p-3">{entry.type}</td>
                            <td className="p-3">{entry.weight}</td>
                            <td className="p-3">
                              {entry.recyclable ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">نعم</span>
                              ) : (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">لا</span>
                              )}
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" onClick={() => removeEntry(entry.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-gray-500">
                            لا توجد سجلات بعد
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-left">
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" /> حفظ التقرير
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WasteTracking;
