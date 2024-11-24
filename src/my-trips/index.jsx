import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { Button } from "@/components/ui/button";
import { IoSendSharp } from "react-icons/io5";
import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();

  // Fetch user trips and associated images
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // Redirect to home if not logged in
      return;
    }

    try {
      const q = query(collection(db, "AiTrips"), where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      const userTrips = [];
      querySnapshot.forEach((doc) => {
        const tripData = doc.data();
        userTrips.push({
          id: doc.id,
          location: tripData?.userSelection?.location?.label || "N/A",
          date: tripData?.date || "N/A",
          duration: tripData?.userSelection?.days || "N/A",
          price: tripData?.userSelection?.budget || "N/A",
          travelers: tripData?.userSelection?.travelWith || "N/A",
        });
      });

      setTrips(userTrips); 
      setLoading(false); 

      // Fetch images after trips are loaded
      await fetchImagesForTrips(userTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setLoading(false);
    }
  };

  // Fetch images for each trip location
  const fetchImagesForTrips = async (userTrips) => {
    const tempImageUrls = {};

    for (const trip of userTrips) {
      const location = trip.location;
      if (location && location !== "N/A") {
        const data = { textQuery: location };

        try {
          const result = await getPlaceDetails(data);
          const places = result?.data?.places;

          if (places?.length > 0) {
            const photoName = places[0]?.photos?.[7]?.name;
            const photoUrl = photoName
              ? PHOTO_REF_URL.replace("{NAME}", photoName)
              : "/placeholder.svg";
            tempImageUrls[trip.id] = photoUrl;
          } else {
            tempImageUrls[trip.id] = "/placeholder.svg";
          }
        } catch (error) {
          console.error("Error fetching place photo:", error);
          tempImageUrls[trip.id] = "/placeholder.svg";
        }
      } else {
        tempImageUrls[trip.id] = "/placeholder.svg";
      }
    }
    setImageUrls(tempImageUrls); 
  };

  useEffect(() => {
    getUserTrips();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading trip history...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Your Trip History</h1>
      {trips.length === 0 ? (
        <p className="text-gray-600">You have no trips yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div key={trip.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <img
                src={imageUrls[trip.id] || "/placeholder.svg"}
                className="h-auto w-full object-cover rounded-xl lg:h-[200px]"
                alt={trip.location || "Trip Image"}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="my-5 flex flex-col gap-4">
                  <h2 className="font-bold text-2xl">{trip.location || "Unknown Location"}</h2>
                  <div className="flex flex-col space-y-3">
                    <h3 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-sm lg:text-sm">{trip.duration} Days</h3>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-sm lg:text-sm">Budget: {trip.price}</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-sm lg:text-sm">No. of Travelers: {trip.travelers}</h2>
                  </div>
                </div>
                <Button className="mt-8 size-8" onClick={() => navigate(`/view-trip/${trip.id}`)}>
                  <IoSendSharp />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
