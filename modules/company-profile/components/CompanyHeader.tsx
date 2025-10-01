import React from 'react';
import { CompanyProfile, Quote } from '../../../types/api';
import { cn } from '../../../lib/utils';

interface CompanyHeaderProps {
  profile: CompanyProfile;
  quote: Quote;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ profile, quote }) => {
  const isPositive = quote.change >= 0;

  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <img
          src={profile.image}
          alt={`${profile.companyName} logo`}
          className="h-16 w-16 rounded-md object-contain bg-white p-1"
          onError={(e) => { e.currentTarget.src = `https://avatar.vercel.sh/${profile.symbol}.png` }}
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.companyName}</h1>
          <p className="text-muted-foreground">{profile.symbol} &middot; {profile.exchangeShortName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold tracking-tight">
            {profile.currency} {quote.price.toFixed(2)}
        </p>
        <p className={cn(
          "text-md font-semibold",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? '+' : ''}{quote.change.toFixed(2)} ({isPositive ? '+' : ''}{quote.changesPercentage.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};

export default CompanyHeader;
