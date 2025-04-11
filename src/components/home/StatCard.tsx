
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card className="border-2">
      <CardContent className={`p-6 flex items-center gap-4 ${color}`}>
        <div className="p-3 rounded-full bg-white/20">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
