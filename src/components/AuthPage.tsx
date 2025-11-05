import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  BookOpen,
  ArrowLeft,
  Mail,
  Lock,
  User,
  GraduationCap,
  Building,
  Calendar,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { loginUser, registerUser } from '../api/auth'; // ✅ Connected to your backend

export function AuthPage({ onAuth, onNavigate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    stream: '',
    college: '',
    year: '',
  });

  // ✅ Handle Login with real API
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(loginForm);
      if (data?.token && data?.user) {
        localStorage.setItem('token', data.token);
        onAuth(data.user);
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle Signup with real API
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await registerUser(signupForm);
      if (data?.token && data?.user) {
        localStorage.setItem('token', data.token);
        onAuth(data.user);
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      {/* Background Blur Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => onNavigate('landing')}
          className="mb-8 glass border-white/20 hover:bg-white/60 hover-lift transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>

        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              CuriousHeads
            </span>
          </div>
          <p className="text-slate-600 text-lg">Join the learning revolution</p>
        </div>

        <Card className="glass border-white/20 shadow-luxury animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass border-white/20 bg-white/30 p-1">
                <TabsTrigger value="login" className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-elegant">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-elegant">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login" className="mt-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="pl-11 glass border-white/20 focus-elegant bg-white/60"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="pl-11 pr-11 glass border-white/20 focus-elegant bg-white/60"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <Button type="submit" className="w-full btn-premium hover-glow shadow-elegant py-3 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup */}
              <TabsContent value="signup" className="mt-8">
                <form onSubmit={handleSignup} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        placeholder="Enter your full name"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                        className="pl-11 glass border-white/20 focus-elegant bg-white/60"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        className="pl-11 glass border-white/20 focus-elegant bg-white/60"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        className="pl-11 pr-11 glass border-white/20 focus-elegant bg-white/60"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Stream */}
                  <div className="space-y-2">
                    <Label>Stream</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                      <Select value={signupForm.stream} onValueChange={(value) => setSignupForm({ ...signupForm, stream: value })}>
                        <SelectTrigger className="pl-11 glass border-white/20 focus-elegant bg-white/60">
                          <SelectValue placeholder="Select your stream" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="commerce">Commerce</SelectItem>
                          <SelectItem value="arts">Arts</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* College */}
                  <div className="space-y-2">
                    <Label>College</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        placeholder="Enter your college name"
                        value={signupForm.college}
                        onChange={(e) => setSignupForm({ ...signupForm, college: e.target.value })}
                        className="pl-11 glass border-white/20 focus-elegant bg-white/60"
                        required
                      />
                    </div>
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                      <Select value={signupForm.year} onValueChange={(value) => setSignupForm({ ...signupForm, year: value })}>
                        <SelectTrigger className="pl-11 glass border-white/20 focus-elegant bg-white/60">
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                          <SelectItem value="postgrad">Post Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <Button type="submit" className="w-full btn-premium hover-glow shadow-elegant py-3 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Create Account</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
