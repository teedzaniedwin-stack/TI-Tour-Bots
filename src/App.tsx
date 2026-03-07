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

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type UserRole = 'tourist' | 'business' | 'admin';
type BusinessStatus = 'pending' | 'approved' | 'rejected';
type PackageType = 'basic' | 'standard' | 'premium';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface Business {
  id: string;
  user_id: string;
  business_name: string;
  category: string;
  description: string;
  location_district: string;
  location_place: string;
  phone_whatsapp: string;
  phone_office: string;
  email: string;
  website?: string;
  status: BusinessStatus;
  package_type: PackageType;
  price_range?: string;
  image_url: string;
  certificate_url?: string;
  payment_proof_url?: string;
  rejection_reason?: string;
}

interface BusinessMedia {
  id: string;
  business_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  subheading?: string;
}

// --- Components ---

const Navbar = ({ user, onLogout }: { user: User | null; onLogout: () => void }) => {
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

const Login = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock logic: email determines role
    let role: UserRole = 'tourist';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('business')) role = 'business';
    
    onLogin(role);
    if (role === 'admin') navigate('/admin');
    else if (role === 'business') navigate('/business');
    else navigate('/pwa');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your tourism account</p>
        </div>
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
            />
          </div>
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg">
            Sign In
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
  const [district, setDistrict] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [files, setFiles] = useState<{cert?: File, payment?: File}>({});

  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cert' | 'payment') => {
    if (e.target.files?.[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
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

        <form className="space-y-6">
          {role === 'tourist' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Country of Origin</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none appearance-none bg-white">
                  <option value="">Select Country</option>
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg">
                Create Tourist Account
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="Safari Lodge Ltd" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Category</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                        {BUSINESS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="+267 ..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Office Number</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="+267 ..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">District</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white"
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        <option value="">Select District</option>
                        {BOTSWANA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Place</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                        <option value="">Select Place</option>
                        {district && DISTRICT_PLACES[district]?.map(p => <option key={p} value={p}>{p}</option>)}
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
                    <button type="submit" onClick={handleSubmit} className="flex-1 bg-black text-white py-4 rounded-xl font-bold">Submit for Approval</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'approvals'>('analytics');
  const [rejectionModal, setRejectionModal] = useState<{ isOpen: boolean, businessId: string | null }>({ isOpen: false, businessId: null });
  const [rejectionReason, setRejectionReason] = useState('');
  
  const data = [
    { name: 'Africa', value: 400 },
    { name: 'Europe', value: 300 },
    { name: 'N. America', value: 200 },
    { name: 'Asia', value: 100 },
  ];

  const districtData = [
    { name: 'Chobe', value: 30 },
    { name: 'North-West', value: 45 },
    { name: 'Central', value: 20 },
    { name: 'South-East', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleReject = () => {
    console.log(`Rejected ${rejectionModal.businessId} for: ${rejectionReason}`);
    setRejectionModal({ isOpen: false, businessId: null });
    setRejectionReason('');
  };

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
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
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
                    <Pie data={districtData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {districtData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />)}
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
              {[
                { name: 'Kalahari Sands', pkg: 'Premium', cert: true, pay: true },
                { name: 'Delta Aviation', pkg: 'Standard', cert: true, pay: false },
              ].map((b, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <p className="font-bold">{b.name}</p>
                    <p className="text-xs text-gray-500">Maun, North-West</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs font-bold">{b.pkg}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-xs font-bold text-blue-500 hover:underline">Certificate</button>
                      <button className="text-xs font-bold text-blue-500 hover:underline">Payment Proof</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 transition-all">Approve</button>
                      <button 
                        onClick={() => setRejectionModal({ isOpen: true, businessId: b.name })}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Safari Lodge Dashboard</h1>
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Business Name</label>
                <input type="text" defaultValue="Safari Lodge" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Price Range</label>
                <input type="text" defaultValue="P1500 - P3000" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea className="w-full h-32 p-4 rounded-xl border border-gray-200 outline-none" defaultValue="Experience luxury in the heart of Botswana..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Media Gallery</label>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center relative group">
                    <img src={`https://picsum.photos/seed/lodge${i}/200/200`} className="w-full h-full object-cover rounded-xl" />
                    <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all">
                  <Plus className="w-6 h-6" />
                  <span className="text-[10px] font-bold mt-1">Add</span>
                </button>
              </div>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold">Save Changes</button>
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
const BusinessProfile = ({ business, onBack }: { business: Business, onBack: () => void }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

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
            onClick={() => setIsBookmarked(!isBookmarked)}
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
            <a href={`https://wa.me/${business.phone_whatsapp}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-2xl text-green-600 hover:bg-green-100 transition-all">
              <Phone className="w-6 h-6" />
              <span className="text-xs font-bold">WhatsApp</span>
            </a>
            <a href={`tel:${business.phone_office}`} className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-100 transition-all">
              <Phone className="w-6 h-6" />
              <span className="text-xs font-bold">Call</span>
            </a>
            <a href={`mailto:${business.email}`} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-gray-100 transition-all">
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
const TouristPWA = () => {
  const [search, setSearch] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const mockBusinesses: Business[] = [
    {
      id: '1',
      user_id: 'u1',
      business_name: 'Mowana Safari Lodge',
      category: 'Lodge',
      description: 'Experience luxury in the heart of Chobe. Our lodge offers world-class amenities and breathtaking river views.',
      location_district: 'Chobe District',
      location_place: 'Kasane',
      phone_whatsapp: '+26771234567',
      phone_office: '+2676250111',
      email: 'info@mowana.com',
      status: 'approved',
      package_type: 'premium',
      price_range: 'P2500 - P5000',
      image_url: 'https://picsum.photos/seed/lodge1/800/600'
    },
    {
      id: '2',
      user_id: 'u2',
      business_name: 'Desert & Delta Safaris',
      category: 'Safari Operator',
      description: 'Specializing in bespoke safari experiences across Botswana. From the Delta to the desert.',
      location_district: 'North-West District',
      location_place: 'Maun',
      phone_whatsapp: '+26772345678',
      phone_office: '+2676861234',
      email: 'bookings@desertdelta.com',
      status: 'approved',
      package_type: 'standard',
      price_range: 'P3500 - P8000',
      image_url: 'https://picsum.photos/seed/safari1/800/600'
    }
  ];

  const filteredBusinesses = mockBusinesses.filter(b => 
    b.business_name.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.location_place.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedBusiness) {
    return <BusinessProfile business={selectedBusiness} onBack={() => setSelectedBusiness(null)} />;
  }
  
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">JD</div>
          <div>
            <p className="text-xs text-gray-500">Welcome to Botswana,</p>
            <p className="font-bold">John Doe</p>
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
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole) => {
    setUser({ id: '1', name: 'Demo User', email: 'demo@bth.com', role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
            element={user?.role === 'tourist' ? <TouristPWA /> : <Navigate to="/login" />} 
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
