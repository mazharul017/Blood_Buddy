import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const DonationHistory = ({ userId }) => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetUserId = userId || user?._id || user?.id;

  useEffect(() => {
    if (targetUserId) {
      fetchDonationHistory();
    }
  }, [targetUserId]);

  const fetchDonationHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/donations/${targetUserId}`);
      setDonations(response.data.donations || []);
      setEligibility(response.data.eligibility || null);
    } catch (error) {
      console.error('Error fetching donation history:', error);
      setError('Failed to load donation history');
      toast.error('Failed to load donation history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchDonationHistory}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Donation History</h2>
        {eligibility && (
          <div className={`px-4 py-2 rounded-lg ${
            eligibility.eligible 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <span className="font-semibold">
              {eligibility.eligible ? '✓ Eligible' : '⏳ Not Yet Eligible'}
            </span>
          </div>
        )}
      </div>

      {eligibility && !eligibility.eligible && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>Next Eligible Date:</strong> {formatDate(eligibility.nextEligibleDate)}
          </p>
          {eligibility.daysRemaining > 0 && (
            <p className="text-blue-600 text-sm mt-1">
              {eligibility.daysRemaining} day{eligibility.daysRemaining > 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      )}

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">No donation records found</p>
          <p className="text-gray-500 text-sm mt-2">Start by recording your first donation!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => {
            const daysAgo = getDaysAgo(donation.date);
            const isEligible = donation.nextEligibleDate 
              ? new Date() >= new Date(donation.nextEligibleDate)
              : false;

            return (
              <div
                key={donation._id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-lg">
                          {donation.bloodGroup}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Donation on {formatDate(donation.date)}
                        </h3>
                        {daysAgo !== null && (
                          <p className="text-sm text-gray-500">
                            {daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {donation.location}
                      </p>
                      {donation.nextEligibleDate && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Next Eligible:</span>{' '}
                          {formatDate(donation.nextEligibleDate)}
                        </p>
                      )}
                      {donation.units && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Units:</span> {donation.units}
                        </p>
                      )}
                      {donation.rewardPoints && (
                        <p className="text-sm text-green-600">
                          <span className="font-medium">Reward Points:</span> +{donation.rewardPoints}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="ml-4">
                    {isEligible ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Not Yet
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;

