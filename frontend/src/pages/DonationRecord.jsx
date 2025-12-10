import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import DonationForm from '../components/DonationForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const DonationRecord = () => {
  const navigate = useNavigate();

  const handleSuccess = (donation) => {
    toast.success('Donation recorded successfully!');
    // Optionally navigate to donation history
    setTimeout(() => {
      navigate('/donations');
    }, 1500);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Record Your Donation</h1>
              <p className="text-gray-600">
                Keep track of your blood donations and help save lives
              </p>
            </div>

            <DonationForm onSuccess={handleSuccess} />
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DonationRecord;

