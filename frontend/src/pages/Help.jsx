import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Help() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out! We will contact you soon.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      bloodGroup: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="flex-grow flex items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-5xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
            {/* Left side - Image */}
            <div
              className="hidden md:block bg-cover bg-center min-h-[600px]"
              style={{
                backgroundImage: 'url(/Images/help.jpg)',
                backgroundPosition: 'center'
              }}
            ></div>

            {/* Right side - Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                Connect with us
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />

                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="Blood Group"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-indianred text-white py-4 px-6 rounded-lg text-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Help

