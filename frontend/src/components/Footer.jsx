function Footer() {
  return (
    <footer className="relative w-full bg-[#111] text-white">
      {/* Footer Content */}
      <div className="flex items-center justify-center flex-col text-center py-12 px-4">
        <h3 className="text-2xl md:text-3xl font-raleway font-medium text-gray-300 mb-4">
          JOIN OUR CAUSE
        </h3>
        <p className="max-w-3xl text-base md:text-xl leading-7 text-gray-400 mb-8 font-sans">
          Donating blood is not just about giving a part of yourself; it's about giving someone a second chance at life,
          <br className="hidden md:block" />
          a chance to smile again, and a chance for their family to hold them close once more.
        </p>

        {/* Social Media Links */}
        <div className="flex items-center space-x-8 md:space-x-12 mb-8">
          <a
            href="https://www.bloodbank.org.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl md:text-3xl hover:text-khaki hover:-translate-y-2 transition-all duration-300"
          >
            <i className="fas fa-globe"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl md:text-3xl hover:text-pink-600 hover:-translate-y-2 transition-all duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl md:text-3xl hover:text-blue-600 hover:-translate-y-2 transition-all duration-300"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="absolute bottom-0 w-full bg-[#070707] text-gray-400 text-center py-3 text-sm">
        <p>2025 © All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

