import { MapPin, Phone, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-br from-purple-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-purple-600 text-white overflow-hidden w-full">
        <div className="container mx-auto px-6 py-20 md:py-32 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">Chic Creations</span>
          </h1>
          <p className="text-xl max-w-2xl opacity-90 mb-10">
            Crafting your unique style with bespoke fashion solutions in Metro
            City
          </p>
          <Link
            to="/login"
            className="px-9 py-2 mt-10 font-medium rounded-sm bg-white text-purple-600"
          >
            Register New Project
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tailored Fashion & Design Services
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Located in the heart of Metro City, Chic Creations specializes in
            custom fashion design, alterations, and client project registration
            to bring your style vision to life.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg text-gray-800">
                Expert Designers
              </h3>
              <p className="text-gray-600">
                Skilled artisans creating custom garments tailored to your
                vision
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg text-gray-800">
                Fast Turnaround
              </h3>
              <p className="text-gray-600">
                Quick alterations and custom orders delivered on time
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg text-gray-800">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                Clear, upfront quotes for all design and alteration services
              </p>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-600 p-6 text-white">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <p className="opacity-90">
              Ready to start your next fashion project? Contact us today!
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-gray-800">Visit Our Studio</h3>
              </div>
              <address className="text-gray-600 not-italic ml-7">
                Chic Creations
                <br />
                123 Style Boulevard
                <br />
                Metro City, NY 10001
              </address>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-gray-800">Call Us Today</h3>
              </div>
              <p className="text-gray-600 ml-7">
                <a
                  href="tel:+15555555555"
                  className="text-purple-600 hover:underline"
                >
                  (555) 789-1234
                </a>
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-gray-800">Lead Designer</h3>
              </div>
              <p className="text-gray-600 ml-7">Sophia Bennett</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-center">
                Chic Creations
              </h3>
              <p className="text-gray-400 text-sm">
                Crafting timeless fashion since 2018
              </p>
            </div>

            <div className="flex flex-col space-y-2"></div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Chic Creations Inc. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Public;
