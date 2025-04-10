import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/auth';
import { Loader2, User, Mail, Map, MapPin } from 'lucide-react';

const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }).max(50, {
    message: "Full name must be less than 50 characters.",
  }).optional(),
  city: z.string().max(50, {
    message: "City must be less than 50 characters.",
  }).optional(),
  region: z.string().max(50, {
    message: "Region must be less than 50 characters.",
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { user, profile, updateProfile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: profile?.full_name || "",
      city: profile?.city || "",
      region: profile?.region || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      await updateProfile({
        full_name: data.fullName,
        city: data.city,
        region: data.region,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <Card>
        <CardHeader>
          <CardTitle>{t('profileSettings')}</CardTitle>
          <CardDescription>{t('updateYourProfile')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <User className="h-10 w-10 text-gray-500" />
            <div>
              <h2 className="text-lg font-semibold">{profile?.full_name || user.email}</h2>
              <Badge variant="secondary">{profile?.full_name ? t('member') : t('guest')}</Badge>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('yourFullName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('city')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('yourCity')} {...field} />
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
                    <FormLabel>{t('region')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('yourRegion')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('updating')}...
                  </>
                ) : (
                  t('updateProfile')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            <Mail className="inline-block h-4 w-4 mr-1" /> {user.email}
          </div>
          <Button variant="ghost" onClick={refreshProfile}>
            {t('refreshProfile')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
