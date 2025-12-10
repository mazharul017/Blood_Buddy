import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../utils/api';
import { io } from 'socket.io-client';

const EmergencyRequests = () => {
  const { isAuthenticated } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: '',
    hospital: '',
    contact: '',
    message: '',
    urgency: 'urgent',
    location: { latitude: null, longitude: null }
  });

  useEffect(() => {
    fetchRequests();

    // Connect to Socket.io for real-time updates
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    
    socket.on('new_emergency', (data) => {
      fetchRequests(); // Refresh requests when new one is created
    });

    return () => socket.disconnect();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get('/emergency');
      setRequests(response.data.emergencyRequests || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/emergency', formData);
      setShowForm(false);
      setFormData({
        bloodGroup: '',
        hospital: '',
        contact: '',
        message: '',
        urgency: 'urgent',
        location: { latitude: null, longitude: null }
      });
      fetchRequests();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to create emergency request');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Requests</h1>
          {isAuthenticated && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium"
            >
              {showForm ? 'Cancel' : '+ New Request'}
            </button>
          )}
        </div>

        {showForm && isAuthenticated && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create Emergency Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium mb-2">Urgency</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hospital *</label>
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact *</label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="button"
                onClick={getLocation}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                📍 Get Location
              </button>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  request.urgency === 'critical' ? 'border-l-4 border-red-600' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {request.bloodGroup}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.urgency === 'critical' ? 'bg-red-600 text-white' :
                        request.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.urgency}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{request.hospital}</h3>
                    <p className="text-gray-600 mt-1">Contact: {request.contact}</p>
                    {request.message && (
                      <p className="text-gray-700 mt-2">{request.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Posted {new Date(request.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No emergency requests found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyRequests;

