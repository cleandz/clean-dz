import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { WasteType, WasteEntry, Report } from '@/types/supabase';
import { useAuth } from '@/contexts/auth';
import { Loader2, Scale, Trash2 } from 'lucide-react';

const wasteEntryFormSchema = z.object({
  wasteType: z.enum(['organic', 'plastic', 'glass', 'metal']),
  weight: z.string().refine(value => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: "Weight must be a positive number.",
  }),
});

type WasteEntryFormValues = z.infer<typeof wasteEntryFormSchema>;

const WasteTracking = () => {
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();
  
  const [reports, setReports] = useState<Report[]>([]);
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<WasteEntryFormValues>({
    resolver: zodResolver(wasteEntryFormSchema),
    defaultValues: {
      wasteType: 'plastic',
      weight: '',
    },
  });

  useEffect(() => {
    if (user) {
      fetchReports();
      fetchWasteEntries();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingReports'),
        variant: 'destructive',
      });
    }
  };

  const fetchWasteEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('waste_entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setWasteEntries(data || []);
    } catch (error) {
      console.error('Error fetching waste entries:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingWasteEntries'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: WasteEntryFormValues) => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    if (!selectedReport) {
      toast({
        title: t('error'),
        description: t('selectReport'),
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create a new waste entry
      const { error } = await supabase
        .from('waste_entries')
        .insert({
          report_id: selectedReport.id,
          user_id: user.id,
          waste_type: data.wasteType as WasteType,
          weight: Number(data.weight),
          verified: false
        });
      
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('wasteEntrySubmitted'),
      });
      
      // Reset form
      form.reset();
      setSelectedReport(null);
      
      // Reload entries
      fetchWasteEntries();
      
    } catch (error) {
      console.error('Error submitting waste entry:', error);
      toast({
        title: t('error'),
        description: t('errorSubmittingWasteEntry'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('wasteTracking')}</h1>
        <div className="flex items-center">
          <Trash2 className="h-5 w-5 mr-2 text-primary-green" />
          <span className="text-gray-600">{t('trackWaste')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('addWasteEntry')}</CardTitle>
            <CardDescription>{t('enterWasteDetails')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="wasteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('wasteType')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectWasteType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="organic">{t('organic')}</SelectItem>
                          <SelectItem value="plastic">{t('plastic')}</SelectItem>
                          <SelectItem value="glass">{t('glass')}</SelectItem>
                          <SelectItem value="metal">{t('metal')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('weightInKg')}</FormLabel>
                      <FormControl>
                        <Input placeholder="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid gap-2">
                  <FormLabel>{t('selectReport')}</FormLabel>
                  <Select onValueChange={(value) => {
                      const selected = reports.find(report => report.id === value);
                      setSelectedReport(selected || null);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectExistingReport')} />
                    </SelectTrigger>
                    <SelectContent>
                      {reports.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          {t('report')} #{report.id} - {new Date(report.created_at).toLocaleDateString(language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('addEntry')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Waste Entries List */}
        <Card>
          <CardHeader>
            <CardTitle>{t('wasteEntries')}</CardTitle>
            <CardDescription>{t('yourWasteEntries')}</CardDescription>
          </CardHeader>
          <CardContent>
            {wasteEntries.length === 0 ? (
              <p>{t('noWasteEntries')}</p>
            ) : (
              <div className="space-y-3">
                {wasteEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between border rounded-md p-2">
                    <div>
                      <p className="text-sm font-medium">{t(entry.waste_type as any)}</p>
                      <p className="text-xs text-gray-500">{t('weight')}: {formatNumber(entry.weight)} kg</p>
                      <p className="text-xs text-gray-500">{t('report')} #{entry.report_id}</p>
                    </div>
                    <Badge variant={entry.verified ? "secondary" : "outline"}>
                      {entry.verified ? t('verified') : t('pending')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteTracking;
