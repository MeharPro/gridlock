
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Home, Battery, Fan, LightbulbOff, ThermometerSnowflake, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
  type: 'single' | 'multiple' | 'text';
  key: string;
  required?: boolean;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const questions: QuizQuestion[] = [
    {
      question: "Welcome! Let's get to know you better",
      options: [],
      type: "text",
      key: "name",
      required: true
    },
    {
      question: "What type of home do you live in?",
      options: [
        { value: "house", label: "House", icon: <Home className="w-6 h-6" /> },
        { value: "apartment", label: "Apartment", icon: <Home className="w-6 h-6" /> },
        { value: "condo", label: "Condo", icon: <Home className="w-6 h-6" /> },
        { value: "other", label: "Other", icon: <Home className="w-6 h-6" /> },
      ],
      type: "single",
      key: "homeType"
    },
    {
      question: "Which major appliances do you own?",
      options: [
        { value: "washer", label: "Washing Machine" },
        { value: "dryer", label: "Dryer" },
        { value: "dishwasher", label: "Dishwasher" },
        { value: "ev_charger", label: "EV Charger" },
      ],
      type: "multiple",
      key: "appliances"
    },
    {
      question: "Do you have any renewable energy sources?",
      options: [
        { value: "solar", label: "Solar Panels", icon: <Battery className="w-6 h-6" /> },
        { value: "home_battery", label: "Home Battery", icon: <Battery className="w-6 h-6" /> },
        { value: "none", label: "None", icon: <LightbulbOff className="w-6 h-6" /> },
      ],
      type: "multiple",
      key: "renewables"
    },
    {
      question: "What is your typical energy usage pattern?",
      options: [
        { value: "morning", label: "Morning Heavy (5am-9am)" },
        { value: "daytime", label: "Daytime (9am-5pm)" },
        { value: "evening", label: "Evening Heavy (5pm-10pm)" },
        { value: "night", label: "Night (10pm-5am)" },
      ],
      type: "multiple",
      key: "usagePattern"
    },
    {
      question: "Which energy-saving features interest you?",
      options: [
        { value: "scheduling", label: "Smart Scheduling" },
        { value: "analysis", label: "Usage Analysis" },
        { value: "community", label: "Community Sharing" },
        { value: "savings", label: "Cost Savings" },
      ],
      type: "multiple",
      key: "interests"
    }
  ];

  const handleSingleOptionSelect = (key: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMultipleOptionSelect = (key: string, value: string) => {
    setAnswers((prev) => {
      const currentValues = prev[key] || [];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [key]: currentValues.filter((v: string) => v !== value)
        };
      } else {
        return {
          ...prev,
          [key]: [...currentValues, value]
        };
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    
    // Validate name fields
    if (currentQuestion.key === 'name') {
      if (!answers.firstName || !answers.lastName) {
        toast.error('Please enter both your first and last name');
        return;
      }
    }
    // Validate other question types
    else if (currentQuestion.type === 'single' && !answers[currentQuestion.key]) {
      toast.error('Please select an option to continue');
      return;
    }
    else if (currentQuestion.type === 'multiple' && 
        (!answers[currentQuestion.key] || answers[currentQuestion.key].length === 0)) {
      toast.error('Please select at least one option to continue');
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishOnboarding = () => {
    setIsLoading(true);
    
    // In a real app, this would save user preferences to a database
    setTimeout(() => {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('userPreferences', JSON.stringify(answers));
      
      navigate('/');
      toast.success(`Welcome to GridLocked, ${answers.firstName}!`);
      setIsLoading(false);
    }, 1000);
  };

  const currentQuestion = questions[currentStep];
  const isMultipleSelect = currentQuestion.type === 'multiple';
  const isTextInput = currentQuestion.type === 'text';
  const selectedValues = answers[currentQuestion.key] || (isMultipleSelect ? [] : '');

  const progressPercentage = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        <div className="mb-8 pt-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-h3 font-bold text-primary">Setup your profile</h1>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
              {currentStep + 1}/{questions.length}
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-h2 font-semibold mb-6">{currentQuestion.question}</h2>
          
          {isTextInput ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="firstName"
                    name="firstName"
                    value={answers.firstName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="lastName"
                    name="lastName"
                    value={answers.lastName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = isMultipleSelect 
                  ? selectedValues.includes(option.value)
                  : selectedValues === option.value;
                  
                return (
                  <div 
                    key={option.value}
                    onClick={() => {
                      if (isMultipleSelect) {
                        handleMultipleOptionSelect(currentQuestion.key, option.value);
                      } else {
                        handleSingleOptionSelect(currentQuestion.key, option.value);
                      }
                    }}
                    className={`
                      flex items-center p-4 rounded-xl cursor-pointer transition-all
                      ${isSelected 
                        ? 'bg-primary/10 border border-primary shadow-md' 
                        : 'bg-white border border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    {option.icon && (
                      <div className={`mr-3 ${isSelected ? 'text-primary' : 'text-gray-400'}`}>
                        {option.icon}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <p className={`font-medium ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                        {option.label}
                      </p>
                    </div>
                    
                    <div className={`
                      w-5 h-5 rounded-full border flex items-center justify-center
                      ${isSelected 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300'}
                    `}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-white"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex-1 ${currentStep === 0 ? 'opacity-50' : ''}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary text-white"
            disabled={isLoading}
          >
            {currentStep < questions.length - 1 
              ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )
              : isLoading 
                ? 'Finalizing...' 
                : 'Complete Setup'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
