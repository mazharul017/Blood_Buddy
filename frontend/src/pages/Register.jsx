import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [donorType, setDonorType] = useState("recipient");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [registerMethod, setRegisterMethod] = useState("email"); // 'email' or 'phone'
  const [passwordStrength, setPasswordStrength] = useState("Enter Password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return setPasswordStrength("Enter Password");
    if (pwd.length < 4) return setPasswordStrength("Weak Password");
    if (pwd.length < 8) return setPasswordStrength("Medium Password");
    return setPasswordStrength("Strong Password");
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    checkPasswordStrength(pwd);
  };

  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate age for donors
    if ((donorType === 'donor' || donorType === 'both') && age && parseInt(age) < 18) {
      setError("Donors must be at least 18 years old");
      setLoading(false);
      return;
    }

    const userData = {
      name,
      password: registerMethod === 'email' ? password : undefined,
      age: age ? parseInt(age) : undefined,
      gender,
      bloodGroup,
      address,
      city,
      donorType,
      latitude,
      longitude
    };

    if (registerMethod === 'email') {
      userData.email = email;
    } else {
      userData.phone = phone;
    }

    const result = await register(userData);
    setLoading(false);

    if (result.success) {
      alert("🎉 Registration Successful!");
      navigate("/");
    } else {
      setError(result.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      <Header variant="light" />

      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2 gap-0">

          {/* Left Image Section */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100 p-8">
            <img
              src="/Images/regphoto.png"
              alt="Registration"
              className="w-full h-auto max-w-md object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
              Start Saving Lives
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Register Method Toggle */}
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setRegisterMethod('email')}
                  className={`flex-1 py-2 px-4 rounded ${
                    registerMethod === 'email'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterMethod('phone')}
                  className={`flex-1 py-2 px-4 rounded ${
                    registerMethod === 'phone'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Name Input */}
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />
              </div>

              {/* Email or Phone Input */}
              {registerMethod === 'email' ? (
                <div className="relative">
                  <i className="fas fa-envelope-square absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  />
                </div>
              ) : (
                <div className="relative">
                  <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  />
                </div>
              )}

              {/* Password Input (only for email registration) */}
              {registerMethod === 'email' && (
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  />
                </div>
              )}

              {/* Additional Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  />
                </div>
                <div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  >
                    <option value="">Blood Group</option>
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
                  <select
                    value={donorType}
                    onChange={(e) => setDonorType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                  >
                    <option value="recipient">Recipient</option>
                    <option value="donor">Donor</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indianred focus:outline-none transition-colors text-lg"
                />
              </div>

              {/* Password Strength */}
              {registerMethod === 'email' && (
                <div className="text-center text-gray-600 text-base font-sans">
                  {passwordStrength}
                </div>
              )}

              {/* Submit + Skip */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indianred text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <Link
                  to="/login"
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg text-lg font-semibold text-center hover:bg-gray-300 transition-colors duration-300"
                >
                  Already have account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
