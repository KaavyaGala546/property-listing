"use client"
import React from 'react';
import { FaKey, FaBalanceScale, FaChartLine, FaCogs, FaHandshake, FaTags } from 'react-icons/fa';

const services = [
  {
    icon: <FaTags size={24} />,
    title: 'Property Sales',
    description: 'Expertly promoting and selling your property to attract qualified buyers.',
  },
  {
    icon: <FaHandshake size={24} />,
    title: 'Buyer Representation',
    description: 'Guiding you through the home-buying process, prioritizing your interests.',
  },
  {
    icon: <FaKey size={24} />,
    title: 'Rental Management',
    description: 'Managing tenant relations, maintenance, and finances to maximize rental returns.',
  },
  {
    icon: <FaChartLine size={24} />,
    title: 'Investment Consulting',
    description: 'Providing strategic advice to help you capitalize on real estate opportunities.',
  },
  {
    icon: <FaBalanceScale size={24} />,
    title: 'Property Valuation',
    description: 'Accurately assessing your property’s value for sales, purchases, or investments.',
  },
  {
    icon: <FaCogs size={24} />,
    title: 'Tailored Solutions',
    description: 'Delivering customized real estate services aligned with your specific goals.',
  },
];

const RealEstateServices = () => {
  return (
    <div id='services' className="bg-white py-16 px-6 md:px-20 text-center">
      <button className="px-4 py-1 text-sm border rounded-full mb-4">Why Choose Us</button>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-10">
        EXPLORE OUR RANGE OF <br /> EXPERT REAL ESTATE SERVICES
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-white p-2 rounded-full w-fit mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstateServices;
