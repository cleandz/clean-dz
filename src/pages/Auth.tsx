
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  // Translations
  const translations = {
    ar: {
      authentication: 'المصادقة',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      fullName: 'الاسم الكامل',
      loginDescription: 'أدخل بيانات اعتماد حسابك أدناه',
      registerDescription: 'أنشئ حسابًا جديدًا',
      submit: 'إرسال',
      invalidEmail: 'الرجاء إدخال بريد إلكتروني صالح',
      requiredEmail: 'البريد الإلكتروني مطلوب',
      passwordLength: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      passwordsNotMatch: 'كلمات المرور غير متطابقة',
      requiredPassword: 'كلمة المرور مطلوبة',
      requiredFullName: 'الاسم الكامل مطلوب',
    },
    en: {
      authentication: 'Authentication',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      loginDescription: 'Enter your account credentials below',
      registerDescription: 'Create a new account',
      submit: 'Submit',
      invalidEmail: 'Please enter a valid email',
      requiredEmail: 'Email is required',
      passwordLength: 'Password must be at least 6 characters',
      passwordsNotMatch: 'Passwords do not match',
      requiredPassword: 'Password is required',
      requiredFullName: 'Full name is required',
    },
    fr: {
      authentication: 'Authentification',
      login: 'Se connecter',
      register: "S'inscrire",
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      fullName: 'Nom complet',
      loginDescription: 'Entrez vos identifiants ci-dessous',
      registerDescription: 'Créer un nouveau compte',
      submit: 'Soumettre',
      invalidEmail: 'Veuillez entrer un email valide',
      requiredEmail: "L'email est requis",
      passwordLength: 'Le mot de passe doit comporter au moins 6 caractères',
      passwordsNotMatch: 'Les mots de passe ne correspondent pas',
      requiredPassword: 'Le mot de passe est requis',
      requiredFullName: 'Le nom complet est requis',
    },
  };

  const t = translations[language];

  // Login form schema
  const loginSchema = z.object({
    email: z.string().email(t.invalidEmail).min(1, t.requiredEmail),
    password: z.string().min(1, t.requiredPassword),
  });

  // Register form schema
  const registerSchema = z.object({
    fullName: z.string().min(1, t.requiredFullName),
    email: z.string().email(t.invalidEmail).min(1, t.requiredEmail),
    password: z.string().min(6, t.passwordLength),
    confirmPassword: z.string().min(6, t.passwordLength),
  }).refine(data => data.password === data.confirmPassword, {
    message: t.passwordsNotMatch,
    path: ['confirmPassword'],
  });

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', fullName: '' },
  });

  // Handle login form submission
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register form submission
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      await signUp(values.email, values.password, values.fullName);
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>{t.authentication}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="register">{t.register}</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <CardDescription className="text-center mb-4">{t.loginDescription}</CardDescription>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.email}</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.password}</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {t.login}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <CardDescription className="text-center mb-4">{t.registerDescription}</CardDescription>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="fullName"
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
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.email}</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.password}</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.confirmPassword}</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {t.register}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
