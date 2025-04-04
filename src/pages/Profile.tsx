
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch Algerian regions
  const { data: regions = [] } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('algerian_regions')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Translations
  const translations = {
    ar: {
      profileTitle: 'الملف الشخصي',
      profileDescription: 'إدارة معلومات حسابك',
      email: 'البريد الإلكتروني',
      fullName: 'الاسم الكامل',
      avatarUrl: 'رابط الصورة الرمزية',
      region: 'المنطقة',
      city: 'المدينة',
      save: 'حفظ التغييرات',
      selectRegion: 'اختر المنطقة',
      requiredFullName: 'الاسم الكامل مطلوب',
      profileLoading: 'جاري تحميل الملف الشخصي...',
      invalidUrl: 'الرجاء إدخال رابط صالح',
    },
    en: {
      profileTitle: 'Profile',
      profileDescription: 'Manage your account information',
      email: 'Email',
      fullName: 'Full Name',
      avatarUrl: 'Avatar URL',
      region: 'Region',
      city: 'City',
      save: 'Save Changes',
      selectRegion: 'Select a region',
      requiredFullName: 'Full name is required',
      profileLoading: 'Loading profile...',
      invalidUrl: 'Please enter a valid URL',
    },
    fr: {
      profileTitle: 'Profil',
      profileDescription: 'Gérer les informations de votre compte',
      email: 'Email',
      fullName: 'Nom complet',
      avatarUrl: "URL de l'avatar",
      region: 'Région',
      city: 'Ville',
      save: 'Enregistrer les modifications',
      selectRegion: 'Sélectionnez une région',
      requiredFullName: 'Le nom complet est requis',
      profileLoading: 'Chargement du profil...',
      invalidUrl: 'Veuillez entrer une URL valide',
    },
  };

  const t = translations[language];

  // Profile form schema
  const profileSchema = z.object({
    full_name: z.string().min(1, t.requiredFullName),
    avatar_url: z.string().url(t.invalidUrl).optional().or(z.literal('')),
    region: z.string().optional(),
    city: z.string().optional(),
  });

  type ProfileFormValues = z.infer<typeof profileSchema>;

  // Profile form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      avatar_url: '',
      region: '',
      city: '',
    },
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
        region: profile.region || '',
        city: profile.city || '',
      });
    }
  }, [profile, form]);

  // Handle profile update
  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await updateProfile(values);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state if still loading auth or profile
  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p>{t.profileLoading}</p>
      </div>
    );
  }

  // Get the region name based on the current language
  const getRegionName = (region: any) => {
    if (!region) return '';
    
    switch (language) {
      case 'ar':
        return region.name_ar;
      case 'fr':
        return region.name_fr;
      default:
        return region.name_en;
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                ) : null}
                <AvatarFallback className="text-lg">
                  {profile.full_name ? getInitials(profile.full_name) : <User />}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{t.profileTitle}</CardTitle>
            <CardDescription>{t.profileDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4">
                  <FormLabel>{t.email}</FormLabel>
                  <Input value={profile.email} disabled />
                </div>
                
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.fullName}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.avatarUrl}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.region}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectRegion} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.id} value={region.name}>
                              {getRegionName(region)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.city}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {t.save}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
