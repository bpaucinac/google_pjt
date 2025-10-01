import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { CompanyProfile, Quote } from '../../../types/api';

interface OverviewTabProps {
  profile: CompanyProfile;
  quote: Quote;
}

const DataPoint = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
    </div>
);


const OverviewTab: React.FC<OverviewTabProps> = ({ profile, quote }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Company Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{profile.description}</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Market Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataPoint label="Market Cap" value={`$${(quote.marketCap / 1_000_000_000).toFixed(2)}B`} />
                    <DataPoint label="P/E Ratio" value={quote.pe ? quote.pe.toFixed(2) : 'N/A'} />
                    <DataPoint label="EPS" value={quote.eps ? quote.eps.toFixed(2) : 'N/A'} />
                    <DataPoint label="Volume" value={quote.volume.toLocaleString()} />
                    <DataPoint label="Avg. Volume" value={quote.avgVolume.toLocaleString()} />
                    <DataPoint label="52 Week Range" value={profile.range} />
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default OverviewTab;