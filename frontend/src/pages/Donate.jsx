import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Donate() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    phone: '',
    urgency: 'normal',
    unitsNeeded: '1',
    hospital: '',
    notes: ''
  })

  // Mock active requests - in real app, this would come from a database
  const [activeRequests, setActiveRequests] = useState([
    {
      id: 1,
      name: 'Ahmed Khan',
      bloodGroup: 'O+',
      location: 'Dhaka Medical College',
      phone: '01711-123456',
      urgency: 'urgent',
      time: '2 hours ago'
    },
    {
      id: 2,
      name: 'Fatima Rahman',
      bloodGroup: 'AB+',
      location: 'Square Hospital, Dhaka',
      phone: '01812-234567',
      urgency: 'normal',
      time: '5 hours ago'
    },
    {
      id: 3,
      name: 'Karim Uddin',
      bloodGroup: 'B-',
      location: 'BIRDEM Hospital, Dhaka',
      phone: '01913-345678',
      urgency: 'critical',
      time: '1 hour ago'
    }
  ])

  const steps = [
    { number: 1, text: 'Register', emoji: '🧍🏻' },
    { number: 2, text: 'Post a Blood request', emoji: '🩸' },
    { number: 3, text: 'Respond', emoji: '✅' },
    { number: 4, text: 'Get notified', emoji: '📱' },
    { number: 5, text: 'Forever Free', emoji: '💲❌' },
    { number: 6, text: 'Save a Life', emoji: '🩸🧬' }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create new request
    const newRequest = {
      id: activeRequests.length + 1,
      name: formData.name,
      bloodGroup: formData.bloodGroup,
      location: formData.hospital || formData.location,
      phone: formData.phone,
      urgency: formData.urgency,
      time: 'Just now'
    }

    // Add to active requests
    setActiveRequests([newRequest, ...activeRequests])

    // Show success message
    alert(`Blood request posted successfully!\n\nBlood Group: ${formData.bloodGroup}\nLocation: ${formData.location}\n\nDonors nearby will be notified!`)

    // Reset form
    setFormData({
      name: '',
      bloodGroup: '',
      location: '',
      phone: '',
      urgency: 'normal',
      unitsNeeded: '1',
      hospital: '',
      notes: ''
    })
    setShowForm(false)
  }

  const handleRespond = (request) => {
    alert(`Thank you for responding!\n\nYou are helping ${request.name}\nBlood Group: ${request.bloodGroup}\nLocation: ${request.location}\n\nContact: ${request.phone}\n\nThey will be notified of your response!`)
  }

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'critical': return 'bg-red-600'
      case 'urgent': return 'bg-orange-500'
      default: return 'bg-blue-500'
    }
  }

  const getUrgencyBadge = (urgency) => {
    switch(urgency) {
      case 'critical': return 'CRITICAL 🚨'
      case 'urgent': return 'URGENT ⚠️'
      default: return 'NORMAL'
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
      <Header variant="light" />

      <main className="flex-grow px-4 py-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12 leading-tight">
              Connect with us & save lives<br className="hidden md:block" />around your location
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 mb-12">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="flex items-center gap-4 bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="flex-shrink-0 w-12 h-12 bg-indianred text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {step.number}
                  </span>
                  <span className="text-lg md:text-xl text-gray-800 font-medium">
                    {step.text} {step.emoji}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-indianred text-white px-10 py-4 rounded-full text-xl font-patrick tracking-wider hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {showForm ? '✕ Close Form' : '🩸 Post Blood Request'}
              </button>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-patrick tracking-wider hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center"
              >
                📝 Register as Donor
              </Link>
            </div>
          </div>
        </div>

        {/* Blood Request Form */}
        {showForm && (
          <div className="max-w-4xl mx-auto mb-12 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                🩸 Post a Blood Request
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Blood Group *</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                    >
                      <option value="">Select blood group</option>
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
                    <label className="block text-gray-700 font-semibold mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                      placeholder="City, District"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                      placeholder="01XXX-XXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Hospital Name</label>
                    <input
                      type="text"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                      placeholder="Hospital name (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Urgency Level *</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Units Needed</label>
                    <input
                      type="number"
                      name="unitsNeeded"
                      value={formData.unitsNeeded}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors resize-none"
                    placeholder="Any additional information..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indianred text-white py-4 px-6 rounded-lg text-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  🚀 Post Blood Request
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Active Blood Requests */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              🩸 Active Blood Requests
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-indianred"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{request.name}</h4>
                      <p className="text-sm text-gray-500">{request.time}</p>
                    </div>
                    <span className={`${getUrgencyColor(request.urgency)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {getUrgencyBadge(request.urgency)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-indianred">{request.bloodGroup}</span>
                      <i className="fa fa-tint text-indianred text-2xl"></i>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="fa fa-map-marker-alt"></i>
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="fa fa-phone"></i>
                      <span>{request.phone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRespond(request)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="fa fa-heart"></i>
                    I Can Donate
                  </button>
                </div>
              ))}
            </div>

            {activeRequests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <i className="fa fa-inbox text-6xl mb-4"></i>
                <p className="text-xl">No active blood requests at the moment</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Donate
