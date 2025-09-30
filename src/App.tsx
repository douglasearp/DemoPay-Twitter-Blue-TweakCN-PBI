import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Invoices from './components/Invoices';
import Customers from './components/Customers';
import BillPay from './components/BillPay';
import InvoiceActivity from './components/InvoiceActivity';
import CrossBorder from './components/CrossBorder';
import Security from './components/Security';
import AskPenny from './components/AskPenny';
import P2PA2A from './components/P2PA2A';
import Integrations from './components/Integrations';
import Reporting from './components/Reporting';
import Settings from './components/Settings';
import type { Invoice } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleViewActivity = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCurrentPage('invoice-activity');
  };

  const handleBackToInvoices = () => {
    setSelectedInvoice(null);
    setCurrentPage('invoices');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'invoices':
        return <Invoices onViewActivity={handleViewActivity} />;
      case 'customers':
        return <Customers />;
      case 'billpay':
        return <BillPay />;
      case 'crossborder':
        return <CrossBorder />;
      case 'p2pa2a':
        return <P2PA2A />;
      case 'integrations':
        return <Integrations />;
      case 'reporting':
        return <Reporting />;
      case 'askpenny':
        return <AskPenny />;
      case 'settings':
        return <Settings />;
      case 'security':
        return <Security />;
      case 'invoice-activity':
        return selectedInvoice ? (
          <InvoiceActivity invoice={selectedInvoice} onBack={handleBackToInvoices} />
        ) : (
          <Dashboard />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderCurrentPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;