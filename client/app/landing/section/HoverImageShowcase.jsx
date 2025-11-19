"use client"
import { useState } from 'react';

export default function RealEstateSolutions() {
    const [activeProperty, setActiveProperty] = useState('residence'); // Default to first property

    const propertyDetails = {
        residence: {
            id: "01",
            title: "Luxury Residences",
            description:
                "Experience unparalleled elegance in our luxury residences, featuring exquisite design, premium amenities, and prime locations for the most discerning tastes.",
            image:
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=3058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        greenBuilding: {
            id: "02",
            title: "Eco Green Buildings",
            description:
                "Sustainable luxury with our eco-friendly green buildings, combining modern design with environmental responsibility.",
            image:
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3058&auto=format&fit=crop",
        },
        vacation: {
            id: "03",
            title: "Unique Vacation Homes",
            description:
                "Escape to our premium vacation rentals in exclusive destinations, offering unforgettable experiences in breathtaking locations.",
            image:
                "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    };

    const handleMouseEnter = (property) => {
        setActiveProperty(property);
    };

    return (
        <div className="w-full bg-white font-sans">
            <div className="max-w-7xl mx-auto px-8 py-12">
 
                <div className="rounded-full bg-gray-100 text-gray-800 inline-block px-6 py-2 mb-6 text-sm font-medium">
                    What We Offer
                </div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                    COMPREHENSIVE REAL ESTATE SOLUTIONS
                </h1>
                <p className="text-lg text-gray-700 mb-16 max-w-3xl">
                    Our comprehensive services encompass luxury property sales, sustainable green building
                    investments, and premium vacation rentals.
                </p>

    
                <div className="flex flex-row gap-12 mb-10 relative">
           
                    <div className="w-1/3 relative top-72 ">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-2 bg-black rounded-lg">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2" fill="none">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                            Luxury Residences
                            </h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                           
                            Experience unparalleled elegance in our luxury residences, featuring exquisite design, premium amenities, and prime locations for the most discerning tastes.
                        </p>
                    </div>

             
                    <div className="relative w-2/3 h-120 rounded-xl overflow-hidden">
                        <div className="w-full h-full relative rounded-xl overflow-hidden">
                            <img
                                src={propertyDetails[activeProperty].image}
                                alt={propertyDetails[activeProperty].title}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "center center" }}
                            />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <div className="text-7xl font-bold mb-1">
                                    {propertyDetails[activeProperty].id}
                                </div>
                                <div className="text-xl font-semibold">
                                    {propertyDetails[activeProperty].title}
                                </div>
                            </div>
                        </div>

                       
                        <div className="absolute right-5  top-52 gap-12 h-full flex flex  justify-between">
                            {Object.entries(propertyDetails).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="w-20 h-66 bg-white flex flex-col items-center justify-center cursor-pointer relative"
                                    onMouseEnter={() => handleMouseEnter(key)}
                                >
                                    <div
                                        className={`absolute right-full top-0 transition-opacity duration-300 ${activeProperty === key ? "opacity-100" : "opacity-0"
                                            }`}
                                    >
                                         
                                    </div>

                                    <div className={`text-6xl font-bold ${activeProperty === key ? "text-gray-900" : "text-gray-300"}`}>
                                        {value.id}
                                    </div>
                                    {value.title.split(" ").map((word, idx) => (
                                        <div
                                            key={idx}
                                            className={`writing-vertical transform rotate-180 text-xs tracking-widest mt-1 ${activeProperty === key ? "text-gray-900 font-medium" : "text-gray-500"
                                                }`}
                                        >
                                            {word.toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        
            <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          line-height: 1;
        }
      `}</style>
        </div>
    );
}