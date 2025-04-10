import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trophy, Leaf, Recycle, Wine, Hammer, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Reward, UserPoints } from '@/types/supabase';
import { useTranslations } from '@/hooks/use-translations';

const RewardsPage = () => {
  const { t } = useTranslations();
  const { userRole, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userPoints, setUserPoints] = useState<UserPoints>({
    id: '',
    user_id: '',
    total_points: 0,
    organic_points: 0,
    plastic_points: 0,
    glass_points: 0,
    metal_points: 0,
    created_at: '',
    updated_at: ''
  });
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchUserPoints();
    fetchRewards();
  }, [user]);

  const fetchUserPoints = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // No points record found, create one
          const { data: newData, error: insertError } = await supabase
            .from('user_points')
            .insert({
              user_id: user.id,
              total_points: 0,
              organic_points: 0,
              plastic_points: 0,
              glass_points: 0,
              metal_points: 0
            })
            .select()
            .single();
            
          if (insertError) throw insertError;
          setUserPoints(newData as UserPoints);
        } else {
          throw error;
        }
      } else {
        setUserPoints(data as UserPoints);
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
      toast({
        title: t.error,
        description: t.errorFetchingPoints,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('active', true)
        .order('points_required', { ascending: true });
        
      if (error) throw error;
      setRewards(data as Reward[]);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      toast({
        title: t.error,
        description: t.errorFetchingRewards,
        variant: 'destructive',
      });
    }
  };

  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
    setRewardDialogOpen(true);
  };

  const handleClaimReward = async () => {
    if (!user || !selectedReward) return;
    
    try {
      // Check if user has enough points
      if (userPoints.total_points < selectedReward.points_required) {
        toast({
          title: t.error,
          description: t.notEnoughPoints,
          variant: 'destructive',
        });
        return;
      }
      
      // Create user reward record
      const { error: rewardError } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          reward_id: selectedReward.id,
          points_spent: selectedReward.points_required,
          status: 'claimed'
        });
        
      if (rewardError) throw rewardError;
      
      // Deduct points from user
      const { error: pointsError } = await supabase
        .from('user_points')
        .update({
          total_points: userPoints.total_points - selectedReward.points_required,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
        
      if (pointsError) throw pointsError;
      
      // Create point transaction record
      const { error: transactionError } = await supabase
        .from('point_transactions')
        .insert({
          user_id: user.id,
          points: -selectedReward.points_required,
          transaction_type: 'reward_redemption',
          reference_id: selectedReward.id
        });
        
      if (transactionError) throw transactionError;
      
      toast({
        title: t.success,
        description: t.rewardClaimed,
      });
      
      // Refresh user points
      fetchUserPoints();
      setRewardDialogOpen(false);
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: t.error,
        description: t.errorClaimingReward,
        variant: 'destructive',
      });
    }
  };

  const renderPointCategory = (
    title: string,
    points: number,
    icon: React.ReactNode,
    color: string
  ) => (
    <Card className="overflow-hidden">
      <CardHeader className={`text-white ${color}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-2xl font-bold">{points}</div>
        <p className="text-sm text-gray-500">{t.points}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{t.rewardsAndPoints}</h1>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg md:text-xl">{t.totalPoints}</CardTitle>
                    <Trophy className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{userPoints.total_points}</div>
                  <p className="text-sm text-gray-500">{t.points}</p>
                </CardContent>
              </Card>
              
              {renderPointCategory(
                t.organicWaste,
                userPoints.organic_points,
                <Leaf className="h-6 w-6" />,
                "bg-green-600"
              )}
              
              {renderPointCategory(
                t.plasticWaste,
                userPoints.plastic_points,
                <Recycle className="h-6 w-6" />,
                "bg-blue-600"
              )}
              
              {renderPointCategory(
                t.glassWaste,
                userPoints.glass_points,
                <Wine className="h-6 w-6" />,
                "bg-amber-600"
              )}
              
              {renderPointCategory(
                t.metalWaste,
                userPoints.metal_points,
                <Hammer className="h-6 w-6" />,
                "bg-gray-600"
              )}
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-4">{t.availableRewards}</h2>
            
            {rewards.length === 0 ? (
              <p className="text-center text-gray-500 my-8">{t.noRewardsAvailable}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle>{reward.name[language]}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1" />
                        {reward.points_required} {t.points}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {reward.image_url && (
                        <div className="w-full h-40 mb-4 overflow-hidden rounded-md">
                          <img 
                            src={reward.image_url} 
                            alt={reward.name[language]} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm">{reward.description[language]}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleRewardClick(reward)}
                        disabled={userPoints.total_points < reward.points_required}
                        className="w-full"
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        {t.claimReward}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <Dialog open={rewardDialogOpen} onOpenChange={setRewardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.claimReward}</DialogTitle>
            <DialogDescription>
              {selectedReward && (
                <div className="mt-2">
                  <h3 className="font-bold text-lg">{selectedReward.name[language]}</h3>
                  <p className="flex items-center mt-1">
                    <Trophy className="h-4 w-4 mr-1" />
                    {selectedReward.points_required} {t.points}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p>{t.confirmRewardClaim}</p>
            
            {selectedReward && userPoints.total_points < selectedReward.points_required && (
              <p className="text-red-500 mt-2">{t.notEnoughPoints}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRewardDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button 
              onClick={handleClaimReward}
              disabled={selectedReward && userPoints.total_points < selectedReward.points_required}
            >
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsPage;
