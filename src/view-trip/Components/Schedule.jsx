import React from 'react';

const Schedule = ({ trip }) => {
  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      <h3 className="font-bold text-2xl mb-6 text-center">Places to Visit</h3>
      <div className="flex flex-col space-y-8">
        {trip?.tripData?.itinerary && Object.keys(trip.tripData.itinerary).map((dayKey, index) => {
          const dayPlaces = trip.tripData.itinerary[dayKey]; // Get places for this day

          return (
            <div key={index} className="flex flex-col mb-8">
              {/* Day Header */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Day {index + 1}</h3>

              {/* Grid for places on each day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(dayPlaces) ? (
                  dayPlaces.map((place, placeIndex) => (
                    <div
                      key={placeIndex}
                      className="flex flex-col rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 p-6"
                    >
                      {/* Using <a> tag to open Google Maps search link */}
                      <a 
                        href={`https://www.google.com/maps/search/?q=${encodeURIComponent(place?.placeName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={"/placeholder.svg"}
                          alt={place?.placeName || 'Place'}
                          className="rounded-lg w-full h-48 object-cover mb-2"
                        />
                        <h4 className="text-lg font-medium text-gray-800">{place?.placeName}</h4>
                        <p className="text-sm text-gray-600 mt-2">{place?.placeDetails}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          <strong>Rating:</strong> {place?.rating ?? 'N/A'} ★
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          <strong>Ticket Pricing:</strong> {place?.ticketPricing}
                        </p>
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        <strong>Time Travel:</strong> {place?.timeTravel}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No places available for this day.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
