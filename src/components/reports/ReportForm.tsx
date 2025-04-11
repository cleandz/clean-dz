
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
import LocationPicker from '@/components/map/LocationPicker';
import { WasteType } from '@/types/supabase';

const reportFormSchema = z.object({
  wasteType: z.enum(['organic', 'plastic', 'glass', 'metal'], {
    required_error: "Please select a waste type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

interface ReportFormProps {
  onSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSuccess }) => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();
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
      onSuccess();
      
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
  );
};

export default ReportForm;
