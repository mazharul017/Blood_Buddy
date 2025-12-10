import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipientId: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    certificateUrl: '',
    bloodGroup: '',
    units: 1
  });

  useEffect(() => {
    fetchDonations();
    checkEligibility();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/donations');
      setDonations(response.data.donations || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const response = await api.get('/donations/eligibility/check');
      setEligibility(response.data);
    } catch (error) {
      console.error('Eligibility check error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/donations', formData);
      setShowForm(false);
      setFormData({
        recipientId: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        certificateUrl: '',
        bloodGroup: '',
        units: 1
      });
      fetchDonations();
      checkEligibility();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to record donation');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium"
            >
              {showForm ? 'Cancel' : '+ Record Donation'}
            </button>
          </div>

          {/* Eligibility Status */}
          {eligibility && (
            <div className={`mb-6 p-4 rounded-lg ${
              eligibility.eligible ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              <p className="font-semibold">
                {eligibility.eligible ? '✅ You are eligible to donate!' : `⏳ ${eligibility.message}`}
              </p>
              {eligibility.nextEligibleDate && (
                <p className="text-sm mt-1">
                  Next eligible date: {new Date(eligibility.nextEligibleDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {/* Record Donation Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Record New Donation</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Blood Group *</label>
                    <select
                      required
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Hospital/Clinic name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Units</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Certificate URL</label>
                    <input
                      type="url"
                      value={formData.certificateUrl}
                      onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                      placeholder="Optional"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium"
                >
                  Record Donation
                </button>
              </form>
            </div>
          )}

          {/* Donations List */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => (
                <div key={donation._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {donation.bloodGroup}
                        </span>
                        <span className="text-gray-600">
                          {donation.units} unit(s)
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{donation.location}</h3>
                      <p className="text-gray-600 mt-1">
                        Date: {new Date(donation.date).toLocaleDateString()}
                      </p>
                      {donation.nextEligibleDate && (
                        <p className="text-sm text-gray-500 mt-1">
                          Next eligible: {new Date(donation.nextEligibleDate).toLocaleDateString()}
                        </p>
                      )}
                      {donation.rewardPoints && (
                        <p className="text-green-600 font-semibold mt-2">
                          +{donation.rewardPoints} reward points
                        </p>
                      )}
                    </div>
                    {donation.certificateUrl && (
                      <a
                        href={donation.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {donations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No donation history found.
                </div>
              )}
            </div>
          )}
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default MyDonations;

