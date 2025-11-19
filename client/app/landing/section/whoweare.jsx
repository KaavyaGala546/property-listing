"use client"
import { Eye, Target } from 'lucide-react';

export default function WhoWeAre() {
    return (
      <div id="about" className="min-h-screen px-6 py-12 max-w-7xl mx-auto font-sans">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <button className="bg-gray-100 text-gray-800 text-sm px-4 py-1 rounded-full mb-4">
              Who We Are
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              REDEFINING EXCELLENCE IN REAL ESTATE
            </h1>
            <p className="text-gray-600 mb-6">
              We specialize in luxury properties, sustainable homes, and vacation rentals —
              driven by a passion for exceptional living and a commitment to quality,
              innovation, and client satisfaction.
            </p>
  
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 text-gray-800">
              <div>
                <h2 className="text-2xl font-bold">200+</h2>
                <p className="text-sm text-gray-500">Projects Complete</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">70+</h2>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">$10M+</h2>
                <p className="text-sm text-gray-500">Project Value</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">90%</h2>
                <p className="text-sm text-gray-500">Client Retention Rate</p>
              </div>
            </div>
          </div>
  
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1555432782-efda97a5088a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team"
              className="rounded-2xl shadow-md object-cover w-full h-full"
            />
          </div>
        </div>
  
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Vision */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <div className="mb-3">
              <Eye className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              To be a leader in the real estate market, offering unparalleled services in
              luxury, sustainability, and vacation properties.
            </p>
          </div>
  
          {/* Mission */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <div className="mb-3">
              <Target className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To create exceptional living experiences through innovation, sustainability,
              and personalized service in modern real estate.
            </p>
          </div>
        </div>
      </div>
    );
  }
  