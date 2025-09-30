export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  companyName: string;
  contactName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'discounted' | 'payment-plan';
  lineItems?: InvoiceLineItem[];
  subtotal?: number;
  taxRate?: number;
  taxAmount?: number;
  notes?: string;
}

export interface Customer {
  id: string;
  companyName: string;
  taxId: string;
  primaryContact: string;
  title: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  paymentTerms?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phoneNumbers?: Array<{
    type: 'primary' | 'secondary' | 'mobile';
    number: string;
  }>;
  emailAddresses?: Array<{
    type: 'primary' | 'billing' | 'accounting';
    email: string;
  }>;
  smsOptIn?: boolean;
  notes?: string;
}

export interface BillPayment {
  id: string;
  vendor: string;
  description: string;
  dueDate: string;
  amount: number;
  originalAmount?: number;
  paymentMethod: 'ACH' | 'CREDIT CARD' | 'DEBIT CARD' | 'WIRE' | 'CHECK' | 'RTP' | 'FED NOW' | 'FED WIRE' | 'TABAPAY';
  status: 'scheduled' | 'paid' | 'overdue' | 'cancelled';
  discount?: number;
  frequency?: 'one-time' | 'monthly' | 'quarterly' | 'annual';
}

export interface InvoiceActivity {
  id: string;
  invoiceId: string;
  type: 'email' | 'sms' | 'call' | 'payment' | 'note';
  description: string;
  details?: string;
  timestamp: string;
  user?: string;
  amount?: number;
}

export interface DashboardKPI {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon: string;
}

export interface Recipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  country: string;
  currency: string;
  bankName: string;
  accountNumber: string;
  routingNumber?: string;
  swiftCode?: string;
  iban?: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  relationship: string;
  createdAt: string;
}

export interface RemittanceTransaction {
  id: string;
  recipientId: string;
  recipientName: string;
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  fees: number;
  totalCost: number;
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled' | 'failed';
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
  purpose: string;
}

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  fees: {
    fixed: number;
    percentage: number;
  };
  lastUpdated: string;
}