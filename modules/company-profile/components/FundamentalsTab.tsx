import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { KeyMetrics } from '../../../types/api';

interface FundamentalsTabProps {
    metrics: KeyMetrics;
}

const MetricCard = ({ title, value, unit = '' }: { title: string, value: number | undefined | null, unit?: string }) => {
    const formattedValue = value !== undefined && value !== null ? `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${unit}` : 'N/A';
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{formattedValue}</p>
            </CardContent>
        </Card>
    );
}

const FundamentalsTab: React.FC<FundamentalsTabProps> = ({ metrics }) => {
    return (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <MetricCard title="P/E Ratio" value={metrics.peRatioTTM} />
            <MetricCard title="P/B Ratio" value={metrics.pbRatioTTM} />
            <MetricCard title="P/S Ratio" value={metrics.priceToSalesRatioTTM} />
            <MetricCard title="Dividend Yield" value={metrics.dividendYieldTTM} unit="%" />
            <MetricCard title="Debt to Equity" value={metrics.debtToEquityTTM} />
            <MetricCard title="ROE" value={metrics.roeTTM} unit="%" />
            <MetricCard title="ROIC" value={metrics.roicTTM} unit="%" />
            <MetricCard title="Current Ratio" value={metrics.currentRatioTTM} />
            <MetricCard title="Earnings Yield" value={metrics.earningsYieldTTM} unit="%" />
            <MetricCard title="Enterprise Value" value={(metrics.enterpriseValueTTM / 1_000_000_000)} unit="B"/>
            <MetricCard title="Book Value/Share" value={metrics.bookValuePerShareTTM} unit="$" />
            <MetricCard title="Revenue/Share" value={metrics.revenuePerShareTTM} unit="$" />
            <MetricCard title="FCF/Share" value={metrics.freeCashFlowPerShareTTM} unit="$" />
            <MetricCard title="Net Income/Share" value={metrics.netIncomePerShareTTM} unit="$" />
            <MetricCard title="Payout Ratio" value={metrics.payoutRatioTTM} unit="%" />
        </div>
    );
};

export default FundamentalsTab;