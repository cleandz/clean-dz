
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface WasteEntry {
  id: string;
  date: string;
  waste_type: string;
  weight: number;
  recyclable: boolean;
}

const WasteTracking = () => {
  const { toast } = useToast();
  const { language, formatNumber } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();
  const [entries, setEntries] = useState<WasteEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    waste_type: '',
    weight: 0,
    recyclable: false
  });

  // Fetch waste entries from database
  useEffect(() => {
    const fetchWasteEntries = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('waste_entries')
          .select('*')
          .order('date', { ascending: false });
          
        if (error) {
          console.error('Error fetching waste entries:', error);
          toast({
            title: t('errorTitle'),
            description: error.message,
            variant: "destructive",
          });
        } else if (data) {
          setEntries(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWasteEntries();
  }, [user, toast, t]);

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

  const addWasteEntry = async () => {
    if (!user) {
      toast({
        title: t('errorTitle'),
        description: t('loginRequired'),
        variant: "destructive",
      });
      return;
    }
    
    if (!newEntry.waste_type || newEntry.weight <= 0) {
      toast({
        title: t('errorTitle'),
        description: t('errorFields'),
        variant: "destructive",
      });
      return;
    }
    
    try {
      const entryToInsert = {
        id: uuidv4(),
        user_id: user.id,
        date: newEntry.date,
        waste_type: newEntry.waste_type,
        weight: newEntry.weight,
        recyclable: newEntry.recyclable
      };
      
      const { error } = await supabase
        .from('waste_entries')
        .insert(entryToInsert);
        
      if (error) {
        console.error('Error adding waste entry:', error);
        toast({
          title: t('errorTitle'),
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Add to local state
      setEntries([entryToInsert as WasteEntry, ...entries]);
      
      // Reset form
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        waste_type: '',
        weight: 0,
        recyclable: false
      });
      
      toast({
        title: t('successTitle'),
        description: t('successDescription'),
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorSubmit'),
        variant: "destructive",
      });
    }
  };

  const removeEntry = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('waste_entries')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting waste entry:', error);
        toast({
          title: t('errorTitle'),
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Remove from local state
      setEntries(entries.filter(entry => entry.id !== id));
      
      toast({
        title: t('successTitle'),
        description: t('entryDeleted'),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getTotalWeight = () => {
    return entries.reduce((total, entry) => total + Number(entry.weight), 0).toFixed(2);
  };
  
  const getRecyclableWeight = () => {
    return entries.filter(entry => entry.recyclable)
      .reduce((total, entry) => total + Number(entry.weight), 0).toFixed(2);
  };
  
  const getNonRecyclableWeight = () => {
    return entries.filter(entry => !entry.recyclable)
      .reduce((total, entry) => total + Number(entry.weight), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">{t('wasteTracking')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{t('totalWaste')}</p>
                    <h3 className="text-2xl font-bold">{formatNumber(Number(getTotalWeight()))} {t('kg')}</h3>
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
                    <p className="text-sm text-gray-500">{t('recyclable')}</p>
                    <h3 className="text-2xl font-bold">{formatNumber(Number(getRecyclableWeight()))} {t('kg')}</h3>
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
                    <p className="text-sm text-gray-500">{t('nonRecyclable')}</p>
                    <h3 className="text-2xl font-bold">{formatNumber(Number(getNonRecyclableWeight()))} {t('kg')}</h3>
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
                <CardTitle>{t('addNewRecord')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">{t('date')}</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      value={newEntry.date} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="waste_type">{t('wasteType')}</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('waste_type', value)}
                      value={newEntry.waste_type || "select_type"} 
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectWasteType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastic">{t('plastic')}</SelectItem>
                        <SelectItem value="paper">{t('paper')}</SelectItem>
                        <SelectItem value="glass">{t('glass')}</SelectItem>
                        <SelectItem value="metal">{t('metal')}</SelectItem>
                        <SelectItem value="food">{t('food')}</SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">{t('weight')} ({t('kg')})</Label>
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
                    <Label htmlFor="recyclable">{t('recyclable')}</Label>
                  </div>
                  
                  <Button className="w-full" onClick={addWasteEntry}>
                    <Plus className="mr-2 h-4 w-4" /> {t('addRecord')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{t('wasteRecords')}</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">{t('loading')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className={`p-3 ${language === 'ar' ? 'text-right' : 'text-left'} border-b`}>{t('date')}</th>
                          <th className={`p-3 ${language === 'ar' ? 'text-right' : 'text-left'} border-b`}>{t('type')}</th>
                          <th className={`p-3 ${language === 'ar' ? 'text-right' : 'text-left'} border-b`}>{t('weight')} ({t('kg')})</th>
                          <th className={`p-3 ${language === 'ar' ? 'text-right' : 'text-left'} border-b`}>{t('recyclable')}</th>
                          <th className={`p-3 ${language === 'ar' ? 'text-right' : 'text-left'} border-b`}>{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.length > 0 ? (
                          entries.map((entry) => (
                            <tr key={entry.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">{entry.date}</td>
                              <td className="p-3">{t(entry.waste_type as any)}</td>
                              <td className="p-3">{formatNumber(Number(entry.weight))}</td>
                              <td className="p-3">
                                {entry.recyclable ? (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{t('yes')}</span>
                                ) : (
                                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">{t('no')}</span>
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
                              {t('noRecordsYet')}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                
                <div className="mt-4 text-left">
                  <Button variant="outline" disabled={entries.length === 0}>
                    <Save className="mr-2 h-4 w-4" /> {t('saveReport')}
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
