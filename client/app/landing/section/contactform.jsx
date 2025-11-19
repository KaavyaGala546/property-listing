"use client"
import React from 'react';

const ContactForm = () => {
  return (
    <div
      className="min-h-[150vh] bg-cover bg-center flex flex-col items-center  pt-42 text-white"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
    >
      <button className="mb-6 px-4 py-2 bg-white text-black rounded-full shadow">
        Get in Touch
      </button>

      <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
        LET’S MAKE YOUR PROPERTY JOURNEY <br /> EFFORTLESS
      </h1>

      <p className="mt-4 max-w-xl text-center text-lg font-light">
        Have questions or ready to take the next step? Whether you're looking to buy, rent, or invest, our team is here to guide you every step of the way. Let's turn your property goals into reality.
      </p>

      <form className="bg-white text-black rounded-2xl p-8 mt-8 w-full max-w-3xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <textarea
          placeholder="What Can We Help You ?"
          className="w-full mt-4 border border-gray-300 rounded px-4 py-2"
        ></textarea>
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-3 rounded-full"
        >
          Book a Call
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
