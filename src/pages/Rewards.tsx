
import React, { useState, useEffect } from 'react';
import { Gift, Star, Archive, Award, ChevronRight, Medal, Leaf, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reward, UserPoints } from '@/types/supabase';

interface PointTransaction {
  date: string;
  action: string;
  points: number;
}

const Rewards = () => {
  const { toast } = useToast();
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [userPoints, setUserPoints] = useState<UserPoints>({
    id: '',
    user_id: '',
    total_points: 0,
    recycling_points: 0,
    reporting_points: 0,
    interaction_points: 0
  });
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [pointHistory, setPointHistory] = useState<PointTransaction[]>([]);
  const [isRedeeming, setIsRedeeming] = useState(false);

  // Fetch user points and rewards on component mount
  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Fetch user points
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (pointsError && pointsError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" which is fine for new users
        throw pointsError;
      }

      // Fetch available rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .eq('active', true);

      if (rewardsError) throw rewardsError;

      // Fetch point transactions for history
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('point_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (transactionsError) throw transactionsError;

      // Update states with fetched data
      if (pointsData) {
        setUserPoints({
          id: pointsData.id,
          user_id: pointsData.user_id,
          total_points: pointsData.total_points || 0,
          recycling_points: pointsData.recycling_points || 0,
          reporting_points: pointsData.reporting_points || 0,
          interaction_points: pointsData.interaction_points || 0
        });
      }

      if (rewardsData) {
        // Type cast to handle JSON fields
        const typedRewards: Reward[] = rewardsData.map(reward => ({
          id: reward.id,
          name: reward.name as { ar: string; en: string; fr: string },
          description: reward.description as { ar: string; en: string; fr: string },
          points_required: reward.points_required,
          reward_type: reward.reward_type,
          image_url: reward.image_url,
          active: reward.active,
          created_at: reward.created_at,
          updated_at: reward.updated_at
        }));
        
        setAvailableRewards(typedRewards);
      }

      if (transactionsData) {
        const history = transactionsData.map((transaction: any) => {
          let action = '';
          
          // Convert transaction type to readable action
          switch(transaction.transaction_type) {
            case 'recycling':
              action = t('rewards.recyclingPoints');
              break;
            case 'reporting':
              action = t('rewards.reportingPoints');
              break;
            case 'interaction':
              action = t('rewards.interactionPoints');
              break;
            case 'redemption':
              action = t('rewards.pointsRedeemed');
              break;
            default:
              action = transaction.transaction_type;
          }
          
          return {
            date: new Date(transaction.created_at).toISOString().split('T')[0],
            action,
            points: transaction.points
          };
        });
        
        setPointHistory(history);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: t('error.title'),
        description: t('rewards.errorFetchingData'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const redeemReward = async (reward: Reward) => {
    if (!user) {
      toast({
        title: t('error.title'),
        description: t('auth.loginRequired'),
        variant: "destructive",
      });
      return;
    }

    if (userPoints.total_points < reward.points_required) {
      toast({
        title: t('rewards.notEnoughPoints'),
        description: `${t('rewards.youNeed')} ${reward.points_required - userPoints.total_points} ${t('rewards.morePoints')}`,
        variant: "destructive",
      });
      return;
    }

    setIsRedeeming(true);

    try {
      // Insert the redemption record - the trigger will handle updating points
      const { error } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          reward_id: reward.id,
          points_spent: reward.points_required,
          status: 'claimed'
        });

      if (error) throw error;

      // Update local state to reflect change
      setUserPoints(prevPoints => ({
        ...prevPoints,
        total_points: prevPoints.total_points - reward.points_required
      }));

      // Add to history
      const newHistoryItem = {
        date: new Date().toISOString().split('T')[0],
        action: t('rewards.rewardRedeemed') + ': ' + reward.name[language as keyof typeof reward.name],
        points: -reward.points_required
      };
      
      setPointHistory([newHistoryItem, ...pointHistory]);

      toast({
        title: t('success.title'),
        description: `${t('rewards.rewardRedeemedMessage')} ${reward.name[language as keyof typeof reward.name]}`,
      });

      // Refresh data to ensure everything is in sync
      fetchUserData();
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toast({
        title: t('error.title'),
        description: t('rewards.errorRedeemingReward'),
        variant: "destructive",
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  const renderRewardIcon = (type: string) => {
    switch(type) {
      case 'coupon':
        return <Gift className="h-8 w-8 text-amber-500" />;
      case 'item':
        return <Leaf className="h-8 w-8 text-primary-green" />;
      case 'event':
        return <Archive className="h-8 w-8 text-secondary-blue" />;
      default:
        return <Award className="h-8 w-8 text-primary-green" />;
    }
  };

  const levels = [
    { name: t('rewards.beginner'), threshold: 0, icon: <Leaf className="h-5 w-5" /> },
    { name: t('rewards.active'), threshold: 300, icon: <Star className="h-5 w-5" /> },
    { name: t('rewards.advanced'), threshold: 800, icon: <Medal className="h-5 w-5" /> },
    { name: t('rewards.expert'), threshold: 1500, icon: <Award className="h-5 w-5" /> },
  ];

  const getCurrentLevel = () => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (userPoints.total_points >= levels[i].threshold) {
        return i;
      }
    }
    return 0;
  };

  const currentLevelIndex = getCurrentLevel();
  const currentLevel = levels[currentLevelIndex];
  const nextLevel = levels[currentLevelIndex + 1];
  
  const getProgressToNextLevel = () => {
    if (!nextLevel) return 100;
    const pointsForNextLevel = nextLevel.threshold - currentLevel.threshold;
    const userProgressPoints = userPoints.total_points - currentLevel.threshold;
    return Math.min(100, Math.floor((userProgressPoints / pointsForNextLevel) * 100));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-green" />
        <p className="mt-4 text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">{t('navigation.rewards')}</h1>
          
          {/* Points and Level Card */}
          <Card className="mb-8 bg-gradient-to-r from-primary-green to-secondary-blue text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-6 md:mb-0">
                  <p className="text-white/80 mb-1">{t('rewards.currentBalance')}</p>
                  <h2 className="text-4xl font-bold flex items-center">
                    {userPoints.total_points} <Star className={`${dir === 'rtl' ? 'mr-2' : 'ml-2'} h-5 w-5 text-yellow-300`} />
                  </h2>
                </div>
                
                <div className="flex-grow mx-6 hidden md:block">
                  <div className="h-px bg-white/20"></div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className={`p-2 bg-white/20 rounded-full ${dir === 'rtl' ? 'ml-3' : 'mr-3'}`}>
                      {currentLevel.icon}
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">{t('rewards.currentLevel')}</p>
                      <h3 className="font-bold">{currentLevel.name}</h3>
                    </div>
                  </div>
                  
                  {nextLevel && (
                    <>
                      <Progress value={getProgressToNextLevel()} className="h-2 bg-white/20" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>{nextLevel.threshold - userPoints.total_points} {t('rewards.pointsToNextLevel')}</span>
                        <span>{nextLevel.name}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="rewards">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="rewards">{t('rewards.availableRewards')}</TabsTrigger>
              <TabsTrigger value="history">{t('rewards.pointsHistory')}</TabsTrigger>
              <TabsTrigger value="achievements">{t('rewards.achievements')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards">
              {availableRewards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRewards.map((reward) => (
                    <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gray-100 p-6 flex justify-center">
                        {renderRewardIcon(reward.reward_type)}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">
                          {reward.name[language as keyof typeof reward.name]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {reward.description[language as keyof typeof reward.description]}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className={`text-amber-500 h-5 w-5 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                            <span className="font-bold">{reward.points_required}</span>
                          </div>
                          <Button 
                            onClick={() => redeemReward(reward)}
                            disabled={userPoints.total_points < reward.points_required || isRedeeming}
                            variant={userPoints.total_points >= reward.points_required ? "default" : "outline"}
                          >
                            {isRedeeming ? <Loader2 className={`h-4 w-4 animate-spin ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} /> : null}
                            {t('rewards.redeem')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">{t('rewards.noRewardsAvailable')}</h3>
                  <p className="text-gray-500 mt-2">{t('rewards.checkBackLater')}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>{t('rewards.pointsHistory')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {pointHistory.length > 0 ? (
                    pointHistory.map((item, index) => (
                      <div key={index} className={`flex justify-between items-center py-3 ${index !== pointHistory.length - 1 ? 'border-b' : ''}`}>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <div className={`font-bold ${item.points > 0 ? 'text-primary-green' : 'text-red-500'}`}>
                          {item.points > 0 ? '+' : ''}{item.points}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p>{t('rewards.noPointHistory')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('rewards.yourAchievements')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className={`flex items-center gap-4 p-3 bg-primary-green/10 rounded-lg ${userPoints.recycling_points >= 50 ? '' : 'opacity-50'}`}>
                        <Medal className="h-10 w-10 text-primary-green" />
                        <div>
                          <h4 className="font-medium">{t('rewards.wasteCollector')}</h4>
                          <p className="text-sm text-gray-600">{t('rewards.wasteCollectorDesc')}</p>
                          <Progress 
                            value={Math.min(100, (userPoints.recycling_points / 50) * 100)} 
                            className="h-2 mt-1" 
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.min(userPoints.recycling_points, 50)}/50 {t('rewards.points')}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-4 p-3 bg-secondary-blue/10 rounded-lg ${userPoints.reporting_points >= 100 ? '' : 'opacity-50'}`}>
                        <TrendingUp className="h-10 w-10 text-secondary-blue" />
                        <div>
                          <h4 className="font-medium">{t('rewards.environmentMonitor')}</h4>
                          <p className="text-sm text-gray-600">{t('rewards.environmentMonitorDesc')}</p>
                          <Progress 
                            value={Math.min(100, (userPoints.reporting_points / 100) * 100)} 
                            className="h-2 mt-1" 
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.min(userPoints.reporting_points, 100)}/100 {t('rewards.points')}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-4 p-3 bg-amber-500/10 rounded-lg ${userPoints.total_points >= 500 ? '' : 'opacity-50'}`}>
                        <Leaf className="h-10 w-10 text-amber-500" />
                        <div>
                          <h4 className="font-medium">{t('rewards.ecoFriend')}</h4>
                          <p className="text-sm text-gray-600">{t('rewards.ecoFriendDesc')}</p>
                          <Progress 
                            value={Math.min(100, (userPoints.total_points / 500) * 100)} 
                            className="h-2 mt-1" 
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.min(userPoints.total_points, 500)}/500 {t('rewards.points')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('rewards.activeChallenges')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">{t('rewards.zeroWasteChallenge')}</h4>
                          <div className="px-2 py-1 bg-primary-green/10 text-primary-green text-xs rounded-full">
                            +100 {t('rewards.points')}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{t('rewards.zeroWasteChallengeDesc')}</p>
                        <Progress value={30} className="h-2" />
                        <div className="mt-2 text-xs text-gray-500 flex justify-between">
                          <span>3/10 {t('rewards.days')}</span>
                          <span>30%</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">{t('rewards.ecoEducator')}</h4>
                          <div className="px-2 py-1 bg-primary-green/10 text-primary-green text-xs rounded-full">
                            +50 {t('rewards.points')}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{t('rewards.ecoEducatorDesc')}</p>
                        <Progress value={60} className="h-2" />
                        <div className="mt-2 text-xs text-gray-500 flex justify-between">
                          <span>3/5 {t('rewards.shares')}</span>
                          <span>60%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rewards;
