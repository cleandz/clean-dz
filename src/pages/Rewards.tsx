
import React, { useState } from 'react';
import { Gift, Star, Archive, Award, ChevronRight, Medal, Leaf, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  image: string;
}

const Rewards = () => {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(450);
  const [history, setHistory] = useState([
    { date: '2025-04-01', action: 'تسجيل 5 كغ من البلاستيك القابل للتدوير', points: 50 },
    { date: '2025-03-28', action: 'الإبلاغ عن نقطة سوداء', points: 20 },
    { date: '2025-03-25', action: 'إكمال تحدي "أسبوع بلا نفايات"', points: 100 },
  ]);

  const availableRewards: Reward[] = [
    {
      id: '1',
      name: 'قسيمة خصم 10%',
      description: 'خصم 10% على منتجات الشركة الخضراء الصديقة للبيئة',
      points: 200,
      image: 'coupon',
    },
    {
      id: '2',
      name: 'شجرة مجانية',
      description: 'احصل على شجرة مجانية للزراعة في منطقتك',
      points: 350,
      image: 'tree',
    },
    {
      id: '3',
      name: 'دورة تدريبية',
      description: 'دورة تدريبية عن إعادة التدوير وتقليل النفايات',
      points: 500,
      image: 'course',
    },
    {
      id: '4',
      name: 'حاويات فرز النفايات',
      description: 'مجموعة من حاويات فرز النفايات للاستخدام المنزلي',
      points: 600,
      image: 'bins',
    },
  ];

  const redeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      
      const newHistoryItem = {
        date: new Date().toISOString().split('T')[0],
        action: `استبدال مكافأة: ${reward.name}`,
        points: -reward.points,
      };
      
      setHistory([newHistoryItem, ...history]);
      
      toast({
        title: "تمت العملية بنجاح",
        description: `تم استبدال ${reward.points} نقطة للحصول على ${reward.name}`,
      });
    } else {
      toast({
        title: "نقاط غير كافية",
        description: `تحتاج ${reward.points - userPoints} نقطة إضافية للحصول على هذه المكافأة`,
        variant: "destructive",
      });
    }
  };

  const renderRewardIcon = (image: string) => {
    switch(image) {
      case 'coupon':
        return <Gift className="h-8 w-8 text-amber-500" />;
      case 'tree':
        return <Leaf className="h-8 w-8 text-primary-green" />;
      case 'course':
        return <Archive className="h-8 w-8 text-secondary-blue" />;
      case 'bins':
        return <Archive className="h-8 w-8 text-purple-500" />;
      default:
        return <Award className="h-8 w-8 text-primary-green" />;
    }
  };

  const levels = [
    { name: 'مبتدئ', threshold: 0, icon: <Leaf className="h-5 w-5" /> },
    { name: 'نشط', threshold: 300, icon: <Star className="h-5 w-5" /> },
    { name: 'متقدم', threshold: 800, icon: <Medal className="h-5 w-5" /> },
    { name: 'خبير', threshold: 1500, icon: <Award className="h-5 w-5" /> },
  ];

  const getCurrentLevel = () => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (userPoints >= levels[i].threshold) {
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
    const userProgressPoints = userPoints - currentLevel.threshold;
    return Math.min(100, Math.floor((userProgressPoints / pointsForNextLevel) * 100));
  };

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">المكافآت</h1>
          
          {/* بطاقة النقاط والمستوى */}
          <Card className="mb-8 bg-gradient-to-r from-primary-green to-secondary-blue text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-6 md:mb-0">
                  <p className="text-white/80 mb-1">رصيدك الحالي</p>
                  <h2 className="text-4xl font-bold flex items-center">
                    {userPoints} <Star className="ml-2 h-5 w-5 text-yellow-300" />
                  </h2>
                </div>
                
                <div className="flex-grow mx-6 hidden md:block">
                  <div className="h-px bg-white/20"></div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-white/20 rounded-full mr-3">
                      {currentLevel.icon}
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">مستواك الحالي</p>
                      <h3 className="font-bold">{currentLevel.name}</h3>
                    </div>
                  </div>
                  
                  {nextLevel && (
                    <>
                      <Progress value={getProgressToNextLevel()} className="h-2 bg-white/20" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>{nextLevel.threshold - userPoints} نقطة للمستوى التالي</span>
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
              <TabsTrigger value="rewards">المكافآت المتاحة</TabsTrigger>
              <TabsTrigger value="history">سجل النقاط</TabsTrigger>
              <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 p-6 flex justify-center">
                      {renderRewardIcon(reward.image)}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">{reward.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="text-amber-500 h-5 w-5 ml-1" />
                          <span className="font-bold">{reward.points}</span>
                        </div>
                        <Button 
                          onClick={() => redeemReward(reward)}
                          disabled={userPoints < reward.points}
                          variant={userPoints >= reward.points ? "default" : "outline"}
                        >
                          استبدال
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>سجل النقاط</CardTitle>
                </CardHeader>
                <CardContent>
                  {history.map((item, index) => (
                    <div key={index} className={`flex justify-between items-center py-3 ${index !== history.length - 1 ? 'border-b' : ''}`}>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <div className={`font-bold ${item.points > 0 ? 'text-primary-green' : 'text-red-500'}`}>
                        {item.points > 0 ? '+' : ''}{item.points}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إنجازاتك</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-primary-green/10 rounded-lg">
                        <Medal className="h-10 w-10 text-primary-green" />
                        <div>
                          <h4 className="font-medium">جامع النفايات</h4>
                          <p className="text-sm text-gray-600">جمع 50 كغ من النفايات القابلة للتدوير</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 bg-secondary-blue/10 rounded-lg">
                        <TrendingUp className="h-10 w-10 text-secondary-blue" />
                        <div>
                          <h4 className="font-medium">مراقب البيئة</h4>
                          <p className="text-sm text-gray-600">الإبلاغ عن 5 نقاط سوداء</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 bg-amber-500/10 rounded-lg">
                        <Leaf className="h-10 w-10 text-amber-500" />
                        <div>
                          <h4 className="font-medium">صديق البيئة</h4>
                          <p className="text-sm text-gray-600">المساهمة في تنظيف 3 مناطق</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>التحديات النشطة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">تحدي صفر نفايات</h4>
                          <div className="px-2 py-1 bg-primary-green/10 text-primary-green text-xs rounded-full">
                            +100 نقطة
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">قلل من استهلاك البلاستيك ذو الاستخدام الواحد لمدة أسبوع</p>
                        <Progress value={30} className="h-2" />
                        <div className="mt-2 text-xs text-gray-500 flex justify-between">
                          <span>3/10 أيام</span>
                          <span>30%</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">معلم البيئة</h4>
                          <div className="px-2 py-1 bg-primary-green/10 text-primary-green text-xs rounded-full">
                            +50 نقطة
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">نشر الوعي البيئي من خلال مشاركة 5 موضوعات توعوية</p>
                        <Progress value={60} className="h-2" />
                        <div className="mt-2 text-xs text-gray-500 flex justify-between">
                          <span>3/5 مشاركات</span>
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
