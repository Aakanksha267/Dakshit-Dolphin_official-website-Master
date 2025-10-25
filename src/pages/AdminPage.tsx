import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import Card from '../components/Card';
import { Lock, Users, Calendar, Briefcase, MessageSquare, Star, BarChart3 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({
    applications: 0,
    registrations: 0,
    contacts: 0,
    testimonials: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    setIsAuthenticated(!!data.session);
    if (data.session) {
      loadStats();
    }
  };

  const loadStats = async () => {
    const [apps, regs, contacts, testimonials] = await Promise.all([
      supabase.from('internship_applications').select('id', { count: 'exact', head: true }),
      supabase.from('event_registrations').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      applications: apps.count || 0,
      registrations: regs.count || 0,
      contacts: contacts.count || 0,
      testimonials: testimonials.count || 0,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      setIsAuthenticated(true);
      loadStats();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <div className="p-8">
            <div className="text-center mb-8">
              <Lock className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the admin dashboard</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your platform</p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="h-8 w-8 text-teal-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.applications}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Internship Applications</h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.registrations}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Event Registrations</h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.contacts}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Contact Submissions</h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
                <span className="text-3xl font-bold text-gray-900">{stats.testimonials}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Testimonials</h3>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Manage Internships
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Manage Events
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Manage Blogs
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Review Testimonials
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-600">New application received</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-600">Event registration confirmed</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-600">New testimonial submitted</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <p className="text-sm text-gray-600">Contact form submission</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
