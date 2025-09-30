import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Lightbulb, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  Calculator,
  Search
} from 'lucide-react';

interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

const AskPenny: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const commonQuestions = [
    {
      category: 'INVOICING',
      icon: FileText,
      question: 'How do I create a new invoice?',
      color: 'blue'
    },
    {
      category: 'COLLECTIONS',
      icon: TrendingUp,
      question: "What's the best way to track overdue payments?",
      color: 'purple'
    },
    {
      category: 'PAYMENTS',
      icon: CreditCard,
      question: 'How do I set up recurring payments?',
      color: 'green'
    },
    {
      category: 'TAXES',
      icon: Calculator,
      question: 'What are the tax implications of my transactions?',
      color: 'orange'
    },
    {
      category: 'FINANCE',
      icon: DollarSign,
      question: 'How can I improve my cash flow?',
      color: 'indigo'
    },
    {
      category: 'CUSTOMERS',
      icon: Users,
      question: 'How do I manage customer credit limits?',
      color: 'pink'
    },
    {
      category: 'PAYMENTS',
      icon: BarChart3,
      question: "What's the difference between ACH and wire transfers?",
      color: 'teal'
    },
    {
      category: 'REPORTING',
      icon: BarChart3,
      question: 'How do I generate financial reports?',
      color: 'cyan'
    }
  ];

  const mockResponses: { [key: string]: string } = {
    'How do I create a new invoice?': 'To create a new invoice, click the "New Invoice" button on the Invoices page. Fill in the customer details, add line items with quantities and prices, and the system will automatically calculate totals and taxes. You can then send the invoice directly to your customer via email.',
    "What's the best way to track overdue payments?": 'Use the Dashboard to monitor overdue invoices. Set up automated payment reminders, and consider offering early payment discounts. The system can send SMS and email reminders automatically based on your preferences.',
    'How do I set up recurring payments?': 'Go to the Bill Pay section and select "Add Biller." Choose "Recurring Monthly Payment" when setting up the payment schedule. You can set the amount, due date, and payment method for automatic processing.',
    'What are the tax implications of my transactions?': 'Tax implications vary by transaction type and jurisdiction. For sales, you may need to collect sales tax. For international transfers, consider foreign exchange reporting requirements. Consult with a tax professional for specific guidance.',
    'How can I improve my cash flow?': 'Consider offering early payment discounts, implementing automated payment reminders, setting shorter payment terms for new customers, and using invoice factoring for immediate cash flow when needed.',
    'How do I manage customer credit limits?': 'Set credit limits in the customer profile based on their payment history and creditworthiness. Monitor outstanding balances and automatically flag customers approaching their limits.',
    "What's the difference between ACH and wire transfers?": 'ACH transfers are slower (1-3 business days) but cheaper, ideal for routine payments. Wire transfers are immediate but more expensive, better for urgent or large transactions. Choose based on timing needs and cost considerations.',
    'How do I generate financial reports?': 'Access the Reports section to generate various financial reports including P&L statements, cash flow reports, and aging reports. You can customize date ranges and export reports in multiple formats.'
  };

  const handleQuestionSubmit = async (question: string) => {
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const answer = mockResponses[question] || 
        "I understand you're asking about accounting and financial management. While I don't have a specific answer for that question, I recommend consulting with your accounting team or referring to our help documentation. You can also try rephrasing your question or selecting from the common questions below.";
      
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        question,
        answer,
        timestamp: new Date()
      };

      setChatHistory(prev => [newMessage, ...prev]);
      setCurrentQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  const handleCommonQuestionClick = (question: string) => {
    setCurrentQuestion(question);
    handleQuestionSubmit(question);
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'border-[#4285F4]/30 text-[#4285F4]',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30',
      orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
      pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-700 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/30',
      teal: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30',
      cyan: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ask Penny AI</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Your intelligent accounting assistant is here to help with any business or financial questions</p>
      </div>

      {/* Hero Section with Image */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-8 text-center">
          <div className="mb-6">
            <img 
              src="/Final Meet Penny Original.jpg" 
              alt="Meet Penny AI - Your Personal Assistant" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Meet Penny AI</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your intelligent accounting assistant is here to help with any business or financial questions
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit(currentQuestion)}
              className="w-full pl-12 pr-24 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="How do I create a new invoice?"
            />
            <button
              onClick={() => handleQuestionSubmit(currentQuestion)}
              disabled={!currentQuestion.trim() || isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
              style={{ backgroundColor: '#4285F4' }}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Ask
            </button>
          </div>
        </div>
      </div>

      {/* Chat Response */}
      {chatHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Penny's Response</h3>
          </div>
          <div className="p-6" style={{ backgroundColor: '#4285F4' + '10' }}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4285F4' }}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {chatHistory[0].timestamp.toLocaleTimeString()}
                </p>
                <p className="text-gray-900 dark:text-white leading-relaxed">
                  {chatHistory[0].answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common Questions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Common Questions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonQuestions.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleCommonQuestionClick(item.question)}
                  className={`p-4 border rounded-lg text-left transition-all duration-200 ${getColorClasses(item.color)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-75">
                        {item.category}
                      </div>
                      <div className="font-medium text-sm">
                        {item.question}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pro Tips for Better Results</h3>
          </div>
        </div>
        <div className="p-6">
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Be specific about your business situation for more targeted advice
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Ask about specific features or processes you're unsure about
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Penny can help with both basic and advanced accounting concepts
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use the common questions above for quick answers to frequent topics
            </li>
          </ul>
        </div>
      </div>

      {/* Chat History */}
      {chatHistory.length > 1 && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Previous Questions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {chatHistory.slice(1).map((chat) => (
                <div key={chat.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">
                    Q: {chat.question}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    A: {chat.answer}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.timestamp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskPenny;