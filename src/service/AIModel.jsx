import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

  
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
            role: "user",
            parts: [
                {text: "Generate Travel Plan for Location : Banglore,for 3 Days for Couple with a Cheap budget , Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating,  descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket  Pricing, rating, Time travel each of the location for 3 days with each day plan consisting of 3 places with best time to visit in JSON format."},
            ]
        },
        {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"Bangalore\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Zostel Bangalore\",\n      \"hotelAddress\": \"29, St. Marks Rd, Shankarpuram, Ashok Nagar, Bengaluru, Karnataka 560001\",\n      \"price\": \"₹800-₹1500 per night (approx)\",\n      \"hotelImageUrl\": \"https://example.com/zostel_bangalore.jpg\",  //Replace with actual image URL\n      \"geoCoordinates\": {\n        \"latitude\": 12.9775,\n        \"longitude\": 77.6043\n      },\n      \"rating\": 4.0,\n      \"description\": \"A popular hostel with private rooms and dorm options, known for its social atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Treebo Trend Sree Kanya\",\n      \"hotelAddress\": \"No. 43, 1st Main Road, Gandhi Bazaar, Basavanagudi, Bengaluru, Karnataka 560004\",\n      \"price\": \"₹1000-₹2000 per night (approx)\",\n      \"hotelImageUrl\": \"https://example.com/treebo_sreekanya.jpg\", //Replace with actual image URL\n      \"geoCoordinates\": {\n        \"latitude\": 12.9511,\n        \"longitude\": 77.5746\n      },\n      \"rating\": 3.5,\n      \"description\": \"Budget-friendly hotel with clean rooms and basic amenities.\"\n    },\n    {\n      \"hotelName\": \"FabHotel Prime JP Nagar\",\n      \"hotelAddress\": \"13th Main Rd, JP Nagar, Bengaluru, Karnataka 560078\",\n      \"price\": \"₹1200-₹2500 per night (approx)\",\n      \"hotelImageUrl\": \"https://example.com/fabhotel_jpnagar.jpg\", //Replace with actual image URL\n      \"geoCoordinates\": {\n        \"latitude\": 12.9140,\n        \"longitude\": 77.5892\n      },\n      \"rating\": 3.8,\n      \"description\": \"Simple and affordable hotel in a convenient location.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Cubbon Park\",\n        \"placeDetails\": \"A large park perfect for a relaxing stroll.\",\n        \"placeImageUrl\": \"https://example.com/cubbon_park.jpg\", //Replace with actual image URL\n        \"geoCoordinates\": {\n          \"latitude\": 12.9725,\n          \"longitude\": 77.6000\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeTravel\": \"2-3 hours\"\n      },\n      {\n        \"placeName\": \"Vidhana Soudha\",\n        \"placeDetails\": \"The impressive state legislature building.\",\n        \"placeImageUrl\": \"https://example.com/vidhana_soudha.jpg\", //Replace with actual image URL\n        \"geoCoordinates\": {\n          \"latitude\": 12.9775,\n          \"longitude\": 77.5978\n        },\n        \"ticketPricing\": \"Free (exterior view), guided tours available\",\n        \"rating\": 4.2,\n        \"timeTravel\": \"1-2 hours\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Bangalore Palace\",\n        \"placeDetails\": \"A Tudor-style palace with beautiful architecture.\",\n        \"placeImageUrl\": \"https://example.com/bangalore_palace.jpg\", //Replace with actual image URL\n        \"geoCoordinates\": {\n          \"latitude\": 12.9454,\n          \"longitude\": 77.6045\n        },\n        \"ticketPricing\": \"₹230-₹400 per person (approx)\",\n        \"rating\": 4.0,\n        \"timeTravel\": \"2-3 hours\"\n      },\n      {\n        \"placeName\": \"Tipu Sultan's Summer Palace\",\n        \"placeDetails\": \"A historical building showcasing Tipu Sultan's legacy.\",\n        \"placeImageUrl\": \"https://example.com/tipu_palace.jpg\",  //Replace with actual image URL\n        \"geoCoordinates\": {\n          \"latitude\": 12.9728,\n          \"longitude\": 77.5841\n        },\n        \"ticketPricing\": \"₹20-₹50 per person (approx)\",\n        \"rating\": 4.0,\n        \"timeTravel\": \"1-2 hours\"\n      }      \n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Lalbagh Botanical Garden\",\n        \"placeDetails\": \"A sprawling garden with diverse flora and a glasshouse.\",\n        \"placeImageUrl\": \"https://example.com/lalbagh_garden.jpg\", //Replace with actual image URL\n        \"geoCoordinates\": {\n          \"latitude\": 12.9572,\n          \"longitude\": 77.5739\n        },\n        \"ticketPricing\": \"₹20-₹50 per person (approx)\",\n        \"rating\": 4.3,\n        \"timeTravel\": \"2-3 hours\"\n      },\n      {\n        \"placeName\": \"MG Road\",\n        \"placeDetails\": \"A bustling street with shops, restaurants and cafes.\",\n        \"placeImageUrl\": \"https://example.com/mg_road.jpg\", //Replace with actual image URL\n        \"geoCoordinates\": {\n          \"latitude\": 12.9716,\n          \"longitude\": 77.6041\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.0,\n        \"timeTravel\": \"Flexible, depending on your interest\"\n      }\n    ]\n  },\n  \"notes\": \"Prices are approximate and can vary depending on the season and availability.  Consider using public transport (buses and metro) to save on transportation costs. Check official websites for the most up-to-date ticket prices and opening times. Remember to factor in travel time between locations.\"\n}\n```\nRemember to replace the example image URLs with actual image URLs from a reliable source.  Also, prices and opening times can change, so always double-check before your visit.  This is a suggested itinerary; you can adjust it based on your preferences.\n"},
            ],
          },
        ],
      });
  
 
 