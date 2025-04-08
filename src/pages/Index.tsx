
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, AlertTriangle, Map, Award, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/home/StatCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

const Index = () => {
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Modern Mobile App Style */}
        <section className="bg-gradient-to-r from-primary-green via-primary-green/90 to-secondary-blue py-12 md:py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 mobile-heading">{t('siteTitle')}</h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto mobile-text">
              {t('appDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-green hover:bg-gray-100 hover-scale">
                <Link to="/waste-tracking">{t('wasteTracking')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover-scale">
                <Link to="/report-issues">{t('reportIssues')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section - Mobile App Style */}
        <section className="py-10 bg-gray-50 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t('quickStats' as any)}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title={t('collectedWaste' as any)}
                value={formatNumber(1500) + " " + t('ton' as any)}
                icon={<Trash className="h-6 w-6 text-white" />}
                color="bg-gradient-to-r from-green-500 to-green-600 text-white hover-scale stats-card" 
              />
              <StatCard 
                title={t('recycledMaterials' as any)}
                value={formatNumber(400) + " " + t('ton' as any)}
                icon={<Recycle className="h-6 w-6 text-white" />}
                color="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover-scale stats-card" 
              />
              <StatCard 
                title={t('collectionPoints')}
                value={formatNumber(120)}
                icon={<Map className="h-6 w-6 text-white" />}
                color="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover-scale stats-card" 
              />
              <StatCard 
                title={t('resolvedReports' as any)}
                value={formatNumber(85)}
                icon={<AlertTriangle className="h-6 w-6 text-white" />}
                color="bg-gradient-to-r from-red-500 to-red-600 text-white hover-scale stats-card" 
              />
            </div>
          </div>
        </section>

        {/* Services Section - Modern Mobile App Style */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">{t('ourServices' as any)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-md hover-scale hover-shadow rounded-xl overflow-hidden">
                <div className="h-2 bg-green-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Trash className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">{t('wasteTracking')}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{t('wasteTrackingDesc' as any)}</p>
                  <Button variant="link" className="text-primary-green">
                    <Link to="/waste-tracking">{t('details' as any)}</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover-scale hover-shadow rounded-xl overflow-hidden">
                <div className="h-2 bg-red-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-bold mb-2">{t('reportIssues')}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{t('reportIssuesDesc' as any)}</p>
                  <Button variant="link" className="text-red-500">
                    <Link to="/report-issues">{t('details' as any)}</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover-scale hover-shadow rounded-xl overflow-hidden">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Map className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">{t('collectionPoints')}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{t('collectionPointsDesc' as any)}</p>
                  <Button variant="link" className="text-blue-500">
                    <Link to="/collection-points">{t('details' as any)}</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover-scale hover-shadow rounded-xl overflow-hidden">
                <div className="h-2 bg-amber-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold mb-2">{t('rewards')}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{t('rewardsDesc' as any)}</p>
                  <Button variant="link" className="text-amber-500">
                    <Link to="/rewards">{t('details' as any)}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Mobile App Style */}
        <section className="py-12 bg-gradient-to-r from-primary-green to-secondary-blue text-white px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('joinUsToday' as any)}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">{t('joinUsDescription' as any)}</p>
            <Button 
              size="lg" 
              className="bg-white text-primary-green hover:bg-gray-100 hover-scale shadow-lg"
            >
              <Link to="/waste-tracking">{t('startNow' as any)}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
