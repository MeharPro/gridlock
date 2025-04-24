
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BatteryCharging, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would connect to an authentication service
      // For now, we'll simulate a successful login
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        
        // Check if user has completed onboarding
        const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
        
        if (hasCompletedOnboarding) {
          navigate('/');
          toast.success('Welcome back!');
        } else {
          navigate('/onboarding');
          toast.success('Login successful! Let\'s complete your profile.');
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  // For demo purposes, allow quick login
  const handleDemoLogin = () => {
    setEmail('demo@example.com');
    setPassword('password123');
    
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/onboarding');
      toast.success('Welcome to the demo! Let\'s set up your profile.');
    }, 500);
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
            <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
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
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
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
              
              <Button 
                type="submit" 
                className="w-full py-3 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">Don't have an account? 
                <button
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline ml-1 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
              >
                Try Demo
              </Button>
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

export default Login;
