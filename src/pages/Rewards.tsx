import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/auth';
import { MultilingualContent, Reward, UserPoints } from '@/types/supabase';
import { Loader2, Gift, Award, ShoppingBag } from 'lucide-react';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
  language: string;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem, language }) => {
  const { t } = useTranslation(language);
  const canRedeem = userPoints >= reward.points_required;

  const handleRedeem = () => {
    if (canRedeem) {
      onRedeem(reward);
    }
  };

  let icon;
  switch (reward.reward_type) {
    case 'discount':
      icon = <Gift className="h-4 w-4 mr-2" />;
      break;
    case 'points_multiplier':
      icon = <Award className="h-4 w-4 mr-2" />;
      break;
    case 'merchandise':
      icon = <ShoppingBag className="h-4 w-4 mr-2" />;
      break;
    default:
      icon = <Gift className="h-4 w-4 mr-2" />;
  }

  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {reward.name[language as keyof MultilingualContent]}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {reward.image_url && (
          <img src={reward.image_url} alt={reward.name[language as keyof MultilingualContent]} className="w-full h-32 object-cover mb-4 rounded-md" />
        )}
        <CardDescription className="text-gray-600">
          {reward.description[language as keyof MultilingualContent]}
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          <Badge variant="secondary">
            {icon}
            {formatNumber(reward.points_required)} {t('points')}
          </Badge>
          <Button variant="primary" onClick={handleRedeem} disabled={!canRedeem}>
            {canRedeem ? t('redeem') : t('notEnoughPoints')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Rewards = () => {
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);
  const { user } = useAuth();
  
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchRewards();
      fetchUserPoints();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('active', true)
        .order('points_required', { ascending: true });
      
      if (error) throw error;
      
      // Convert the JSON data to the expected type
      const typedRewards = data.map(reward => ({
        ...reward,
        name: reward.name as unknown as MultilingualContent,
        description: reward.description as unknown as MultilingualContent,
      }));
      
      setRewards(typedRewards);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingRewards'),
        variant: 'destructive',
      });
    }
  };
  
  const fetchUserPoints = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      
      setUserPoints(data || null);
    } catch (error) {
      console.error('Error fetching user points:', error);
      toast({
        title: t('error'),
        description: t('errorFetchingPoints'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRedeemReward = async (reward: Reward) => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    if (!userPoints || userPoints.total_points === null || userPoints.total_points < reward.points_required) {
      toast({
        title: t('error'),
        description: t('notEnoughPoints'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsRedeeming(true);
    try {
      // Optimistically update the user's points
      setUserPoints(prevPoints => {
        if (prevPoints && prevPoints.total_points !== null) {
          return { ...prevPoints, total_points: prevPoints.total_points - reward.points_required };
        }
        return prevPoints;
      });
      
      const { error } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          reward_id: reward.id,
          points_spent: reward.points_required,
          status: 'pending',
        });
      
      if (error) throw error;
      
      toast({
        title: t('success'),
        description: t('rewardRedeemed'),
      });
      
      // Refresh user points
      await fetchUserPoints();
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toast({
        title: t('error'),
        description: t('errorRedeemingReward'),
        variant: 'destructive',
      });
      // Revert the optimistic update if the transaction fails
      await fetchUserPoints();
    } finally {
      setIsRedeeming(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin h-6 w-6 text-primary-green" />
      </div>
    );
  }
  
  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl font-bold mb-6">{t('rewards')}</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="animate-spin h-6 w-6 text-primary-green" />
        </div>
      ) : (
        <>
          {userPoints && (
            <div className="mb-4">
              <Badge variant="outline">
                {t('yourPoints')}: {formatNumber(userPoints.total_points || 0)}
              </Badge>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(reward => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userPoints={userPoints ? userPoints.total_points || 0 : 0}
                onRedeem={handleRedeemReward}
                language={language}
              />
            ))}
          </div>
          
          {rewards.length === 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-500">{t('noRewardsAvailable')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rewards;
