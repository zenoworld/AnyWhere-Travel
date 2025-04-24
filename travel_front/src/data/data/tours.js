
import tourImg01 from '../image/new_tour1.jpg'
import tourImg02 from '../image/new_tour2.jpg'
import tourImg03 from '../image/new_tour3.jpg'
import tourImg04 from '../image/new_tour4.jpg'
import tourImg05 from '../image/new_tour5.png'
import tourImg06 from '../image/new_tour6.png'
import tourImg07 from '../image/new_tour7.jpg'
import tourImg08 from '../image/new_tour8.jpg'

// const tours = [
//   {
//     id: "01",
//     title: "Westminister Bridge",
//     city: "London",
//     address:"somewhere ",
//     distance: 300,
//     price: 99,
//     maxGroupSize: 10,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg01,
//     featured: true,
//   },
//   {
//     id: "02",
//     title: "Bali, Indonesia",
//     city: "Indonesia",
//     address:"somewhere ",
//     distance: 400,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg02,
//     featured: true,
//   },
//   {
//     id: "03",
//     title: "Snowy Mountains, Thailand",
//     city: "Thailand",
//     address:"somewhere ",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg03,
//     featured: true,
//   },
//   {
//     id: "04",
//     title: "Beautiful Sunrise, Thailand",
//     city: "Thailand",
//     address:"somewhere ",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg04,
//     featured: true,
//   },
//   {
//     id: "05",
//     title: "Nusa Pendia Bali, Indonesia",
//     city: "Indonesia",
//     address:"somewhere ",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg05,
//     featured: false,
//   },
//   {
//     id: "06",
//     title: "Cherry Blossoms Spring",
//     city: "Japan",
//     address:"somewhere ",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//       {
//         name: "amar",
//         rating: 5,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg06,
//     featured: false,
//   },
//   {
//     id: "07",
//     title: "Holmen Lofoten",
//     city: "France",
//     address:"somewhere ",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [],
//     avgRating: 4.5,
//     photo: tourImg07,
//     featured: false,
//   },
//   {
//     id: "08",
//     title: "Snowy Mountains, Thailand",
//     city: "Thailand",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [],
//     avgRating: 4.5,
//     photo: tourImg03,
//     featured: false,
//   },
// ];

const tours = [
  {
    "title": "Thames River Cruise",
    "city": "London",
    "address": "Tower Pier, London, UK",
    "distance": 500,
    "pricePerDay": 85,
    "maxGroupSize": 20,
    "desc": "Enjoy a scenic cruise along the Thames River, witnessing London's iconic landmarks like the Tower Bridge and Big Ben.",
    "reviews": [],
    "photo": tourImg01,
    "featured": true
  },
  {
    "title": "Paris City Lights Tour",
    "city": "Paris",
    "address": "Place Charles de Gaulle, Paris, France",
    "distance": 200,
    "pricePerDay": 150,
    "maxGroupSize": 25,
    "desc": "Explore the romantic City of Light by night, including stops at the Eiffel Tower and the Seine River.",
    "reviews": [],
    "photo": tourImg02,
    "featured": false
  },
  {
    "title": "Venetian Gondola Experience",
    "city": "Venice",
    "address": "San Marco Square, Venice, Italy",
    "distance": 300,
    "pricePerDay": 180,
    "maxGroupSize": 6,
    "desc": "Experience Venice from its historic canals with a guided gondola ride through the city's waterways.",
    "reviews": [],
    "photo": tourImg03,
    "featured": true
  },
  {
    "title": "Swiss Alps Adventure",
    "city": "Zurich",
    "address": "Central Train Station, Zurich, Switzerland",
    "distance": 600,
    "pricePerDay": 220,
    "maxGroupSize": 12,
    "desc": "Embark on a journey through the breathtaking Swiss Alps with hiking, sightseeing, and unforgettable views.",
    "reviews": [],
    "photo": tourImg04,
    "featured": false
  },
  {
    "title": "Northern Lights Expedition",
    "city": "Reykjavik",
    "address": "Harpa Concert Hall, Reykjavik, Iceland",
    "distance": 500,
    "pricePerDay": 200,
    "maxGroupSize": 10,
    "desc": "Witness the magical Aurora Borealis on a guided expedition through Iceland's serene landscapes.",
    "reviews": [],
    "photo": tourImg05,
    "featured": true
  },
  {
    "title": "Safari in Serengeti",
    "city": "Arusha",
    "address": "Arusha, Tanzania",
    "distance": 800,
    "pricePerDay": 400,
    "maxGroupSize": 20,
    "desc": "Explore the vast wilderness of the Serengeti National Park and witness the majestic wildlife in its natural habitat.",
    "reviews": [],
    "photo": tourImg06,
    "featured": true
  },
  {
    "title": "Sydney Harbor Kayak Tour",
    "city": "Sydney",
    "address": "Sydney Opera House, Sydney, Australia",
    "distance": 300,
    "pricePerDay": 75,
    "maxGroupSize": 8,
    "desc": "Paddle through the iconic Sydney Harbor and enjoy unique views of the Sydney Opera House and Harbor Bridge.",
    "reviews": [],
    "photo": tourImg07,
    "featured": false
  },
  {
    "title": "Cape Town Coastal Drive",
    "city": "Cape Town",
    "address": "V&A Waterfront, Cape Town, South Africa",
    "distance": 400,
    "pricePerDay": 140,
    "maxGroupSize": 18,
    "desc": "Drive along the stunning coastline of Cape Town, including stops at Chapman's Peak and the Cape of Good Hope.",
    "reviews": [],
    "photo": tourImg08,
    "featured": true
  },
]
export default tours;
