"use client";
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Navbar from '../../../components/navbar';
import Link from 'next/link';
export default function EstatesWebsite() {
   
  
  const agents = [
    { id: 1, img: "https://images.unsplash.com/photo-1643555388236-d0031659d3e4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Agent 1" },
    { id: 2, img: "https://images.unsplash.com/photo-1643555388236-d0031659d3e4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Agent 2" },
    { id: 3, img: "https://images.unsplash.com/photo-1643555388236-d0031659d3e4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Agent 3" },
    { id: 4, img: "https://images.unsplash.com/photo-1643555388236-d0031659d3e4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Agent 4" },
  ];

  return (
    <div id='home' className="min-h-screen bg-white font-sans">
      {/* Navigation */}
     <Navbar />
      {/* Hero Section */}
      <div className="relative h-screen md:h-3/4 lg:h-3/4 overflow-hidden ">
        <div className="absolute inset-0 px-10 rounded  ">
          <div className="absolute inset-0  z-10"></div>
          <img
            src="https://framerusercontent.com/images/rQXeeWMbrXXzxko63WI4Z1ZVIk.jpg"
            alt="Modern luxury home"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="relative z-20 px-8 md:px-16 lg:px-24 pt-24 md:pt-32 lg:pt-40">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              FIND YOUR PERFECT HOME TODAY
            </h2>
            <p className="text-white text-lg mb-8">
              We provide tailored real estate solutions, guiding you through every step with
              personalized experiences that meet your unique needs and aspirations.
            </p>
            <Link className='cursor-pointer' href="/properties">
              <button className="bg-white cursor-pointer text-black px-8 py-4 rounded-full flex items-center font-medium">
                Explore Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap mt-24 space-y-6 md:space-y-8 md:space-x-16">
            <div className="text-white">
              <h3 className="text-5xl font-bold">200<sup>+</sup></h3>
              <p className="text-sm">Projects Complete</p>
            </div>
            <div className="text-white">
              <h3 className="text-5xl font-bold">70<sup>+</sup></h3>
              <p className="text-sm">Happy Clients</p>
            </div>
            <div className="text-white">
              <h3 className="text-5xl font-bold">$10M<sup>+</sup></h3>
              <p className="text-sm">Project Value</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 right-12 bg-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-4">
            {agents.map((agent) => (
              <div key={agent.id} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                <img src={agent.img} alt={agent.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <div className="font-semibold">10+ Featured Agents</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-semibold">5 / 5</span>
            </div>
          </div>
        </div>
        
      </div>

      </div>

      {/* Featured Agents */}
      
    </div>
  );
}