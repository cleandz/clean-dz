import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth';
import { useAdmin } from '@/contexts/AdminContext';
import { Report, WasteEntry, WasteType } from '@/types/supabase';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Update the WasteTracking component to use the correct fields for WasteEntry type
const WasteTracking = () => {
  const { t } = useTranslations();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<WasteEntry[]>([]);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newEntry, setNewEntry] = useState<Partial<WasteEntry>>({
    waste_type: 'organic',
    weight: 1,
  });
  const { language } = useLanguage();
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchEntries();
  }, [user, navigate]);
  
  // Update fetchEntries to map to the correct WasteEntry type
  const fetchEntries = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // First fetch user's reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (reportsError) throw reportsError;
      setUserReports(reportsData as Report[]);
      
      // Then fetch waste entries
      const { data: entriesData, error: entriesError } = await supabase
        .from('waste_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (entriesError) throw entriesError;
      setEntries(entriesData as WasteEntry[]);
      
    } catch (error) {
      console.error('Error fetching waste entries:', error);
      toast({
        title: t.error,
        description: t.errorFetchingData,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Update handleCreateEntry to use the correct fields
  const handleCreateEntry = async () => {
    if (!user || !selectedReport) return;
    
    try {
      const entryData: Partial<WasteEntry> = {
        user_id: user.id,
        report_id: selectedReport.id,
        waste_type: newEntry.waste_type as WasteType,
        weight: newEntry.weight || 0,
        verified: false,
      };
      
      const { data, error } = await supabase
        .from('waste_entries')
        .insert(entryData)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: t.success,
        description: t.wasteEntryCreated,
      });
      
      setEntries(prev => [data as WasteEntry, ...prev]);
      setShowDialog(false);
      setNewEntry({
        waste_type: 'organic',
        weight: 1,
      });
      setSelectedReport(null);
      
    } catch (error) {
      console.error('Error creating waste entry:', error);
      toast({
        title: t.error,
        description: t.errorCreatingEntry,
        variant: 'destructive',
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({
      ...newEntry,
      weight: parseFloat(e.target.value),
    });
  };
  
  const handleWasteTypeChange = (value: WasteType | null) => {
    if (value) {
      setNewEntry({
        ...newEntry,
        waste_type: value,
      });
    }
  };
  
  const renderReportSelectItem = (report: Report) => {
    const formattedDate = new Date(report.created_at || '').toLocaleDateString(
      language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-FR' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
    return (
      <SelectItem key={report.id} value={report.id} onSelect={() => setSelectedReport(report)}>
        {t.report} - {formattedDate}
      </SelectItem>
    );
  };
  
  // Update the waste entry card rendering
  const renderWasteEntry = (entry: WasteEntry) => {
    const formattedDate = new Date(entry.created_at).toLocaleDateString(
      language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-FR' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
    
    const getStatusBadge = () => {
      if (entry.verified) {
        return <Badge className="bg-green-500">{t.verified}</Badge>;
      }
      return <Badge variant="outline">{t.pending}</Badge>;
    };
    
    return (
      <Card key={entry.id} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{t.wasteEntry}</CardTitle>
            {getStatusBadge()}
          </div>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t.wasteType}</p>
              <p className="font-medium">{t[entry.waste_type]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.weight}</p>
              <p className="font-medium">{entry.weight} {t.kg}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{t.wasteTracking}</h1>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            {entries.length > 0 ? (
              entries.map(entry => renderWasteEntry(entry))
            ) : (
              <Card className="mb-4">
                <CardContent>
                  <p>{t.noWasteEntries}</p>
                </CardContent>
              </Card>
            )}
            
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button>{t.addWasteEntry}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.addWasteEntry}</DialogTitle>
                  <DialogDescription>{t.createWasteEntry}</DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="report">{t.selectReport}</Label>
                    <Select onValueChange={(value) => {
                      const report = userReports.find(r => r.id === value);
                      setSelectedReport(report || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectReport} />
                      </SelectTrigger>
                      <SelectContent>
                        {userReports.map(report => renderReportSelectItem(report))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="wasteType">{t.wasteType}</Label>
                    <Select onValueChange={(value) => handleWasteTypeChange(value as WasteType)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectWasteType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">{t.organic}</SelectItem>
                        <SelectItem value="plastic">{t.plastic}</SelectItem>
                        <SelectItem value="glass">{t.glass}</SelectItem>
                        <SelectItem value="metal">{t.metal}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">{t.weight}</Label>
                    <Input
                      type="number"
                      id="weight"
                      placeholder="1"
                      value={newEntry.weight?.toString() || '1'}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Button type="submit" onClick={handleCreateEntry}>
                  {t.createEntry}
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default WasteTracking;
