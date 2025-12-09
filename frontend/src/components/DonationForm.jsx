import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const DonationForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lastDonationDate: '',
    nextDonationDate: '',
    bloodGroup: user?.bloodGroup || '',
    location: '',
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.lastDonationDate) {
      toast.error('Last donation date is required');
      return false;
    }

    if (!formData.bloodGroup) {
      toast.error('Blood group is required');
      return false;
    }

    if (!formData.location || formData.location.trim() === '') {
      toast.error('Location is required');
      return false;
    }

    // Validate dates
    const lastDate = new Date(formData.lastDonationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (lastDate > today) {
      toast.error('Last donation date cannot be in the future');
      return false;
    }

    if (formData.nextDonationDate) {
      const nextDate = new Date(formData.nextDonationDate);
      if (nextDate <= lastDate) {
        toast.error('Next donation date must be after last donation date');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        lastDonationDate: formData.lastDonationDate,
        bloodGroup: formData.bloodGroup,
        location: formData.location.trim(),
      };

      // Only include nextDonationDate if provided
      if (formData.nextDonationDate) {
        payload.nextDonationDate = formData.nextDonationDate;
      }

      const response = await api.post('/donations', payload);

      toast.success('Donation record saved successfully!');
      
      // Reset form
      setFormData({
        lastDonationDate: '',
        nextDonationDate: '',
        bloodGroup: user?.bloodGroup || '',
        location: '',
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(response.data.donation);
      }
    } catch (error) {
      console.error('Error saving donation:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to save donation record. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Record Donation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lastDonationDate" className="block text-sm font-medium text-gray-700 mb-2">
            Last Donation Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="lastDonationDate"
            name="lastDonationDate"
            value={formData.lastDonationDate}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="nextDonationDate" className="block text-sm font-medium text-gray-700 mb-2">
            Next Donation Date (Optional)
          </label>
          <input
            type="date"
            id="nextDonationDate"
            name="nextDonationDate"
            value={formData.nextDonationDate}
            onChange={handleChange}
            min={formData.lastDonationDate || undefined}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to auto-calculate (90 days after last donation)
          </p>
        </div>

        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group <span className="text-red-500">*</span>
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          >
            <option value="">Select blood group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., City Hospital, Mumbai"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Donation Record'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;

