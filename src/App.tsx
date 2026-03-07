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
  COUNTRIES 
} from './lib/constants';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type UserRole = 'tourist' | 'business' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
  const [district, setDistrict] = useState('');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-500">Join the Botswana Tourism Hub</p>
        </div>

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

        <form className="space-y-6">
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

          {role === 'tourist' ? (
            <div>
              <label className="block text-sm font-semibold mb-2">Country of Origin</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none appearance-none bg-white">
                <option value="">Select Country</option>
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </div>
          ) : (
            <>
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
            </>
          )}

          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg">
            Create {role === 'tourist' ? 'Tourist' : 'Business'} Account
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard = () => {
  const data = [
    { name: 'Africa', value: 400 },
    { name: 'Europe', value: 300 },
    { name: 'N. America', value: 200 },
    { name: 'Asia', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Command Center</h1>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">
          <Download className="w-4 h-4" /> Export Reports
        </button>
      </div>

      {/* Stats Grid */}
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
              <span className="text-xs font-bold text-green-500">+12%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{s.label}</p>
            <h3 className="text-2xl font-bold">{s.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Visitor Distribution by Continent</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Pending Business Approvals</h3>
          <div className="space-y-4">
            {[
              { name: 'Kalahari Sands Lodge', cat: 'Lodge', loc: 'Ghanzi' },
              { name: 'Delta Aviation', cat: 'Aviation', loc: 'Maun' },
              { name: 'Bushman Tours', cat: 'Tour Guide', loc: 'Central' }
            ].map((b, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold">{b.name}</p>
                  <p className="text-xs text-gray-500">{b.cat} • {b.loc}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"><CheckCircle className="w-4 h-4" /></button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Business Dashboard ---
const BusinessDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Safari Lodge Dashboard</h1>
          <p className="text-gray-500">Welcome back, manage your business profile</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-100 text-black px-4 py-2 rounded-lg text-sm font-semibold">Edit Profile</button>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">Upload Images</button>
        </div>
      </div>

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
  );
};

// --- Tourist PWA ---
const TouristPWA = () => {
  const [search, setSearch] = useState('');
  
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
          <h2 className="text-lg font-bold mb-4">Top Rated Businesses</h2>
          <div className="space-y-4">
            {[
              { name: 'Mowana Safari Lodge', loc: 'Kasane', rating: 4.9, img: 'lodge1' },
              { name: 'Desert & Delta Safaris', loc: 'Maun', rating: 4.8, img: 'safari1' }
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm flex gap-4 p-3">
                <img 
                  src={`https://picsum.photos/seed/${b.img}/200/200`} 
                  alt={b.name} 
                  className="w-24 h-24 rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 py-1">
                  <h3 className="font-bold text-sm">{b.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {b.loc}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" /> {b.rating}
                    </div>
                    <button className="text-xs font-bold text-blue-500">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm">
          <h2 className="text-lg font-bold mb-4">Explore Nearby</h2>
          <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-xs">Google Maps Integration</p>
            </div>
          </div>
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
