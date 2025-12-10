import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';
import NotificationPanel from '../components/NotificationPanel';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [donationStats, setDonationStats] = useState({
    totalDonations: 0,
    nextEligibleDate: null,
    isEligible: false,
    daysRemaining: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    if (!user?._id && !user?.id) return;

    setLoading(true);
    try {
      const userId = user._id || user.id;
      const response = await api.get(`/donations/${userId}`);

      const donations = response.data.donations || [];
      const eligibility = response.data.eligibility || {};

      setRecentDonations(donations.slice(0, 3));
      setDonationStats({
        totalDonations: donations.length,
        nextEligibleDate: eligibility.nextEligibleDate,
        isEligible: eligibility.eligible || false,
        daysRemaining: eligibility.daysRemaining || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDonationSuccess = (newDonation) => {
    setShowForm(false);
    fetchDashboardData();
    toast.success('Donation recorded successfully!');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /** ================================
   * LOADING STATE
   * ================================ */
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 mt-20">

            {/* Emergency Contact Section */}
            <div className="mb-8 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-2xl p-6 md:p-8 text-white border-4 border-red-500 animate-pulse-subtle relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1 w-full md:min-w-[300px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">🚨 Emergency Contact</h2>
                    </div>
                    <p className="text-red-100 text-base md:text-lg mb-4 font-medium">
                      Need immediate assistance? Contact our admin directly via WhatsApp or phone call
                    </p>
                    <div className="flex items-center gap-3 text-lg md:text-xl font-bold bg-white/10 px-4 py-2 rounded-lg inline-block">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="tracking-wide">+8801786708462</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <a
                      href={`https://wa.me/8801786708462?text=${encodeURIComponent('Hello, I need emergency assistance regarding blood donation.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                    >
                      💬 WhatsApp
                    </a>

                    <a
                      href="tel:+8801786708462"
                      className="flex items-center justify-center gap-3 bg-white text-red-600 hover:bg-red-50 px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                    >
                      📞 Direct Call
                    </a>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /** ================================
   * MAIN DASHBOARD
   * ================================ */
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-20">

          {/* Emergency Contact */}
          <div className="mb-8 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-2xl p-6 md:p-8 text-white border-4 border-red-500 relative overflow-hidden animate-pulse-subtle">
            <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1 w-full md:min-w-[300px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">🚨 Emergency Contact</h2>
                  </div>
                  <p className="text-red-100 text-base md:text-lg mb-4 font-medium">
                    Need immediate assistance? Contact our admin directly via WhatsApp or phone call
                  </p>
                  <div className="flex items-center gap-3 text-lg md:text-xl font-bold bg-white/10 px-4 py-2 rounded-lg inline-block">
                    📞 +8801786708462
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href={`https://wa.me/8801786708462?text=${encodeURIComponent('Hello, I need emergency assistance regarding blood donation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    💬 WhatsApp
                  </a>

                  <a
                    href="tel:+8801786708462"
                    className="flex items-center justify-center gap-3 bg-white text-red-600 hover:bg-red-50 px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    📞 Direct Call
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your donation records and track your eligibility
              </p>
            </div>
            <NotificationPanel />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard title="Total Donations" value={donationStats.totalDonations} color="red" />
            <DashboardCard
              title="Eligibility Status"
              value={donationStats.isEligible ? 'Eligible' : 'Not Yet'}
              color={donationStats.isEligible ? 'green' : 'yellow'}
            />
            <DashboardCard
              title="Next Eligible Date"
              value={formatDate(donationStats.nextEligibleDate)}
              color="blue"
            />
            <DashboardCard
              title="Blood Group"
              value={user?.bloodGroup || 'Not set'}
              color="purple"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {showForm ? (
                <>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mb-4 text-gray-600 hover:text-gray-800"
                  >
                    ← Back
                  </button>
                  <DonationForm onSuccess={handleDonationSuccess} />
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg mb-4"
                  >
                    + Record New Donation
                  </button>
                  <button
                    onClick={() => navigate('/donations')}
                    className="w-full bg-gray-100 py-3 rounded-lg"
                  >
                    View Full History
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <DonationHistory />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
