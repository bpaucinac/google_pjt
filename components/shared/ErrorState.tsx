import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Icons } from '../icons/Icons';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full">
            <Icons.alertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4">An Error Occurred</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{message}</p>
          {onRetry && (
            <Button onClick={onRetry}>
              <Icons.refresh className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};