import { useState, useEffect } from 'react';
import DonorCard from '../components/DonorCard';
import api from '../utils/api';

const DonorSearch = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: '',
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
  }, []);

  const searchDonors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);
      if (filters.city) params.append('city', filters.city);
      if (filters.lat && filters.lng) {
        params.append('lat', filters.lat);
        params.append('lng', filters.lng);
        params.append('radius', filters.radius);
      }

      const response = await api.get(`/donors?${params.toString()}`);
      setDonors(response.data.donors || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchDonors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Donors</h1>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                value={filters.bloodGroup}
                onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">All</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
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
                onClick={searchDonors}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
              >
                Search
              </button>
            </div>
          </div>

          {userLocation && (
            <p className="mt-4 text-sm text-gray-600">
              📍 Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">Found {donors.length} donor(s)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <DonorCard key={donor._id || donor.id} donor={donor} />
              ))}
            </div>
            {donors.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No donors found. Try adjusting your filters.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;

