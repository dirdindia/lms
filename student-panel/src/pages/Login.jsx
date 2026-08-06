import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserCircle2, ArrowRight } from 'lucide-react';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        if (res.data.user.role === 'student') {
          navigate('/');
        } else {
          setError('Access denied. You are not a student.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl flex overflow-hidden mx-4 h-[600px] relative z-10 border border-gray-100">
        {/* Left Side - Image/Branding */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight mb-2">VidyaSetu</h1>
            <p className="text-blue-200 font-medium text-lg uppercase tracking-wider">Student Portal</p>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 leading-tight">Your journey begins here.</h2>
            <p className="text-blue-100/80 leading-relaxed max-w-sm">
              Access your courses, connect with mentors, and track your progress all in one place.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="max-w-sm w-full mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <UserCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Login</h2>
              <p className="text-gray-500">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/50 focus:bg-white"
                    placeholder="student@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/50 focus:bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group mt-8 shadow-lg shadow-blue-600/25"
              >
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
