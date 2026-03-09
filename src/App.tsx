import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Star, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  Camera, 
  LayoutDashboard, 
  CheckCircle, 
  MessageSquare,
  BarChart3,
  LogOut,
  Download,
  Plus,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  BOTSWANA_DISTRICTS, 
  DISTRICT_PLACES, 
  BUSINESS_CATEGORIES, 
  COUNTRIES,
  PACKAGES
} from './lib/constants';

import { supabase, isSupabaseConfigured } from './lib/supabase';
import { cn } from './lib/utils';
import { supabaseService } from './services/supabaseService';
import { UserRole, Business, BusinessMedia, PackageType, BusinessStatus, UserProfile } from './types';

// --- Components ---

const Navbar = ({ user, onLogout }: { user: UserProfile | null; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Botswana Tourism Hub</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-gray-600 hover:text-black font-medium transition-colors">Explore</Link>
            <Link to="/community" className="text-gray-600 hover:text-black font-medium transition-colors">Community</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={user.role === 'admin' ? '/admin' : user.role === 'business' ? '/business' : '/pwa'}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
                >
                  Dashboard
                </Link>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-black font-medium">Login</Link>
                <Link to="/signup" className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4"
          >
            <Link to="/explore" className="block text-gray-600 font-medium">Explore</Link>
            <Link to="/community" className="block text-gray-600 font-medium">Community</Link>
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : user.role === 'business' ? '/business' : '/pwa'} className="block text-black font-bold">Dashboard</Link>
                <button onClick={onLogout} className="block text-red-500 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 font-medium">Login</Link>
                <Link to="/signup" className="block bg-black text-white px-4 py-2 rounded-lg text-center font-semibold">Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/botswana-hero/1920/1080" 
            alt="Botswana Landscape" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Discover the Soul of <span className="text-blue-400">Botswana</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
          >
            From the emerald waterways of the Okavango to the golden sands of the Kalahari. Experience Africa's last great wilderness.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
              Explore Destinations
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Install App
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Destinations</h2>
            <p className="text-gray-500">Hand-picked locations for your next adventure</p>
          </div>
          <Link to="/explore" className="text-black font-semibold flex items-center gap-1 hover:underline">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Okavango Delta', img: 'okavango', desc: 'Inland River Delta' },
            { name: 'Chobe National Park', img: 'chobe', desc: 'Elephant Paradise' },
            { name: 'Makgadikgadi Pans', img: 'pans', desc: 'Salt Flat Wilderness' },
            { name: 'Tsodilo Hills', img: 'tsodilo', desc: 'Ancient Rock Art' }
          ].map((dest) => (
            <motion.div 
              key={dest.name}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-3xl overflow-hidden mb-4 shadow-lg">
                <img 
                  src={`https://picsum.photos/seed/${dest.img}/600/800`} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                  <p className="text-sm text-gray-300">{dest.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Explore Categories */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Quick Explore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Safari Tours', icon: <Camera className="w-6 h-6" /> },
              { name: 'Luxury Lodges', icon: <Heart className="w-6 h-6" /> },
              { name: 'Cultural Experiences', icon: <Globe className="w-6 h-6" /> },
              { name: 'Adventure Activities', icon: <MapPin className="w-6 h-6" /> },
              { name: 'Restaurants', icon: <Star className="w-6 h-6" /> },
              { name: 'Car Rental', icon: <ChevronRight className="w-6 h-6" /> },
              { name: 'Guest Houses', icon: <User className="w-6 h-6" /> },
              { name: 'Aviation Tours', icon: <Camera className="w-6 h-6" /> }
            ].map((cat) => (
              <button 
                key={cat.name}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3 text-center group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <span className="font-semibold text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Community Feedback Preview */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-black rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold">Community Voice</h2>
            <p className="text-gray-400 text-lg">We listen to our tourists and businesses to build a better tourism ecosystem for everyone.</p>
            <div className="space-y-4">
              {[
                { name: 'Sarah J.', country: 'UK', msg: 'The Okavango Delta was life-changing!' },
                { name: 'Kabelo M.', country: 'BW', msg: 'Great platform for my safari business.' }
              ].map((f, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-2xl border border-white/5">
                  <p className="italic mb-2">"{f.msg}"</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-bold text-white">{f.name}</span>
                    <span>•</span>
                    <span>{f.country}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
              Submit Feedback
            </button>
          </div>
          <div className="flex-1">
            <img 
              src="https://picsum.photos/seed/community/800/600" 
              alt="Community" 
              className="rounded-3xl shadow-2xl rotate-3"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await supabaseService.signIn(email, password);
      const profile = await supabaseService.getProfile(user.id);
      
      if (profile.role === 'admin') navigate('/admin');
      else if (profile.role === 'business') navigate('/business');
      else navigate('/pwa');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your tourism account</p>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-black font-bold hover:underline">Sign up</Link>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-400">
          <p className="font-bold mb-1">Demo Credentials:</p>
          <p>Admin: admin@bth.com</p>
          <p>Business: business@bth.com</p>
          <p>Tourist: tourist@bth.com</p>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  const [role, setRole] = useState<UserRole>('tourist');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    category: BUSINESS_CATEGORIES[0],
    whatsapp: '',
    office: '',
    website: '',
    district: '',
    place: '',
    country: '',
  });

  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [files, setFiles] = useState<{cert?: File, payment?: File}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cert' | 'payment') => {
    if (e.target.files?.[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleTouristSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const country = COUNTRIES.find(c => c.code === formData.country);
      await supabaseService.signUp(
        formData.email,
        formData.password,
        formData.fullName,
        'tourist',
        {
          country_code: formData.country,
          continent: country?.continent || 'Unknown'
        }
      );
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // 1. Create Auth User & Profile
      let user;
      try {
        user = await supabaseService.signUp(
          formData.email,
          formData.password,
          formData.fullName,
          'business'
        );
      } catch (err: any) {
        console.error('Auth signup failed:', err);
        throw new Error(`Step 1 (Account Creation) failed: ${err.message}`);
      }

      // 2. Upload Certificate
      let certUrl = '';
      if (files.cert) {
        try {
          const fileExt = files.cert.name.split('.').pop();
          const fileName = `${user.id}/certificate_${Math.random()}.${fileExt}`;
          certUrl = await supabaseService.uploadFile('business-docs', fileName, files.cert);
        } catch (err: any) {
          console.error('Certificate upload failed:', err);
          throw new Error(`Step 2 (Certificate Upload) failed: ${err.message}. Ensure the "business-docs" bucket exists and has public upload policies.`);
        }
      }

      // 3. Upload Payment Proof
      let paymentUrl = '';
      if (files.payment) {
        try {
          const fileExt = files.payment.name.split('.').pop();
          const fileName = `${user.id}/payment_${Math.random()}.${fileExt}`;
          paymentUrl = await supabaseService.uploadFile('payments', fileName, files.payment);
        } catch (err: any) {
          console.error('Payment upload failed:', err);
          throw new Error(`Step 3 (Payment Upload) failed: ${err.message}. Ensure the "payments" bucket exists and has public upload policies.`);
        }
      }

      // 4. Create Business Record
      try {
        await supabaseService.createBusiness({
          user_id: user.id,
          business_name: formData.businessName,
          category: formData.category,
          email: formData.email,
          phone_whatsapp: formData.whatsapp,
          phone_office: formData.office,
          website: formData.website,
          location_district: formData.district,
          location_place: formData.place,
          package_type: selectedPackage as PackageType,
          certificate_url: certUrl,
          payment_proof_url: paymentUrl,
          status: 'pending'
        });
      } catch (err: any) {
        console.error('Business record creation failed:', err);
        throw new Error(`Step 4 (Business Registration) failed: ${err.message}`);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Full onboarding error:', err);
      if (err.message.includes('Failed to fetch')) {
        setError(`${err.message}. This is a network error. Please check if your Supabase project is paused or if your internet is blocking the connection to Supabase.`);
      } else {
        setError(err.message || 'Onboarding failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for choosing Botswana Tourism Hub. Our team will review your application and attachments within 24-48 hours.
          </p>
          <Link to="/" className="block w-full bg-black text-white py-4 rounded-xl font-bold">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            {role === 'business' ? `Business Onboarding - Step ${step}` : 'Create Account'}
          </h1>
          <p className="text-gray-500">
            {role === 'business' ? 'Follow the steps to list your business' : 'Join the Botswana Tourism Hub'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="flex p-1 bg-gray-100 rounded-xl mb-10">
            {(['tourist', 'business'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "flex-1 py-3 rounded-lg text-sm font-bold transition-all capitalize",
                  role === r ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {role === 'tourist' ? (
            <form onSubmit={handleTouristSignup} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    name="fullName"
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                    placeholder="John Doe" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Password</label>
                  <input 
                    name="password"
                    type="password" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Country of Origin</label>
                  <select 
                    name="country"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none appearance-none bg-white"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Tourist Account'}
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Name</label>
                      <input 
                        name="businessName"
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="Safari Lodge Ltd" 
                        value={formData.businessName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Category</label>
                      <select 
                        name="category"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        {BUSINESS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Email</label>
                      <input 
                        name="email"
                        type="email" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="info@safari.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name (Owner)</label>
                      <input 
                        name="fullName"
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="Jane Smith" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Password</label>
                      <input 
                        name="password"
                        type="password" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="••••••••" 
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                      <input 
                        name="confirmPassword"
                        type="password" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="••••••••" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
                      <input 
                        name="whatsapp"
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="+267 ..." 
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Office Number</label>
                      <input 
                        name="office"
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                        placeholder="+267 ..." 
                        value={formData.office}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">District</label>
                      <select 
                        name="district"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white"
                        value={formData.district}
                        onChange={handleInputChange}
                      >
                        <option value="">Select District</option>
                        {BOTSWANA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Place</label>
                      <select 
                        name="place"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white"
                        value={formData.place}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Place</option>
                        {formData.district && DISTRICT_PLACES[formData.district]?.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Business Certificate (PDF/JPG)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-black transition-all cursor-pointer relative">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'cert')} />
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">{files.cert ? files.cert.name : 'Click to upload certificate'}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="w-full bg-black text-white py-4 rounded-xl font-bold">Next: Choose Package</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PACKAGES.map((pkg) => (
                      <div 
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={cn(
                          "p-6 rounded-2xl border-2 transition-all cursor-pointer",
                          selectedPackage === pkg.id ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                        <p className="text-2xl font-black mb-4">P{pkg.price}</p>
                        <ul className="space-y-2 text-xs text-gray-500">
                          {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> {f}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl font-bold border border-gray-200">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-black text-white py-4 rounded-xl font-bold">Next: Payment</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold">Payment Instructions</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Orange Money:</strong> +267 71234567</p>
                      <p><strong>Bank Transfer:</strong> FNB Botswana, Acc: 62123456789, Branch: 284567</p>
                      <p><strong>Reference:</strong> [Your Business Name]</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Proof of Payment</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-black transition-all cursor-pointer relative">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'payment')} />
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">{files.payment ? files.payment.name : 'Upload receipt/screenshot'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl font-bold border border-gray-200">Back</button>
                    <button 
                      type="button" 
                      onClick={handleBusinessSignup} 
                      disabled={loading}
                      className="flex-1 bg-black text-white py-4 rounded-xl font-bold disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'approvals'>('analytics');
  const [rejectionModal, setRejectionModal] = useState<{ isOpen: boolean, businessId: string | null }>({ isOpen: false, businessId: null });
  const [rejectionReason, setRejectionReason] = useState('');
  const [pendingBusinesses, setPendingBusinesses] = useState<Business[]>([]);
  const [analytics, setAnalytics] = useState<{ continents: any[], districts: any[] }>({ continents: [], districts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'approvals') {
        const data = await supabaseService.getBusinesses({ status: 'pending' });
        setPendingBusinesses(data);
      } else {
        const data = await supabaseService.getAdminAnalytics();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Admin fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await supabaseService.updateBusiness(id, { status: 'approved' });
      setPendingBusinesses(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      alert('Failed to approve business');
    }
  };

  const handleReject = async () => {
    if (!rejectionModal.businessId || !rejectionReason) return;
    try {
      await supabaseService.updateBusiness(rejectionModal.businessId, { 
        status: 'rejected',
        rejection_reason: rejectionReason
      });
      setPendingBusinesses(prev => prev.filter(b => b.id !== rejectionModal.businessId));
      setRejectionModal({ isOpen: false, businessId: null });
      setRejectionReason('');
    } catch (error) {
      alert('Failed to reject business');
    }
  };

  // Process analytics data for charts
  const continentChartData = Object.entries(
    analytics.continents.reduce((acc: any, curr: any) => {
      acc[curr.visitor_continent] = (acc[curr.visitor_continent] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const districtChartData = Object.entries(
    analytics.districts.reduce((acc: any, curr: any) => {
      acc[curr.location_district] = (acc[curr.location_district] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <AnimatePresence>
        {rejectionModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setRejectionModal({ isOpen: false, businessId: null })}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">Reject Application</h3>
              <p className="text-gray-500 mb-6">Please provide a reason for rejecting this business application. This will be sent to the business owner.</p>
              <textarea 
                className="w-full h-32 p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all mb-6"
                placeholder="e.g., Invalid business certificate, payment proof not clear..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex gap-4">
                <button 
                  onClick={() => setRejectionModal({ isOpen: false, businessId: null })}
                  className="flex-1 py-3 rounded-xl font-bold border border-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleReject}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Command Center</h1>
        <div className="flex gap-4">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button 
              onClick={() => setActiveTab('analytics')}
              className={cn("px-4 py-2 rounded-lg text-sm font-bold", activeTab === 'analytics' ? "bg-white shadow-sm" : "text-gray-500")}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('approvals')}
              className={cn("px-4 py-2 rounded-lg text-sm font-bold", activeTab === 'approvals' ? "bg-white shadow-sm" : "text-gray-500")}
            >
              Approvals
            </button>
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Tourists', val: '12,450', icon: <User className="text-blue-500" /> },
              { label: 'Total Businesses', val: '840', icon: <Globe className="text-green-500" /> },
              { label: 'Pending Approvals', val: '12', icon: <CheckCircle className="text-yellow-500" /> },
              { label: 'Verified Payments', val: 'P450k', icon: <Star className="text-purple-500" /> }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">{s.icon}</div>
                </div>
                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                <h3 className="text-2xl font-bold">{s.val}</h3>
              </div>
            ))}
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Visitor by Continent</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={continentChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {continentChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Businesses by District</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={districtChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {districtChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold">Business</th>
                <th className="px-6 py-4 text-sm font-bold">Package</th>
                <th className="px-6 py-4 text-sm font-bold">Attachments</th>
                <th className="px-6 py-4 text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingBusinesses.map((b) => (
                <tr key={b.id}>
                  <td className="px-6 py-4">
                    <p className="font-bold">{b.business_name}</p>
                    <p className="text-xs text-gray-500">{b.location_place}, {b.location_district}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs font-bold capitalize">{b.package_type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {b.certificate_url && (
                        <a href={b.certificate_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 hover:underline">Certificate</a>
                      )}
                      {b.payment_proof_url && (
                        <a href={b.payment_proof_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 hover:underline">Payment Proof</a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(b.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 transition-all"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => setRejectionModal({ isOpen: true, businessId: b.id })}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingBusinesses.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No pending applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- Business Dashboard ---
const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'upgrade'>('overview');
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: businesses } = await supabase
        .from('businesses')
        .select('*, business_media(*)')
        .eq('user_id', user.id);
      
      if (businesses && businesses.length > 0) {
        setBusiness(businesses[0]);
      }
    } catch (error) {
      console.error('Error fetching business:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setLoading(true);
    try {
      await supabaseService.updateBusiness(business.id, {
        description: business.description,
        price_range: business.price_range
      });
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!business || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${business.user_id}/media_${Math.random()}.${fileExt}`;
      const url = await supabaseService.uploadFile('business-media', fileName, file);
      
      const { data: media } = await supabase
        .from('business_media')
        .insert([{
          business_id: business.id,
          media_url: url,
          media_type: file.type.startsWith('video') ? 'video' : 'photo'
        }])
        .select()
        .single();
      
      if (media) {
        setBusiness(prev => prev ? {
          ...prev,
          business_media: [...(prev.business_media || []), media]
        } : null);
      }
    } catch (error) {
      alert('Failed to upload media');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!business) return;
    try {
      await supabase.from('business_media').delete().eq('id', id);
      setBusiness(prev => prev ? {
        ...prev,
        business_media: prev.business_media?.filter(m => m.id !== id)
      } : null);
    } catch (error) {
      alert('Failed to delete media');
    }
  };

  if (loading) return <div className="p-20 text-center">Loading dashboard...</div>;
  if (!business) return <div className="p-20 text-center">No business profile found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{business.business_name} Dashboard</h1>
          <p className="text-gray-500">Welcome back, manage your business profile</p>
        </div>
        <div className="flex p-1 bg-gray-100 rounded-xl">
          {(['overview', 'profile', 'upgrade'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn("px-4 py-2 rounded-lg text-sm font-bold capitalize", activeTab === tab ? "bg-white shadow-sm" : "text-gray-500")}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Views', val: '2,840', icon: <BarChart3 className="text-blue-500" /> },
              { label: 'Contacts', val: '145', icon: <Phone className="text-green-500" /> },
              { label: 'Bookmarks', val: '89', icon: <Heart className="text-pink-500" /> },
              { label: 'Avg Rating', val: '4.8', icon: <Star className="text-yellow-500" /> }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">{s.icon}</div>
                </div>
                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                <h3 className="text-2xl font-bold">{s.val}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6">Tourist Continent Analytics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Africa', count: 120 },
                    { name: 'Europe', count: 80 },
                    { name: 'N. America', count: 60 },
                    { name: 'Asia', count: 40 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6">Recent Reviews</h3>
              <div className="space-y-6">
                {[
                  { name: 'Alice', rating: 5, comment: 'Amazing stay!' },
                  { name: 'Bob', rating: 4, comment: 'Great service.' }
                ].map((r, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold">{r.name}</span>
                      <div className="flex text-yellow-500"><Star className="w-3 h-3 fill-current" /> {r.rating}</div>
                    </div>
                    <p className="text-sm text-gray-500">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 max-w-2xl">
          <h3 className="text-2xl font-bold mb-8">Edit Business Profile</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Business Name</label>
                <input 
                  type="text" 
                  disabled
                  value={business.business_name} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Price Range</label>
                <input 
                  type="text" 
                  value={business.price_range || ''} 
                  onChange={(e) => setBusiness({...business, price_range: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" 
                  placeholder="e.g. P1500 - P3000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea 
                className="w-full h-32 p-4 rounded-xl border border-gray-200 outline-none" 
                value={business.description || ''}
                onChange={(e) => setBusiness({...business, description: e.target.value})}
                placeholder="Tell tourists about your business..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Media Gallery</label>
              <div className="grid grid-cols-4 gap-4">
                {business.business_media?.map(m => (
                  <div key={m.id} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center relative group">
                    {m.media_type === 'photo' ? (
                      <img src={m.media_url} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                        <Camera className="text-white w-6 h-6" />
                      </div>
                    )}
                    <button 
                      type="button"
                      onClick={() => handleDeleteMedia(m.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all cursor-pointer">
                  <input type="file" className="hidden" onChange={handleAddMedia} accept="image/*,video/*" />
                  <Plus className="w-6 h-6" />
                  <span className="text-[10px] font-bold mt-1">Add</span>
                </label>
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'upgrade' && (
        <div className="space-y-8">
          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-900">Current Plan: Standard</h3>
              <p className="text-blue-700">You are using 15/20 photo slots and 2/5 video slots.</p>
            </div>
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={cn(
                "bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col",
                pkg.id === 'premium' && "border-black ring-1 ring-black"
              )}>
                <h4 className="text-xl font-bold mb-2">{pkg.name}</h4>
                <p className="text-3xl font-black mb-6">P{pkg.price}<span className="text-sm font-normal text-gray-500">/year</span></p>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button 
                  disabled={pkg.id === 'standard'}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold transition-all",
                    pkg.id === 'standard' ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                  )}
                >
                  {pkg.id === 'standard' ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Business Profile Detail ---
const BusinessProfile = ({ business, user, onBack }: { business: Business, user: UserProfile | null, onBack: () => void }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmark();
    logView();
  }, []);

  const checkBookmark = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .eq('business_id', business.id)
      .single();
    if (data) setIsBookmarked(true);
  };

  const logView = async () => {
    if (!user) return;
    await supabaseService.logActivity({
      business_id: business.id,
      activity_type: 'view',
      visitor_continent: user.continent || 'Unknown',
      visitor_country: user.country_code
    });
  };

  const handleBookmark = async () => {
    if (!user) return alert('Please login to bookmark businesses');
    const bookmarked = await supabaseService.toggleBookmark(user.id, business.id);
    setIsBookmarked(bookmarked);
    if (bookmarked) {
      await supabaseService.logActivity({
        business_id: business.id,
        activity_type: 'bookmark',
        visitor_continent: user.continent || 'Unknown',
        visitor_country: user.country_code
      });
    }
  };

  const handleContact = async (type: 'whatsapp' | 'call' | 'email') => {
    if (!user) return;
    await supabaseService.logActivity({
      business_id: business.id,
      activity_type: `contact_${type}`,
      visitor_continent: user.continent || 'Unknown',
      visitor_country: user.country_code
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto bg-white min-h-screen pb-20"
    >
      <div className="relative h-72">
        <img src={business.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all">
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={handleBookmark}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-all",
              isBookmarked ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/40"
            )}
          >
            <Heart className={cn("w-6 h-6", isBookmarked && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                {business.category}
              </span>
              <h1 className="text-3xl font-bold">{business.business_name}</h1>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> {business.location_place}, {business.location_district}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xl font-bold text-yellow-500">
                <Star className="w-5 h-5 fill-current" /> 4.9
              </div>
              <p className="text-xs text-gray-400">124 reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <a 
              href={`https://wa.me/${business.phone_whatsapp}`} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => handleContact('whatsapp')}
              className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-2xl text-green-600 hover:bg-green-100 transition-all"
            >
              <Phone className="w-6 h-6" />
              <span className="text-xs font-bold">WhatsApp</span>
            </a>
            <a 
              href={`tel:${business.phone_office}`} 
              onClick={() => handleContact('call')}
              className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-100 transition-all"
            >
              <Phone className="w-6 h-6" />
              <span className="text-xs font-bold">Call</span>
            </a>
            <a 
              href={`mailto:${business.email}`} 
              onClick={() => handleContact('email')}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-gray-100 transition-all"
            >
              <Mail className="w-6 h-6" />
              <span className="text-xs font-bold">Email</span>
            </a>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">{business.description}</p>
              <p className="mt-4 font-bold">Price Range: <span className="text-green-600">{business.price_range || 'Contact for pricing'}</span></p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Photos & Videos</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative aspect-video rounded-2xl overflow-hidden group">
                    <img src={`https://picsum.photos/seed/media${i}/800/600`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      {i === 1 ? <Camera className="text-white w-8 h-8" /> : <ChevronRight className="text-white w-8 h-8" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                <MapPin className="w-10 h-10 opacity-20" />
              </div>
              <button className="w-full mt-4 bg-black text-white py-3 rounded-xl font-bold">Open in Google Maps</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Tourist PWA ---
const TouristPWA = ({ user }: { user: UserProfile | null }) => {
  const [search, setSearch] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const data = await supabaseService.getBusinesses({ status: 'approved' });
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(b => 
    b.business_name.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.location_place.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedBusiness) {
    return <BusinessProfile business={selectedBusiness} user={user} onBack={() => setSelectedBusiness(null)} />;
  }
  
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
            {user?.full_name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-xs text-gray-500">Welcome to Botswana,</p>
            <p className="font-bold">{user?.full_name}</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search Safari, Lodges, Maun..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-lg font-bold mb-4">
            {search ? `Results for "${search}"` : 'Top Rated Businesses'}
          </h2>
          <div className="space-y-4">
            {filteredBusinesses.length > 0 ? filteredBusinesses.map((b) => (
              <div 
                key={b.id} 
                onClick={() => setSelectedBusiness(b)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm flex gap-4 p-3 cursor-pointer hover:shadow-md transition-all"
              >
                <img 
                  src={b.image_url} 
                  alt={b.business_name} 
                  className="w-24 h-24 rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">{b.business_name}</h3>
                    {b.package_type === 'premium' && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {b.location_place}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" /> 4.9
                    </div>
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full font-bold text-gray-500">{b.category}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No businesses found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-4 gap-4">
          {BUSINESS_CATEGORIES.slice(0, 4).map(c => (
            <div key={c} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Camera className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] font-bold text-center leading-tight">{c.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around py-4 z-20">
        <button className="text-black"><LayoutDashboard className="w-6 h-6" /></button>
        <button className="text-gray-400"><Search className="w-6 h-6" /></button>
        <button className="text-gray-400"><Heart className="w-6 h-6" /></button>
        <button className="text-gray-400"><User className="w-6 h-6" /></button>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // Check session
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          const profile = await supabaseService.getProfile(session.user.id);
          setUser(profile);
        }
      } catch (err: any) {
        console.error('Session error:', err);
        if (err.message === 'Failed to fetch') {
          setError('Failed to connect to Supabase. This usually happens if the project URL is incorrect, the project is paused, or your network is blocking the request. Please verify your Supabase project status at https://supabase.com/dashboard');
        } else {
          setError(err.message || 'An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await supabaseService.getProfile(session.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabaseService.signOut();
    setUser(null);
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Configuration Required</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Supabase environment variables are missing. Please add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> to your environment secrets to continue.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl text-left text-sm font-mono break-all">
              VITE_SUPABASE_URL=https://smnavvmzymbtskrtwwvf.supabase.co
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-left text-sm font-mono break-all">
              VITE_SUPABASE_ANON_KEY=sb_publishable_REcJZIRC6yXrq2OoKGr00w_KxGBQwV6
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Connection Error</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route 
            path="/admin" 
            element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/business" 
            element={user?.role === 'business' ? <BusinessDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/pwa" 
            element={user?.role === 'tourist' ? <TouristPWA user={user} /> : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Globe className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">BTH</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The official tourism gateway for Botswana. Connecting travelers with authentic experiences and local businesses.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:bg-black hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:bg-black hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/explore" className="hover:text-black transition-colors">Destinations</Link></li>
                <li><Link to="/explore" className="hover:text-black transition-colors">Safari Tours</Link></li>
                <li><Link to="/explore" className="hover:text-black transition-colors">Luxury Lodges</Link></li>
                <li><Link to="/explore" className="hover:text-black transition-colors">Adventure</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Business</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/signup" className="hover:text-black transition-colors">List your Business</Link></li>
                <li><Link to="/login" className="hover:text-black transition-colors">Business Login</Link></li>
                <li><Link to="/pricing" className="hover:text-black transition-colors">Pricing Plans</Link></li>
                <li><Link to="/help" className="hover:text-black transition-colors">Support Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-black transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Botswana Tourism Hub. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}
