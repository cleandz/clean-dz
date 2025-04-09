import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Send, AlertTriangle, Loader2, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

interface Report {
  id: string;
  type: string;
  location: string;
  description: string;
  status: 'pending' | 'inProgress' | 'resolved';
  image_url?: string | null;
  created_at: string;
  user_id: string;
}

const ReportIssues = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);

  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    description: '',
    imageFile: null as File | null,
  });

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: t('errorTitle'),
        description: t('loginRequired'),
        variant: "destructive",
      });
      navigate('/auth');
    } else {
      fetchReports();
    }
  }, [user, navigate, language]);

  // Fetch user's reports
  const fetchReports = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('issue_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setReports(data as unknown as Report[]);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport({
      ...newReport,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewReport({
      ...newReport,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewReport({
        ...newReport,
        imageFile: e.target.files[0]
      });
    }
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('issue_reports')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('issue_reports')
        .getPublicUrl(filePath);
        
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorUpload'),
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const submitReport = async () => {
    if (!user) {
      toast({
        title: t('errorTitle'),
        description: t('loginRequired'),
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    if (!newReport.type || !newReport.location || !newReport.description) {
      toast({
        title: t('errorTitle'),
        description: t('errorFields'),
        variant: "destructive",
      });
      return;
    }

    if (!declarationChecked) {
      toast({
        title: t('errorTitle'),
        description: t('declarationRequired'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      
      if (newReport.imageFile) {
        imageUrl = await uploadImage(newReport.imageFile);
        if (!imageUrl && newReport.imageFile) {
          // If image upload failed but was provided, stop submission
          setIsSubmitting(false);
          return;
        }
      }
      
      const reportData = {
        user_id: user.id,
        type: newReport.type,
        location: newReport.location,
        description: newReport.description,
        image_url: imageUrl,
        status: 'pending'
      };
      
      console.log('Submitting report with data:', reportData);
      
      const { error, data } = await supabase
        .from('issue_reports')
        .insert(reportData);
      
      if (error) {
        console.error('Submission error:', error);
        throw error;
      }
      
      console.log('Report submitted successfully:', data);
      
      setNewReport({
        type: '',
        location: '',
        description: '',
        imageFile: null
      });
      setDeclarationChecked(false);
      
      toast({
        title: t('successTitle'),
        description: t('successDescription'),
      });
      
      // Refresh the reports list
      fetchReports();
      
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast({
        title: t('errorTitle'),
        description: error.message || t('errorSubmit'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('pending');
      case 'inProgress':
        return t('inProgress');
      case 'resolved':
        return t('resolved');
      default:
        return status;
    }
  };

  const getTypeTranslation = (type: string) => {
    switch (type) {
      case 'نقطة سوداء':
      case 'Black Spot':
      case 'Point Noir':
        return language === 'ar' ? 'نقطة سوداء' : (language === 'en' ? 'Black Spot' : 'Point Noir');
      case 'حاويات تالفة':
      case 'Damaged Containers':
      case 'Conteneurs Endommagés':
        return language === 'ar' ? 'حاويات تالفة' : (language === 'en' ? 'Damaged Containers' : 'Conteneurs Endommagés');
      case 'عدم جمع النفايات':
      case 'No Waste Collection':
      case 'Pas de Collecte de Déchets':
        return language === 'ar' ? 'عدم جمع النفايات' : (language === 'en' ? 'No Waste Collection' : 'Pas de Collecte de Déchets');
      case 'تسرب نفايات':
      case 'Waste Leakage':
      case 'Fuite de Déchets':
        return language === 'ar' ? 'تسرب نفايات' : (language === 'en' ? 'Waste Leakage' : 'Fuite de Déchets');
      case 'أخرى':
      case 'Other':
      case 'Autre':
        return language === 'ar' ? 'أخرى' : (language === 'en' ? 'Other' : 'Autre');
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    switch (language) {
      case 'ar':
        return date.toLocaleDateString('ar-SA');
      case 'fr':
        return date.toLocaleDateString('fr-FR');
      default:
        return date.toLocaleDateString('en-US');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">{t('reportIssues')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>{t('reportProblem')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type">{t('issueType')}</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('type', value)}
                        value={newReport.type || undefined}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectProblemType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={language === 'ar' ? 'نقطة سوداء' : (language === 'en' ? 'Black Spot' : 'Point Noir')}>
                            {t('blackSpot')}
                          </SelectItem>
                          <SelectItem value={language === 'ar' ? 'حاويات تالفة' : (language === 'en' ? 'Damaged Containers' : 'Conteneurs Endommagés')}>
                            {t('damagedContainers')}
                          </SelectItem>
                          <SelectItem value={language === 'ar' ? 'عدم جمع النفايات' : (language === 'en' ? 'No Waste Collection' : 'Pas de Collecte de Déchets')}>
                            {t('noCollection')}
                          </SelectItem>
                          <SelectItem value={language === 'ar' ? 'تسرب نفايات' : (language === 'en' ? 'Waste Leakage' : 'Fuite de Déchets')}>
                            {t('wasteLeakage')}
                          </SelectItem>
                          <SelectItem value={language === 'ar' ? 'أخرى' : (language === 'en' ? 'Other' : 'Autre')}>
                            {t('otherWaste')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">{t('issueLocation')}</Label>
                      <div className="relative">
                        <Input 
                          id="location" 
                          name="location" 
                          placeholder={t('enterLocation')} 
                          value={newReport.location} 
                          onChange={handleInputChange}
                          className={`${language === 'ar' ? 'pr-10' : 'pl-10'}`}
                        />
                        <MapPin className={`h-5 w-5 absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">{t('issueDescription')}</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder={t('enterDescription')} 
                        rows={4}
                        value={newReport.description} 
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="image">{t('image')} {t('optional')}</Label>
                      <div className="mt-1 flex items-center">
                        <label htmlFor="image" className="cursor-pointer border rounded p-4 w-full text-center hover:bg-gray-50 transition">
                          <Camera className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500">{t('clickToAddImage')}</span>
                          <Input 
                            id="image" 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {newReport.imageFile && (
                        <p className="mt-2 text-sm text-gray-600">
                          {t('selected')} {newReport.imageFile.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="declaration" 
                        checked={declarationChecked}
                        onCheckedChange={(checked) => setDeclarationChecked(checked as boolean)}
                      />
                      <Label 
                        htmlFor="declaration" 
                        className="text-sm leading-none pt-0.5 cursor-pointer"
                      >
                        {t('declaration')}
                      </Label>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={submitReport} 
                      disabled={isSubmitting || isUploading}
                    >
                      {(isSubmitting || isUploading) ? (
                        <>
                          <Loader2 className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 animate-spin`} />
                          {isUploading ? t('uploadingImage') : t('submit')}
                        </>
                      ) : (
                        <>
                          <Send className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} /> {t('submit')}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('myReports')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400 mb-4" />
                    </div>
                  ) : reports.length > 0 ? (
                    <div className="space-y-4">
                      {reports.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{getTypeTranslation(report.type)}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(report.status)}`}>
                              {getStatusText(report.status)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mb-1">
                            <MapPin className={`inline h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                            {report.location}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          {report.image_url && (
                            <div className="mb-2">
                              <img 
                                src={report.image_url} 
                                alt="Report" 
                                className="w-full h-32 object-cover rounded" 
                              />
                            </div>
                          )}
                          <div className="text-xs text-gray-400">
                            {t('reportDate')} {formatDate(report.created_at)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>{t('noReports')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t('usefulInfo')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <div className="bg-primary/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        <span className="text-primary">1</span>
                      </div>
                      <p>{t('info1')}</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-primary/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        <span className="text-primary">2</span>
                      </div>
                      <p>{t('info2')}</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="bg-primary/10 p-1 rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                        <span className="text-primary">3</span>
                      </div>
                      <p>{t('info3')}</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportIssues;
