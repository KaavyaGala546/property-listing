// app/properties/[id]/page.js
import { properties } from '../../data/properties';
import Image from 'next/image';
import Navbar from '../../../components/navbar';
import ContactForm from '../../landing/section/contactform';
import Footer from '../../../components/footer';

export default function PropertyDetail({ params }) {
  const property = properties.find(p => p.id === Number(params.id));

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="pt-2">
    <div className="container mx-auto px-4 pb-16">
         <Navbar />
      <div className="grid grid-cols-1 pt-16 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative h-96 rounded-lg mb-4 overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {property.images.map((img, index) => (
              <div key={index} className="relative h-24 rounded overflow-hidden">
                <Image
                  src={img}
                  alt={`${property.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{property.location}</p>
          
          {/* Property specs */}
          <div className="flex space-x-6 mb-8">
            <div>
              <span className="block text-gray-500">Bedrooms</span>
              <span className="text-xl font-semibold">{property.bedrooms}</span>
            </div>
            <div>
              <span className="block text-gray-500">Bathrooms</span>
              <span className="text-xl font-semibold">{property.bathrooms}</span>
            </div>
            <div>
              <span className="block text-gray-500">Area</span>
              <span className="text-xl font-semibold">{property.area}</span>
            </div>
          </div>
          
          {/* Price and type */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-3xl font-bold text-blue-600 mb-2">{property.price}</p>
            <span className="inline-block bg-white px-3 py-1 rounded-full text-sm font-semibold">
              {property.type}
            </span>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{property.description}</p>
          </div>
          
          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </div>
     <ContactForm />
     <Footer />
     </div>
  );
}