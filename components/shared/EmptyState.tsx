import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center p-6">
        <CardHeader>
          {icon && <div className="mx-auto mb-4">{icon}</div>}
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {action && <Button onClick={action.onClick}>{action.label}</Button>}
        </CardContent>
      </Card>
    </div>
  );
};
