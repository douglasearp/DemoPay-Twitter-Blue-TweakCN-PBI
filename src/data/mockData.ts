import { Invoice, Customer, BillPayment, InvoiceActivity } from '../types';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV2025090001',
    companyName: 'Walmart Inc.',
    contactName: 'Joe Bahama',
    date: '2025-01-11',
    dueDate: '2025-01-12',
    amount: 50.00,
    status: 'pending',
    lineItems: [
      { id: '1', description: 'Consulting Services', quantity: 2, unitPrice: 25.00, total: 50.00 }
    ],
    subtotal: 50.00,
    taxRate: 0,
    taxAmount: 0
  },
  {
    id: '2',
    invoiceNumber: 'INV2025090002',
    companyName: 'Amazon.com Inc.',
    contactName: 'Mary Brown',
    date: '2025-01-10',
    dueDate: '2025-01-11',
    amount: 50.00,
    status: 'discounted'
  },
  {
    id: '3',
    invoiceNumber: 'INV2025090003',
    companyName: 'AutoZone Inc.',
    contactName: 'Dwayne Johnson',
    date: '2025-09-25',
    dueDate: '2025-10-25',
    amount: 90.00,
    status: 'pending'
  },
  {
    id: '4',
    invoiceNumber: 'INV2025090004',
    companyName: 'Walmart Inc.',
    contactName: 'Susan Smith',
    date: '2025-01-14',
    dueDate: '2025-01-14',
    amount: 50.00,
    status: 'pending'
  },
  {
    id: '5',
    invoiceNumber: 'INV2025090005',
    companyName: 'Amazon.com Inc.',
    contactName: 'David Wilson',
    date: '2025-01-18',
    dueDate: '2025-01-18',
    amount: 90.00,
    status: 'pending'
  },
  {
    id: '6',
    invoiceNumber: 'INV2025090006',
    companyName: 'AutoZone Inc.',
    contactName: 'Lisa Davis',
    date: '2025-10-25',
    dueDate: '2025-10-25',
    amount: 50.00,
    status: 'pending'
  },
  {
    id: '7',
    invoiceNumber: 'INV2025090007',
    companyName: 'Walmart Inc.',
    contactName: 'John Miller',
    date: '2025-08-01',
    dueDate: '2025-08-01',
    amount: 1200.00,
    status: 'overdue'
  },
  {
    id: '8',
    invoiceNumber: 'INV2025090008',
    companyName: 'Amazon.com Inc.',
    contactName: 'Sarah Johnson',
    date: '2025-01-01',
    dueDate: '2025-01-01',
    amount: 90.00,
    status: 'payment-plan'
  },
  {
    id: '9',
    invoiceNumber: 'INV2025090009',
    companyName: 'AutoZone Inc.',
    contactName: 'Mike Thompson',
    date: '2025-10-25',
    dueDate: '2025-10-25',
    amount: 20222.56,
    status: 'pending'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    companyName: 'Walmart Inc.',
    taxId: '71-0415188',
    primaryContact: 'Joe Bahama',
    title: 'Accounts Payable Manager',
    email: 'contact@walmart.com',
    phone: '(479) 273-4000',
    status: 'active',
    paymentTerms: 'Net 30',
    address: {
      street: '702 SW 8th Street',
      city: 'Bentonville',
      state: 'AR',
      zipCode: '72716',
      country: 'USA'
    },
    phoneNumbers: [
      { type: 'primary', number: '(479) 273-4000' },
      { type: 'mobile', number: '(479) 555-0123' }
    ],
    emailAddresses: [
      { type: 'primary', email: 'contact@walmart.com' },
      { type: 'billing', email: 'billing@walmart.com' }
    ],
    smsOptIn: true
  },
  {
    id: '2',
    companyName: 'Amazon.com Inc.',
    taxId: '91-1646860',
    primaryContact: 'Mary Brown',
    title: 'Supply Chain Manager',
    email: 'contact@amazon.com',
    phone: '(206) 266-1000',
    status: 'active',
    paymentTerms: 'Net 45',
    address: {
      street: '410 Terry Avenue North',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98109',
      country: 'USA'
    },
    phoneNumbers: [
      { type: 'primary', number: '(206) 266-1000' }
    ],
    emailAddresses: [
      { type: 'primary', email: 'contact@amazon.com' }
    ],
    smsOptIn: false
  },
  {
    id: '3',
    companyName: 'AutoZone Inc.',
    taxId: '62-1482048',
    primaryContact: 'Dwayne Johnson',
    title: 'Operations Manager',
    email: 'contact@autozone.com',
    phone: '(901) 495-6500',
    status: 'active',
    paymentTerms: 'Net 30',
    address: {
      street: '123 South Front Street',
      city: 'Memphis',
      state: 'TN',
      zipCode: '38103',
      country: 'USA'
    },
    phoneNumbers: [
      { type: 'primary', number: '(901) 495-6500' }
    ],
    emailAddresses: [
      { type: 'primary', email: 'contact@autozone.com' }
    ],
    smsOptIn: true
  }
];

export const mockBillPayments: BillPayment[] = [
  {
    id: '1',
    vendor: 'Pacific Gas & Electric (PG&E)',
    description: 'Monthly utility payment',
    dueDate: '2025-01-15',
    amount: 125.50,
    paymentMethod: 'ACH',
    status: 'scheduled',
    frequency: 'monthly'
  },
  {
    id: '2',
    vendor: 'Verizon Wireless',
    description: 'Monthly service payment',
    dueDate: '2025-01-05',
    amount: 85.00,
    paymentMethod: 'CREDIT CARD',
    status: 'scheduled',
    frequency: 'monthly'
  },
  {
    id: '3',
    vendor: 'Chase Bank Credit Card',
    description: 'Scheduled payment',
    dueDate: '2025-01-20',
    amount: 405.00,
    originalAmount: 450.00,
    paymentMethod: 'ACH',
    status: 'scheduled',
    discount: 45.00,
    frequency: 'monthly'
  },
  {
    id: '4',
    vendor: 'State Farm Insurance',
    description: 'One-time premium payment',
    dueDate: '2025-01-25',
    amount: 215.00,
    originalAmount: 220.00,
    paymentMethod: 'DEBIT CARD',
    status: 'scheduled',
    discount: 5.00,
    frequency: 'one-time'
  }
];

export const mockInvoiceActivities: InvoiceActivity[] = [
  {
    id: '1',
    invoiceId: '7',
    type: 'email',
    description: 'Initial Email',
    details: 'Invoice created and sent\nLarge amount invoice with same-day terms',
    timestamp: '2025-08-01T17:00:00Z',
    user: 'System'
  },
  {
    id: '2',
    invoiceId: '7',
    type: 'sms',
    description: 'Payment reminder sent',
    details: 'First payment reminder after 2 weeks',
    timestamp: '2025-08-15T16:00:00Z',
    user: 'System'
  },
  {
    id: '3',
    invoiceId: '7',
    type: 'call',
    description: 'Live agent contacted customer',
    details: 'Agent reached out due to extended overdue period',
    timestamp: '2025-09-01T17:00:00Z',
    user: 'Invoice Manager'
  }
];

export const dashboardKPIs = {
  revenue: {
    totalRevenue: '$2,847,392',
    monthlyGrowth: '+12.5%',
    trend: 'up' as const
  },
  invoices: {
    totalInvoices: 1249,
    pendingInvoices: 87,
    overdueInvoices: 12,
    totalPending: '$89,847',
    totalOverdue: '$15,230'
  },
  payments: {
    scheduledPayments: 24,
    totalScheduled: '$12,847',
    completedThisMonth: 156,
    totalCompleted: '$89,432'
  },
  customers: {
    totalCustomers: 342,
    activeCustomers: 298,
    newThisMonth: 18
  }
};

export const mockRecipients: Recipient[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '+52-555-123-4567',
    country: 'Mexico',
    currency: 'MXN',
    bankName: 'Banco Santander Mexico',
    accountNumber: '1234567890123456',
    swiftCode: 'BMSXMXMM',
    address: {
      street: 'Av. Insurgentes Sur 1234',
      city: 'Mexico City',
      state: 'CDMX',
      postalCode: '03100',
      country: 'Mexico'
    },
    relationship: 'Supplier',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'James Chen',
    email: 'james.chen@business.com',
    phone: '+86-138-0013-8000',
    country: 'China',
    currency: 'CNY',
    bankName: 'Industrial and Commercial Bank of China',
    accountNumber: '6222021234567890',
    swiftCode: 'ICBKCNBJ',
    address: {
      street: '88 Century Avenue',
      city: 'Shanghai',
      postalCode: '200120',
      country: 'China'
    },
    relationship: 'Manufacturer',
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya.sharma@tech.in',
    phone: '+91-98765-43210',
    country: 'India',
    currency: 'INR',
    bankName: 'State Bank of India',
    accountNumber: '12345678901',
    swiftCode: 'SBININBB',
    address: {
      street: 'MG Road, Block A',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India'
    },
    relationship: 'Contractor',
    createdAt: '2024-01-20'
  }
];

export const mockRemittanceTransactions: RemittanceTransaction[] = [
  {
    id: 'TXN001',
    recipientId: '1',
    recipientName: 'Maria Rodriguez',
    sendAmount: 5000,
    sendCurrency: 'USD',
    receiveAmount: 85750,
    receiveCurrency: 'MXN',
    exchangeRate: 17.15,
    fees: 25,
    totalCost: 5025,
    status: 'delivered',
    createdAt: '2025-01-10T10:30:00Z',
    estimatedDelivery: '2025-01-11T15:00:00Z',
    trackingNumber: 'BW123456789',
    purpose: 'Business Payment'
  },
  {
    id: 'TXN002',
    recipientId: '2',
    recipientName: 'James Chen',
    sendAmount: 10000,
    sendCurrency: 'USD',
    receiveAmount: 71500,
    receiveCurrency: 'CNY',
    exchangeRate: 7.15,
    fees: 45,
    totalCost: 10045,
    status: 'in-transit',
    createdAt: '2025-01-12T14:20:00Z',
    estimatedDelivery: '2025-01-14T12:00:00Z',
    trackingNumber: 'BW987654321',
    purpose: 'Supplier Payment'
  },
  {
    id: 'TXN003',
    recipientId: '3',
    recipientName: 'Priya Sharma',
    sendAmount: 2500,
    sendCurrency: 'USD',
    receiveAmount: 208750,
    receiveCurrency: 'INR',
    exchangeRate: 83.5,
    fees: 15,
    totalCost: 2515,
    status: 'processing',
    createdAt: '2025-01-13T09:15:00Z',
    estimatedDelivery: '2025-01-15T10:00:00Z',
    trackingNumber: 'BW456789123',
    purpose: 'Contractor Payment'
  }
];

export const mockExchangeRates: ExchangeRate[] = [
  {
    fromCurrency: 'USD',
    toCurrency: 'MXN',
    rate: 17.15,
    fees: { fixed: 5, percentage: 0.4 },
    lastUpdated: '2025-01-13T16:30:00Z'
  },
  {
    fromCurrency: 'USD',
    toCurrency: 'CNY',
    rate: 7.15,
    fees: { fixed: 10, percentage: 0.45 },
    lastUpdated: '2025-01-13T16:30:00Z'
  },
  {
    fromCurrency: 'USD',
    toCurrency: 'INR',
    rate: 83.5,
    fees: { fixed: 3, percentage: 0.35 },
    lastUpdated: '2025-01-13T16:30:00Z'
  },
  {
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    rate: 0.92,
    fees: { fixed: 8, percentage: 0.5 },
    lastUpdated: '2025-01-13T16:30:00Z'
  },
  {
    fromCurrency: 'USD',
    toCurrency: 'GBP',
    rate: 0.78,
    fees: { fixed: 12, percentage: 0.6 },
    lastUpdated: '2025-01-13T16:30:00Z'
  }
];