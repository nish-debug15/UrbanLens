import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';

export function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex flex-col">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white p-8 pb-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyan-300 rounded-full blur-2xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-6 border border-white/20 shadow-2xl">
              <Eye className="w-12 h-12" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl text-center mb-2 font-bold tracking-tight">UrbanLens</h1>
          <div className="flex items-center justify-center gap-2 text-cyan-100">
            <Sparkles className="w-4 h-4" />
            <p className="text-center font-medium">Bengaluru Smart City</p>
          </div>
        </motion.div>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 -mt-12 bg-white rounded-t-[32px] p-6 shadow-2xl relative z-10"
      >
        <div className="max-w-md mx-auto">
          {/* Tab Selector */}
          <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center font-semibold rounded-xl transition-all duration-200 ${
                isLogin 
                  ? 'bg-white text-cyan-600 shadow-md' 
                  : 'text-slate-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center font-semibold rounded-xl transition-all duration-200 ${
                !isLogin 
                  ? 'bg-white text-cyan-600 shadow-md' 
                  : 'text-slate-500'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 bg-slate-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 bg-slate-50"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label htmlFor="confirm-password" className="text-slate-700 font-semibold">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 bg-slate-50"
                    required
                  />
                </div>
              </motion.div>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-cyan-600 font-medium hover:text-cyan-700">
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-cyan-500/30 font-semibold"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </form>

          <p className="text-xs text-center text-slate-500 mt-6">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
