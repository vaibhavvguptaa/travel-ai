import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../Components/InfoSection';
import Hotels from '../Components/Hotels';
import Schedule from '../Components/Schedule';
import Footer from '../Components/Footer';

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip,setTrip]=useState([])

  useEffect(() => {
    if (tripId) {
        // used to get trip info from firebase
      const fetchTripData = async () => {
        try {
          const docRef = doc(db, 'AiTrips', tripId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
          } else {
            console.log("No Such Document Found");
            toast('No trip Found!');
          }
        } catch (error) {
          console.error("Error fetching trip data:", error);
          toast('An error occurred while fetching the trip data.');
        }
      };

      fetchTripData();
    }
  }, [tripId]);

  return (
<>
      <div className='p-10 md:px-20 lg:px44 xl:px-56'>
        {/* info section */}
        <InfoSection trip={trip}/>

        {/* Recommended hotels */}
            <Hotels trip={trip}/>

        {/* Daily Plan */}
        <Schedule trip={trip}/>
        {/* Footer */}
  </div>
  <div>
        <Footer trip={trip} />

  </div>
  </>
)
};

export default ViewTrip;
