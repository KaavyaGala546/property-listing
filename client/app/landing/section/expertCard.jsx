"use client"
import Image from "next/image";

const experts = [
  {
    name: "James Anderson",
    role: "Residential Specialist",
    img: "https://images.unsplash.com/photo-1623880840102-7df0a9f3545b?q=80&w=2184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Charlotte Morgan",
    role: "High-End Property Consultant",
    img: "https://images.unsplash.com/photo-1654279511005-eb0531f49dce?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sophia Rivera",
    role: "Sustainable Housing Consultant",
    img: "https://images.unsplash.com/photo-1661588698602-da41ee4fc846?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Liam Carter",
    role: "Commercial Real Estate Agent",
    img: "https://images.unsplash.com/photo-1636191284490-fff58f369ec6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Isabella Wright",
    role: "Short-Term Rental Expert",
    img: "https://images.unsplash.com/photo-1689848591601-1319fdc4e090?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ExpertCard = ({ expert }) => (
  <div  className="min-w-[250px]">
    <div className="bg-white rounded-2xl overflow-hidden shadow-md w-[250px] h-[300px] flex flex-col items-center justify-end relative">
      <Image
        src={expert.img}
        alt={expert.name}
        width={250}
        height={300}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 bg-white bg-opacity-80 w-full px-4 py-2 text-center">
        <h4 className="font-semibold text-sm">{expert.name}</h4>
        <p className="text-xs text-gray-600">{expert.role}</p>
      </div>
    </div>
  </div>
);

export default function ExpertSlider() {
  const duplicatedExperts = [...experts, ...experts]; // for seamless loop

  return (
    <div id="agent" className="overflow-hidden py-10 bg-white">
      <div className="flex justify-center mb-4">
        <button className="text-sm px-4 py-1 bg-gray-100 rounded-full text-gray-700">
          Meet Our Experts
        </button>
      </div>
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        PERSONALIZED GUIDANCE, <br className="hidden md:block" /> PROVEN EXPERTISE
      </h2>

      <div className="relative w-full">
        <div className="flex gap-8 whitespace-nowrap animate-scroll">
          {duplicatedExperts.map((expert, index) => (
            <ExpertCard expert={expert} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
