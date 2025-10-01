import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CompanyProfile, Quote, KeyMetrics } from '../../types/api';
import { getCompanyProfile, getQuote, getKeyMetrics } from '../../lib/api/client';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/shared/ErrorState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import CompanyHeader from './components/CompanyHeader';
import OverviewTab from './components/OverviewTab';
import FundamentalsTab from './components/FundamentalsTab';

type CompanyData = {
  profile: CompanyProfile;
  quote: Quote;
  keyMetrics: KeyMetrics;
};

const CompanyProfilePage: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyData = useCallback(async () => {
    if (!ticker) {
      setError("No company ticker provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const [profileRes, quoteRes, keyMetricsRes] = await Promise.all([
        getCompanyProfile(ticker),
        getQuote(ticker),
        getKeyMetrics(ticker),
      ]);
      
      if (!profileRes?.[0] || !quoteRes?.[0] || !keyMetricsRes?.[0]) {
        throw new Error(`No data found for ticker: ${ticker}. Please check if the ticker symbol is correct.`);
      }

      setData({
        profile: profileRes[0],
        quote: quoteRes[0],
        keyMetrics: keyMetricsRes[0]
      });
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchCompanyData} />;
  }

  if (!data) {
    return null; 
  }

  return (
    <div className="space-y-6">
      <CompanyHeader profile={data.profile} quote={data.quote} />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="filings" disabled>Filings</TabsTrigger>
          <TabsTrigger value="news" disabled>News</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
            <OverviewTab profile={data.profile} quote={data.quote} />
        </TabsContent>
        <TabsContent value="fundamentals">
            <FundamentalsTab metrics={data.keyMetrics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PageSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <div className="text-right space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
        <div>
            <div className="border-b">
                <div className="flex items-center px-1">
                    <Skeleton className="h-10 w-24 mr-4" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
            <div className="mt-6 space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    </div>
);


export default CompanyProfilePage;