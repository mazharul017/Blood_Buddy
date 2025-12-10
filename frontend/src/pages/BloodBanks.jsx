import { useState, useEffect } from 'react';
import api from '../utils/api';

const BloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    lat: null,
    lng: null,
    radius: 50
  });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setFilters(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);
      if (filters.lat && filters.lng) {
        params.append('lat', filters.lat);
        params.append('lng', filters.lng);
        params.append('radius', filters.radius);
      }

      const response = await api.get(`/blood-banks?${params.toString()}`);
      setBloodBanks(response.data.bloodBanks || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blood Banks</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                value={filters.bloodGroup}
                onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">All</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius (km)</label>
              <input
                type="number"
                value={filters.radius}
                onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
                min="1"
                max="200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchBloodBanks}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-6">
            {bloodBanks.map((bank) => (
              <div key={bank._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{bank.name}</h2>
                    <p className="text-gray-600 mt-1">{bank.address}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>📞 {bank.phone}</span>
                      {bank.email && <span>✉️ {bank.email}</span>}
                      {bank.distance && <span>📍 {bank.distance} km away</span>}
                    </div>
                    {bank.operatingHours && (
                      <p className="text-sm text-gray-600 mt-2">🕐 {bank.operatingHours}</p>
                    )}
                  </div>
                  <a
                    href={`tel:${bank.phone}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    📞 Call
                  </a>
                </div>

                {/* Blood Availability Table */}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Blood Availability</h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {bloodGroups.map(bg => (
                      <div
                        key={bg}
                        className={`p-2 rounded text-center ${
                          bank.bloodAvailable[bg] > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <div className="text-xs font-semibold">{bg}</div>
                        <div className="text-sm font-bold">
                          {bank.bloodAvailable[bg] || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium">
                  Book Appointment
                </button>
              </div>
            ))}
            {bloodBanks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No blood banks found. Try adjusting your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodBanks;

