import React from "react";
import HotelCardItem from "./HotelCardItem";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      {/* Flexbox container for scrolling */}
      <div className="flex overflow-x-auto space-x-4 p-2 md:grid md:grid-cols-3 lg:grid-cols-3 lg:overflow-hidden md:space-x-0 md:gap-5 justify-center">
        {trip?.tripData?.hotels?.map((hotel, index) => {
          console.log(hotel); // Debugging step to verify hotel data
          return <HotelCardItem key={index} hotel={hotel} />;
        })}
      </div>
    </div>
  );
};

export default Hotels;
