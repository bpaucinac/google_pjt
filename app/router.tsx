import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import CompanyProfilePage from '../modules/company-profile/CompanyProfilePage';
import MainLayout from '../modules/layout/MainLayout';
import { Icons } from '../components/icons/Icons';

const HomePage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Icons.logo className="h-16 w-16 mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Welcome to InvestorFit</h1>
        <p className="mt-4 text-muted-foreground max-w-md">
            Your modern dashboard for financial analysis. To get started, search for a company or try an example.
        </p>
        <div className="mt-6">
            <Link 
                to="/company/AAPL/profile"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
                Analyze Apple (AAPL)
            </Link>
        </div>
    </div>
);


const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/company/:ticker/profile" element={<MainLayout><CompanyProfilePage /></MainLayout>} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;