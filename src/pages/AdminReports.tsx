
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/auth';
import { useAdmin } from '@/contexts/admin';
import { supabase } from '@/integrations/supabase/client';
import { Report, ReportStatus } from '@/types/supabase';
import { Edit, Trash2, MapPin, AlertCircle, CheckCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const AdminReports = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<ReportStatus | 'all'>('all');

  // Fetch all reports
  const fetchReports = async () => {
    if (!user || !isAdmin) return [];
    
    try {
      let query = supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (currentFilter !== 'all') {
        query = query.eq('status', currentFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingReports'),
        variant: 'destructive',
      });
      return [];
    }
  };

  const { data, isLoading: isReportsLoading, refetch } = useQuery({
    queryKey: ['admin-reports', currentFilter],
    queryFn: fetchReports,
    enabled: !!user && isAdmin
  });

  useEffect(() => {
    if (data) {
      setReports(data);
    }
  }, [data]);

  const updateReportStatus = async (reportId: string, newStatus: ReportStatus) => {
    if (!user || !isAdmin) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('reports')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);
      
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('reportStatusUpdated'),
      });
      
      // Update local state
      setReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, status: newStatus, updated_at: new Date().toISOString() } 
            : report
        )
      );
    } catch (error) {
      console.error('Error updating report status:', error);
      toast({
        title: t('error'),
        description: t('errorUpdatingReport'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReport = async () => {
    if (!selectedReport || !user || !isAdmin) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', selectedReport.id);
      
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('reportDeleted'),
      });
      
      // Update local state
      setReports(prev => prev.filter(report => report.id !== selectedReport.id));
      setIsDeleteDialogOpen(false);
      setSelectedReport(null);
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: t('error'),
        description: t('errorDeletingReport'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>{t('accessDenied')}</CardTitle>
            <CardDescription>{t('adminAccessRequired')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">{t('new')}</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">{t('inProgress')}</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">{t('resolved')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getWasteTypeBadge = (wasteType: string) => {
    switch (wasteType) {
      case 'organic':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">{t('organic')}</Badge>;
      case 'plastic':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">{t('plastic')}</Badge>;
      case 'glass':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">{t('glass')}</Badge>;
      case 'metal':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">{t('metal')}</Badge>;
      default:
        return <Badge variant="outline">{wasteType}</Badge>;
    }
  };

  return (
    <div className={`container mx-auto py-6 ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('manageReports')}</h1>
        
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Select defaultValue={currentFilter} onValueChange={(value: ReportStatus | 'all') => setCurrentFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allReports')}</SelectItem>
              <SelectItem value="new">{t('new')}</SelectItem>
              <SelectItem value="in_progress">{t('inProgress')}</SelectItem>
              <SelectItem value="resolved">{t('resolved')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => refetch()} disabled={isReportsLoading}>
            {t('refresh')}
          </Button>
        </div>
      </div>
      
      {isReportsLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : reports.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('image')}</TableHead>
                <TableHead>{t('wasteType')}</TableHead>
                <TableHead>{t('location')}</TableHead>
                <TableHead>{t('description')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    {report.image_url ? (
                      <img 
                        src={report.image_url} 
                        alt={`Report ${report.id}`} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getWasteTypeBadge(report.waste_type)}</TableCell>
                  <TableCell>
                    {report.latitude && report.longitude ? (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-xs">
                          {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">{t('noLocation')}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{report.description}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status || 'new')}</TableCell>
                  <TableCell>
                    {new Date(report.created_at).toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateReportStatus(report.id, 'new')}>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {t('markAsNew')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateReportStatus(report.id, 'in_progress')}>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('markAsInProgress')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateReportStatus(report.id, 'resolved')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t('markAsResolved')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => {
                            setSelectedReport(report);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t('deleteReport')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600">{t('noReportsFound')}</p>
            <p className="text-gray-500 mt-1">{t('noReportsDescription')}</p>
          </CardContent>
        </Card>
      )}
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteReportConfirmation')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={deleteReport} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReports;
