import { useAuth } from '../context/AuthContext';

const DonorCard = ({ donor }) => {
  const { isAuthenticated } = useAuth();

  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    if (!isAuthenticated) return '***-***-****';
    return phone;
  };

  const whatsappLink = donor.phone 
    ? `https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}?text=Hello, I need blood donation help.`
    : '#';

  const callLink = donor.phone ? `tel:${donor.phone}` : '#';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{donor.name}</h3>
          <p className="text-sm text-gray-600">{donor.city || 'Location not specified'}</p>
        </div>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
          {donor.bloodGroup}
        </span>
      </div>

      {donor.distance && (
        <p className="text-sm text-gray-600 mb-2">
          📍 {donor.distance} km away
        </p>
      )}

      <div className="mt-4 flex gap-2">
        {isAuthenticated && donor.phone ? (
          <>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center text-sm font-medium"
            >
              📱 WhatsApp
            </a>
            <a
              href={callLink}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center text-sm font-medium"
            >
              📞 Call
            </a>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">
            {isAuthenticated ? 'Phone number not available' : 'Login to view contact'}
          </p>
        )}
      </div>

      {isAuthenticated && donor.phone && (
        <p className="text-xs text-gray-500 mt-2">Phone: {formatPhone(donor.phone)}</p>
      )}
    </div>
  );
};

export default DonorCard;

