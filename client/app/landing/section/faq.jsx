"use client"
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";  

const faqs = [
  {
    question: "What is the process for buying a property?",
    answer:
      "The process involves selecting the right property, negotiating terms with the agent, signing the contract, and completing the payment. Our professional agents will guide you through every step to ensure a smooth experience.",
  },
  {
    question: "How do I determine how much I can afford?",
    answer: "You can estimate your budget by analyzing your income, expenses, and desired loan amount. Use our affordability calculator to get a quick idea.",
  },
  {
    question: "What documents are required for renting a property?",
    answer: "You'll typically need an ID proof, income proof, credit report, and reference letter. Some landlords may require additional documents.",
  },
  {
    question: "Can I terminate a lease agreement early?",
    answer: "Yes, but early termination clauses vary by contract. You may be subject to penalties unless otherwise stated in your agreement.",
  },
  {
    question: "What are the risks of investing in real estate?",
    answer: "Market fluctuations, liquidity issues, and maintenance costs are some risks. It's best to research and consult experts before investing.",
  },
  {
    question: "How do I choose the right property to invest in?",
    answer: "Consider location, market trends, rental potential, and your long-term goals. Always inspect the property and evaluate returns.",
  },
  {
    question: "Do high-end properties support virtual tours?",
    answer: "Yes, most high-end listings include high-quality virtual tours to provide a better viewing experience for remote buyers.",
  },
  {
    question: "How long does the property transfer process take?",
    answer: "It typically takes 4-8 weeks depending on due diligence, financing, and paperwork. Our agents help you expedite the process.",
  },
];

const App = () => {
  const [openIndex, setOpenIndex] = useState(0);  

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-12 max-w-4xl mx-auto">
      <div className="text-sm text-gray-600 mb-2">Help Center</div>
      <h1 className="text-3xl font-bold mb-8">FREQUENTLY ASKED QUESTIONS</h1>

      {faqs.map((faq, index) => (
        <div key={index} className="border-b py-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left"
          >
            <span className="text-lg font-semibold">{faq.question}</span>
            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
          </button>
          {openIndex === index && (
            <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
