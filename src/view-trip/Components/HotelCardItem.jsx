import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "@/service/GlobalApi";

function HotelCardItem({ hotel = {} }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.svg"); // State to hold photo URL
  const [loading, setLoading] = useState(true); // State for loading

  // Effect to trigger fetching the photo when hotel name is available
  useEffect(() => {
    if (hotel?.hotelName && photoUrl === "/placeholder.svg") {
      getPlacePhoto(); // Fetch the photo if not already done
    }
  }, [hotel?.hotelName, photoUrl]); // Depend only on hotelName and photoUrl

  const getPlacePhoto = async () => {
    const data = { textQuery: hotel?.hotelName };
    setLoading(true);

    try {
      const result = await getPlaceDetails(data);
      const places = result?.data?.places;

      console.log("Google API result:", places); // Debugging step to inspect the API response

      if (places?.length > 0) {
        // Check for photos and select the first available one
        const photoReference = places[0]?.photos?.[0]?.photo_reference;
        if (photoReference) {
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
          setPhotoUrl(photoUrl); // Set the photo URL
        } else {
          setPhotoUrl("/placeholder.png"); // Fallback if no photo reference found
        }
      } else {
        setPhotoUrl("/placeholder.svg"); // Fallback to default placeholder if no places found
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setPhotoUrl("/placeholder.svg"); // Fallback on error
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <div className="m-1 flex-shrink-0 w-[80%] sm:w-[60%] md:w-auto border rounded-lg shadow p-5 cursor-pointer hover:scale-105 transition-all">
      <Link
        to={`https://www.google.com/maps/search/?q=${hotel?.hotelAddress}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {loading ? (
          <div className="h-40 w-full bg-gray-200 animate-pulse rounded-lg"></div> // Show loading pulse
        ) : (
          <img
            src={photoUrl}
            className="rounded-lg w-full h-40 object-cover"
            alt={hotel?.hotelName || "Hotel"} // Image alt text fallback
            onError={(e) => (e.target.src = "/placeholder.svg")} // Fallback image if error occurs
          />
        )}
        <h3 className="font-medium text-lg mt-2">{hotel?.hotelName ?? "Unknown Hotel"}</h3>
        <p className="text-sm text-gray-600">{hotel?.description ?? "No description available"}</p>
        <p className="text-sm text-gray-500 mt-1">Rating: {hotel?.rating ?? "N/A"} ★</p>
        <p className="text-sm text-gray-500">Price: {hotel?.price ?? "N/A"}</p>
      </Link>
    </div>
  );
}

export default HotelCardItem;
