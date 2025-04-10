
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Report, WasteType } from '@/types/supabase';
import { Loader2, Upload, MapPin } from 'lucide-react';
import LocationPicker from '@/components/map/LocationPicker';

const reportFormSchema = z.object({
  wasteType: z.enum(['organic', 'plastic', 'glass', 'metal'], {
    required_error: "Please select a waste type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const ReportIssues = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number; } | null>(null);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      wasteType: 'organic',
      description: '',
    },
  });

  const fetchUserReports = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setUserReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingReports'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReports();
  }, [user]);

  const uploadImage = async (file: File) => {
    try {
      setIsSubmitting(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `reports/${fileName}`;
      
      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file);
      
      if (error) throw error;
      
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      if (data) {
        setImageUrl(data.publicUrl);
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: t('error'),
        description: t('errorUploadingImage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: ReportFormValues) => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    if (!imageUrl) {
      toast({
        title: t('error'),
        description: t('imageRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          image_url: imageUrl,
          latitude: location?.lat,
          longitude: location?.lng,
          waste_type: data.wasteType as WasteType,
          description: data.description,
        });
      
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('reportSubmitted'),
      });
      
      // Reset form
      form.reset();
      setImageUrl('');
      setLocation(null);
      
      // Refresh reports list
      fetchUserReports();
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: t('error'),
        description: t('errorSubmittingReport'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('reportIssues')}</h1>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('submitNewReport')}</CardTitle>
          <CardDescription>{t('provideDetails')}</CardDescription>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('description')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('reportDetails')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div>
                  <FormLabel className="block mb-2">{t('location')}</FormLabel>
                  <LocationPicker onLocationSelect={setLocation} initialLocation={location} />
                </div>
                
                <div>
                  <FormLabel className="block mb-2">{t('image')}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" disabled={isSubmitting} asChild>
                      <label htmlFor="upload-image" className="cursor-pointer">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('uploading')}
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            {t('uploadImage')}
                          </>
                        )}
                      </label>
                    </Button>
                    <Input
                      type="file"
                      id="upload-image"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          uploadImage(file);
                        }
                      }}
                    />
                    {imageUrl && (
                      <img src={imageUrl} alt="Uploaded" className="h-10 w-10 rounded-md object-cover" />
                    )}
                  </div>
                </div>
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  t('submitReport')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{t('yourReports')}</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          </div>
        ) : userReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle>{t('report')} #{report.id.substring(0, 8)}</CardTitle>
                  <CardDescription>
                    {t('submittedOn')} {new Date(report.created_at).toLocaleDateString(language)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={report.image_url} alt="Reported Waste" className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm text-gray-600">{t('wasteType')}: {t(report.waste_type)}</p>
                  <p className="text-sm text-gray-600">{t('status')}: {t(report.status || 'new')}</p>
                  <p className="text-sm text-gray-600">{t('description')}: {report.description}</p>
                  {report.latitude && report.longitude && (
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>{t('noReportsYet')}</p>
        )}
      </div>
    </div>
  );
};

export default ReportIssues;
