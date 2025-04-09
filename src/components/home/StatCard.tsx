
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
}

const StatCard = ({ title, value, icon, color, isLoading = false }: StatCardProps) => {
  return (
    <Card className="border-2">
      <CardContent className={`p-6 flex items-center gap-4 ${color}`}>
        <div className="p-3 rounded-full bg-white/20">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16 bg-white/30" />
          ) : (
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
