
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface AdminTabContentProps {
  value: string;
  title: string;
  children?: React.ReactNode;
}

const AdminTabContent: React.FC<AdminTabContentProps> = ({ 
  value, 
  title, 
  children 
}) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AdminTabContent;
