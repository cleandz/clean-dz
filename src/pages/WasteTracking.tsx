
import React, { useState, useEffect } from 'react';
import { 
  Trash2, Plus, ArrowRight, Save, RefreshCcw, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { WasteEntry } from '@/types/supabase';

const WasteTracking = () => {
  const { toast } = useToast();
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();

  const [entries, setEntries] = useState<WasteEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    waste_type: '',
    weight: 0,
    recyclable: false
  });
  
  // Fetch waste entries on component mount
  useEffect(() => {
    if (user) {
      fetchWasteEntries();
    }
  }, [user]);

  const fetchWasteEntries = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('waste_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      if (data) {
        setEntries(data);
      }
    } catch (error) {
      console.error('Error fetching waste entries:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorFetching'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    
    setIsSubmitting(true);
    
    try {
      const entryToInsert = {
        user_id: user.id,
        date: newEntry.date,
        waste_type: newEntry.waste_type,
        weight: newEntry.weight,
        recyclable: newEntry.recyclable
      };
      
      const { data, error } = await supabase
        .from('waste_entries')
        .insert(entryToInsert)
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        // Add the new entry to the list
        setEntries([data[0], ...entries]);
        
        // Reset the form
        setNewEntry({
          date: new Date().toISOString().split('T')[0],
          waste_type: '',
          weight: 0,
          recyclable: false
        });
        
        toast({
          title: t('successTitle'),
          description: t('wasteEntryAdded'),
        });
      }
    } catch (error) {
      console.error('Error adding waste entry:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorSubmit'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('waste_entries')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setEntries(entries.filter(entry => entry.id !== id));
      toast({
        title: t('successTitle'),
        description: t('entryDeleted'),
      });
    } catch (error) {
      console.error('Error deleting waste entry:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorDelete'),
        variant: "destructive",
      });
    }
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

  const getWasteTypeTranslation = (type: string) => {
    switch(type) {
      case 'بلاستيك': return t('plastic');
      case 'ورق': return t('paper');
      case 'زجاج': return t('glass');
      case 'معدن': return t('metal');
      case 'طعام': return t('food');
      case 'أخرى': return t('otherWaste');
      default: return type;
    }
  };

  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl font-bold mb-6">{t('wasteTracking')}</h1>
      
      {/* Mobile-friendly stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalWaste')}</p>
                <h3 className="text-2xl font-bold">{formatNumber(parseFloat(getTotalWeight()))} {t('kg')}</h3>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Trash2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('recyclable')}</p>
                <h3 className="text-2xl font-bold">{formatNumber(parseFloat(getRecyclableWeight()))} {t('kg')}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <RefreshCcw className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('nonRecyclable')}</p>
                <h3 className="text-2xl font-bold">{formatNumber(parseFloat(getNonRecyclableWeight()))} {t('kg')}</h3>
              </div>
              <div className="p-3 bg-red-500/10 rounded-full">
                <ArrowRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card - Enhanced for mobile */}
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-primary-green/10 to-primary-green/5 rounded-t-lg">
            <CardTitle>{t('addNewRecord')}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">{t('date')}</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={newEntry.date} 
                  onChange={handleInputChange}
                  className="w-full mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="waste_type">{t('wasteType')}</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('waste_type', value)}
                  value={newEntry.waste_type || undefined}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder={t('selectWasteType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="بلاستيك">{t('plastic')}</SelectItem>
                    <SelectItem value="ورق">{t('paper')}</SelectItem>
                    <SelectItem value="زجاج">{t('glass')}</SelectItem>
                    <SelectItem value="معدن">{t('metal')}</SelectItem>
                    <SelectItem value="طعام">{t('food')}</SelectItem>
                    <SelectItem value="أخرى">{t('otherWaste')}</SelectItem>
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
                  className="w-full mt-1"
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
              
              <Button
                className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
                onClick={addWasteEntry}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={`h-4 w-4 animate-spin ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} /> 
                    {t('adding')}
                  </>
                ) : (
                  <>
                    <Plus className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} /> 
                    {t('addRecord')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Records Table */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-primary-green/10 to-primary-green/5 rounded-t-lg">
            <CardTitle>{t('wasteRecords')}</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-green" />
              </div>
            ) : entries.length > 0 ? (
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-start">{t('date')}</th>
                      <th className="py-3 px-4 text-start">{t('type')}</th>
                      <th className="py-3 px-4 text-start">{t('weight')} ({t('kg')})</th>
                      <th className="py-3 px-4 text-start">{t('recyclable')}</th>
                      <th className="py-3 px-4 text-start">{t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{entry.date}</td>
                        <td className="py-3 px-4">{getWasteTypeTranslation(entry.waste_type)}</td>
                        <td className="py-3 px-4">{formatNumber(entry.weight)}</td>
                        <td className="py-3 px-4">
                          {entry.recyclable ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              {t('yes')}
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              {t('no')}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" onClick={() => removeEntry(entry.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                  <Trash2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">{t('noRecordsYet')}</h3>
                <p className="mt-2 text-gray-500">
                  {t('startAddingWaste')}
                </p>
              </div>
            )}
            
            {entries.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="flex items-center">
                  <Save className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} /> 
                  {t('saveReport')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteTracking;
