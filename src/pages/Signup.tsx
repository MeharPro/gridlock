
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BatteryCharging, ArrowRight, Check } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would connect to an authentication service
      // For now, we'll simulate a successful signup
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        // Ensure onboarding will be shown
        localStorage.removeItem('hasCompletedOnboarding');
        
        navigate('/onboarding');
        toast.success('Account created successfully! Let\'s set up your profile.');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
              <BatteryCharging className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GridLocked</h1>
            <p className="text-gray-600">Optimize your home energy usage</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
            
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full p-3"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-3"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-3"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-3 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">Already have an account? 
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline ml-1 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">By creating an account, you agree to our:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Terms of Service and Privacy Policy</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Data collection for energy optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} GridLocked Energy Inc.</p>
      </footer>
    </div>
  );
};

export default Signup;
