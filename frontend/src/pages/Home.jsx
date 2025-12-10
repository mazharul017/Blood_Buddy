import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const volunteers = [
  { id: 1, name: 'Mohammad Rahim', location: 'Sylhet Sadar, Sylhet', bloodGroup: 'O+' },
  { id: 2, name: 'Abdur Rahman', location: 'Chattogram Sadar, Chattogram', bloodGroup: 'B+' },
  { id: 3, name: 'Ayesha Siddika', location: 'Potuakhali, Barishal', bloodGroup: 'AB+' },
  { id: 4, name: 'Shafiqur Rahman', location: 'Dinajpur Sadar, Ranpur', bloodGroup: 'A+' },
  { id: 5, name: 'Rumana Akter', location: 'Bougra, Rajshahi', bloodGroup: 'O+' },
  { id: 6, name: 'Fatima Noor', location: 'Sabar, Dhaka', bloodGroup: 'O+' },
  { id: 7, name: 'Samiul Hasan', location: 'Uttara, Dhaka', bloodGroup: 'O-' },
  { id: 8, name: 'Rafiq Uddin', location: 'Sherpur, Mymensingh', bloodGroup: 'AB+' },
  { id: 9, name: 'Mohammad Imran', location: 'Mirpur, Dhaka', bloodGroup: 'AB-' },
  { id: 10, name: 'Riya Begum', location: 'Mymensingh Sadar, Mymensingh', bloodGroup: 'B+' },
]

const testimonials = [
  {
    text: "Blood Buddy is just awesome! I just donated for the first time and it could not have been easier. Blood Buddy is doing a very important work and I'm happy that I could contribute. It's hygienic, safe and convenient, I recommend it to everyone!",
    name: 'Sharmin Sultana',
    image: '/Images/review-3.PNG'
  },
  {
    text: "I found Blood Buddy at a time that my mother was in urgent need of blood. Blood Buddy arranged the required amount in no time. It saved us a lot of hassle and worry especially in such a trying time. Thank you Blood Buddy!",
    name: 'Tahmina Akter',
    image: '/Images/review-3.PNG'
  },
  {
    text: "I have been a part of this organization for quite some time and each time I'm amazed by the seamless and efficient system in place. The importance of timely care especially in the recent times is known and having Blood Buddy takes a load off my mind.",
    name: 'Dr. Kabir Hossain',
    image: '/Images/review-1.PNG'
  }
]

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video/homevideo1.mp4" type="video/mp4" />
        </video>
        
        <Header variant="dark" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-4/5 md:w-auto">
          <h1 className="text-5xl md:text-7xl font-neuton tracking-wider text-black mb-4 leading-tight">
            Saving Lives
          </h1>
          <h1 className="text-5xl md:text-7xl font-neuton tracking-wider text-black mb-6 leading-tight">
            Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-black mb-10">
            Become a donor or request blood — together, we save lives
          </p>
          <Link
            to="/register"
            className="inline-block bg-transparent border-2 border-black text-black px-8 py-3 text-3xl font-patrick tracking-widest rounded-tl-lg rounded-br-lg hover:bg-indianred hover:border-indianred transition-all duration-1000"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Emergency Contact Section - Prominent on Home Page */}
      <section id="emergency" className="bg-gradient-to-r from-red-600 to-red-700 py-10 px-4 border-t-4 border-red-500 relative overflow-hidden animate-pulse-subtle">
        <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left w-full md:min-w-[300px]">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">🚨 Emergency Contact</h2>
              </div>
              <p className="text-red-100 text-base md:text-lg mb-4 font-medium">
                Need immediate assistance? Contact our admin directly via WhatsApp or phone call
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 text-lg md:text-xl font-bold bg-white/10 px-4 py-2 rounded-lg inline-block">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white tracking-wide">📞 +8801786708462</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/8801786708462?text=${encodeURIComponent('Hello, I need emergency assistance regarding blood donation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>💬 WhatsApp</span>
              </a>
              <a
                href="tel:+8801786708462"
                className="flex items-center justify-center gap-3 bg-white text-red-600 hover:bg-red-50 px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>📞 Direct Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <main id="about-us" className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-alegreya font-semibold mb-4">What is this all about?</h1>
          <p className="text-gray-600 text-xl mb-12 px-4">
            We solve the problem of blood emergencies by connecting blood donors directly with people in blood need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {[
              {
                icon: '/Images/drop.png',
                title: 'What we do?',
                desc: 'We connect blood donors with recipients, without any intermediary such as blood banks, for an efficient and seamless process.'
              },
              {
                icon: '/Images/innovation.png',
                title: 'Innovative',
                desc: 'Blood Buddy is an innovative approach to address global health. We provide immediate access to blood donors.'
              },
              {
                icon: '/Images/netwotk.png',
                title: 'Network',
                desc: 'Blood Buddy is one of several community organizations working together as a network that responds to emergencies in an efficient manner.'
              },
              {
                icon: '/Images/noti.png',
                title: 'Get notified',
                desc: 'Blood Buddy Connect works with network partners to connect blood donors and recipients through an automated SMS service and a mobile app.'
              },
              {
                icon: '/Images/cost.png',
                title: 'Totally Free',
                desc: "Blood Buddy's ultimate goal is to provide an easy-to-use, easy-to-access, fast, efficient, and reliable way to get life-saving blood, totally Free of cost."
              },
              {
                icon: '/Images/save.png',
                title: 'Save Life',
                desc: 'We are a non profit foundation and our main objective is to make sure that everything is done to protect vulnerable persons. Help us by making a gift!'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-500"
              >
                <img src={item.icon} alt={item.title} className="w-24 h-24 mx-auto mb-4" />
                <h3 className="text-xl font-alegreya font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 font-ntr text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Volunteers Section */}
      <section id="volunteers" className="bg-lightcoral py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-alegreya font-semibold text-white">Our super heroes</h1>
          </div>
          <p className="text-center text-white text-lg mb-8 px-4">
            We depend on volunteers! Volunteers make up 96% of our total workforce and carry on our humanitarian work.
            Blood donation is healthy, our volunteers are available 24/7 to help and donate blood.
          </p>

          <div className="max-w-lg mx-auto bg-black/10 backdrop-blur-sm rounded-lg p-4 shadow-xl">
            <ul className="space-y-2">
              {volunteers.map((vol, index) => (
                <li
                  key={vol.id}
                  className={`flex items-center justify-between p-3 rounded text-white transition-all duration-300 hover:scale-105 hover:bg-lightpink ${
                    index === 0 ? 'bg-white/60' : index === 1 ? 'bg-white/40' : index === 2 ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  <span className="w-8 font-semibold">{vol.id}</span>
                  <span className="w-36 text-left">{vol.name}</span>
                  <span className="w-36 text-sm text-left">{vol.location}</span>
                  <span className="w-16 flex items-center gap-2">
                    {vol.bloodGroup}
                    <i className="fa fa-tint"></i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-cover bg-center bg-fixed py-20 px-4" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/Images/review-background.jpg)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center text-white font-alegreya mb-12 leading-tight">
            Testimonials<br />See what our users have to say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-transparent">
                <div className="text-white italic text-base leading-relaxed mb-6 before:content-['❝'] before:text-[500%] before:block">
                  {testimonial.text}
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <p className="text-lightpink text-lg">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home

