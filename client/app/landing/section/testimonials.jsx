"use client"
import React from 'react';

const testimonials = [
  {
    stars: 5,
    text: "Buying my vacation home was surprisingly easy. Sophia really knew her stuff and made the whole process super smooth. I didn’t have to worry about a thing.",
    name: "Nathan Harper",
    title: "Software Developer",
    img: "https://i.pravatar.cc/40?img=1"
  },
  {
    stars: 5,
    text: "Emily walked me through every step of my green home investment. She explained things clearly, gave great advice, and honestly just made it all feel doable.",
    name: "Logan Price",
    title: "Environmental Consultant",
    img: "https://i.pravatar.cc/40?img=2"
  },
  {
    stars: 5,
    text: "Isabella was amazing — super friendly and detail-oriented. I found the perfect rental without any of the usual stress. It actually felt fun.",
    name: "Aria Sullivan",
    title: "Digital Nomad",
    img: "https://i.pravatar.cc/40?img=3"
  },
  {
    stars: 5,
    text: "I had no idea where to start with property investment, but Emily made it all make sense. She was patient, clear, and completely on my side the whole time.",
    name: "Grace Powell",
    title: "Financial Consultant",
    img: "https://i.pravatar.cc/40?img=4"
  },
  {
    stars: 5,
    text: "I thought the rental process would be a nightmare, but Olivia made it simple. She’s sharp, supportive, and gave me a lot of confidence.",
    name: "Scarlett Mitchell",
    title: "Event Planner",
    img: "https://i.pravatar.cc/40?img=5"
  },
  {
    stars: 5,
    text: "Charlotte totally got what I was looking for. Her design sense and guidance helped me find a home that fits me perfectly. Loved working with her.",
    name: "Samuel Brooks",
    title: "Interior Designer",
    img: "https://i.pravatar.cc/40?img=6"
  },
];

export default function Testimonials() {
  return (
    <div className="flex flex-col md:flex-row p-8 gap-8 max-w-7xl mx-auto">
      
      {/* Sticky Left Section */}
      <div className="md:w-1/3 sticky top-10 self-start">
        <div className="bg-gray-100 rounded-full text-gray-600 text-sm px-4 py-1 inline-block mb-4">
          What Our Clients Say
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
          TRUSTED BY MANY,<br />LOVED BY ALL
        </h2>
        <p className="text-gray-600">
          Our clients’ success stories reflect our commitment to excellence. See how we’ve helped them find their dream homes, sustainable investments, and perfect getaways.
        </p>
      </div>

      {/* Right Cards in Grid */}
      <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <div className="flex gap-1 text-yellow-400 mb-2">
              {'★'.repeat(t.stars)}
            </div>
            <p className="text-gray-700 mb-4">{t.text}</p>
            <div className="flex items-center gap-3">
              <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
