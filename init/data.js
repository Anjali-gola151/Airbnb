
const sampleListings = [
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
  title: "Cliffside Villa in Santorini",
  description:
    "Enjoy breathtaking sunset views from this whitewashed villa perched on the cliffs of Santorini.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  },
  price: 3200,
  location: "Santorini",
  country: "Greece",
},
{
  title: "Houseboat in Kerala",
  description:
    "Cruise through serene backwaters while staying in a traditional houseboat.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=60",
  },
  price: 1500,
  location: "Kerala",
  country: "India",
},
{
  title: "Snow Cabin in Himachal",
  description:
    "Cozy wooden cabin surrounded by snow-covered mountains and pine forests.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=60",
  },
  price: 1700,
  location: "Manali",
  country: "India",
},
{
  title: "Luxury Apartment in Dubai Marina",
  description:
    "Modern apartment with stunning skyline and marina views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
  },
  price: 2800,
  location: "Dubai",
  country: "United Arab Emirates",
},
{
  title: "Countryside Farmhouse",
  description:
    "Relax in this peaceful farmhouse surrounded by greenery and fresh air.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
  },
  price: 1100,
  location: "Punjab",
  country: "India",
},
{
  title: "Beach Hut in Goa",
  description:
    "Simple and cozy beach hut just steps away from the sea.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=60",
  },
  price: 1300,
  location: "Goa",
  country: "India",
},
{
  title: "Skyline View Apartment in Mumbai",
  description:
    "Stay in a modern apartment with breathtaking city skyline views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
  },
  price: 2100,
  location: "Mumbai",
  country: "India",
},
{
  title: "Lake Cottage in Nainital",
  description:
    "Beautiful cottage overlooking a peaceful lake and hills.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  },
  price: 1600,
  location: "Nainital",
  country: "India",
},
{
  title: "Royal Palace Stay in Jaipur",
  description:
    "Experience royal living in a heritage palace with traditional decor.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
  },
  price: 3000,
  location: "Jaipur",
  country: "India",
}
];

module.exports = { data: sampleListings };