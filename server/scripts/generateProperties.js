// Script to generate 206 dummy properties
const fs = require('fs');
const path = require('path');

const titles = [
  "Luxury Villa", "Modern Penthouse", "Seaside Estate", "Mountain Retreat", 
  "Urban Loft", "Country Manor", "Beach House", "City Apartment", 
  "Garden Villa", "Sky Residence", "Lake House", "Desert Oasis",
  "Colonial Estate", "Contemporary Home", "Victorian Manor", "Ranch House",
  "Townhouse", "Studio Apartment", "Duplex", "Waterfront Property"
];

const locations = [
  "Beverly Hills, CA", "Manhattan, NY", "Miami Beach, FL", "Austin, TX",
  "Seattle, WA", "Boston, MA", "Chicago, IL", "San Francisco, CA",
  "Portland, OR", "Denver, CO", "Nashville, TN", "Atlanta, GA",
  "Phoenix, AZ", "Las Vegas, NV", "San Diego, CA", "Dallas, TX",
  "Houston, TX", "Philadelphia, PA", "Charlotte, NC", "Scottsdale, AZ",
  "Malibu, CA", "Santa Monica, CA", "Newport Beach, CA", "La Jolla, CA"
];

const types = ["For Sale", "For Rent", "For Investment"];

const features = [
  ["Swimming Pool", "Home Theater", "Gym"],
  ["Smart Home", "Solar Panels", "EV Charging"],
  ["Garden", "Balcony", "Rooftop Terrace"],
  ["Wine Cellar", "Library", "Game Room"],
  ["Spa", "Sauna", "Hot Tub"],
  ["Garage", "Security System", "Fireplace"],
  ["Ocean View", "Mountain View", "City View"],
  ["Chef's Kitchen", "Walk-in Closet", "Laundry Room"]
];

const properties = [];

// Unsplash property/house images
const imageUrls = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", // Modern house
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", // Luxury home
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", // Contemporary house
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", // Villa
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", // Beach house
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", // Mansion
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", // Modern home exterior
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80", // Suburban house
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80", // Luxury property
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80", // Villa exterior
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", // House front
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80", // Modern architecture
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", // Beautiful home
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80", // Luxury house
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", // Home exterior
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80", // Estate house
  "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80", // Modern villa
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80", // Contemporary home
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", // Stylish house
  "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80", // Residential property
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", // Duplex
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14f8d?w=800&q=80", // Townhouse
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", // Penthouse view
  "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80", // Lakehouse
];

for (let i = 1; i <= 206; i++) {
  const bedrooms = Math.floor(Math.random() * 6) + 1;
  const bathrooms = Math.floor(Math.random() * 4) + 1;
  const area = (Math.floor(Math.random() * 5000) + 800);
  const priceNum = Math.floor(Math.random() * 3000000) + 250000;
  const price = `$${priceNum.toLocaleString()}`;
  
  // Select 2 random unique images for each property
  const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
  const selectedImages = shuffled.slice(0, 2);
  
  properties.push({
    id: i,
    title: titles[Math.floor(Math.random() * titles.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    type: types[Math.floor(Math.random() * types.length)],
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    area: `${area} sqft`,
    price: price,
    description: `Beautiful ${bedrooms}-bedroom property featuring modern amenities and prime location. Perfect for families or investors looking for quality real estate.`,
    features: features[Math.floor(Math.random() * features.length)],
    images: selectedImages
  });
}

// Write to properties.json
const outputPath = path.join(__dirname, '..', 'data', 'properties.json');
fs.writeFileSync(outputPath, JSON.stringify(properties, null, 2));

console.log(`✅ Generated ${properties.length} properties and saved to ${outputPath}`);
