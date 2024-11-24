import { Button } from "@/components/ui/button";
import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.svg"); // State to hold photo URL
  const travelers = trip?.tripDetails?.travelers;
  const travelersText = travelers === "Group Getaway" ? travelers : `${travelers || "N/A"} Travelers`;

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const result = await getPlaceDetails(data);
      const places = result?.data?.places;

      if (places?.length > 0) {
        const photoName = places[0]?.photos?.[7]?.name;
        if (photoName) {
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName); // Replace placeholder
          setPhotoUrl(photoUrl); // Update photo URL
          console.log("Photo URL:", photoUrl);
        } else {
          console.warn("No photo found for the location.");
        }
      } else {
        console.warn("No places found in the response.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <div>
      {/* Image Section */}
      <img
        src={photoUrl}
        className="h-auto w-full object-cover rounded-xl lg:h-[500px]"
        alt="Trip Placeholder"
      />

      {/* Info Section */}
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-4">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>

          <div className="flex space-x-5">
            <h3 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm lg:text-sm">
              {trip?.userSelection?.days || "N/A"} Days
            </h3>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm lg:text-sm">
              Budget: {trip?.userSelection?.budget || "N/A"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm lg:text-sm">
              No. of Travellers: {trip?.userSelection?.travelWith || "N/A"}
            </h2>
          </div>
        </div>

        <Button className="mt-8">
          <IoSendSharp />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
