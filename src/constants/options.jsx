export const SelectTravelList = [
    {
      id: 1,
      title: "Just Me",
      description: "A sole traveler in exploration",
      icon: "🌍",
      people: 1
    },
    {
      id: 2,
      title: "Couple Adventure",
      description: "A journey for two exploring the world together",
      icon: "🧑‍🤝‍🧑",
      people: 2
    },
    {
      id: 3,
      title: "Family Trip",
      description: "A fun-filled vacation for the whole family",
      icon: "👨‍👩‍👧‍👦",
      people: 4
    },
    {
      id: 4,
      title: "Group Getaway",
      description: "A trip for a group of friends seeking new adventures",
      icon: "👯‍♂️",
      people: 5
    },
    {
      id: 5,
      title: "Solo Road Trip",
      description: "An adventurous solo road trip through the countryside",
      icon: "🚗",
      people: 1
    }
  ];
  

  export const SelectBudgetOptions = [
    {
      id: 1,
      budget: "Low Budget",
      description: "Travel on a shoestring budget, perfect for solo adventurers or budget-conscious travelers",
      icon: "💸",
    },
    {
      id: 2,
      budget: "Mid Range Budget",
      description: "A comfortable budget that balances affordability and quality experiences",
      icon: "💵",
    },
    {
      id: 3,
      budget: "Luxury Budget",
      description: "For those who prefer a lavish experience with premium accommodations and services",
      icon: "💎",
    },
  ];
  
  export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveller} with a {budget} , Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location with each day plan with best time to visit in JSON format.";
