import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { stringify } from "postcss";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import LOGO from './../../assets/logo.png'


const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [days, setDays] = useState("");
  const [formData, setFormData] = useState({
    location: null,
    days: "",
    budget: "",
    travelWith: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "days" && value > 12) {
      toast("Your trip is quite long! Are you sure about this?");
    }
    if (name === "days" && value < 1) {
      toast("Number of days must be positive!");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp), //uhu
    onError: (error) => console.log(error),
  });

  const handleSubmit = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.days > 30 ||
      !formData?.location?.label ||
      !formData?.budget ||
      !formData?.travelWith
    ) {
      toast("Please fill all details correctly.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replace("{totalDays}", formData?.days)
      .replace("{traveller}", formData?.travelWith)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("--", result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error:", error);
      toast("Something went wrong. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();


    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    Navigate('/view-trip/'+docId)

  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        handleSubmit();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-8">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Search for a destination...",
            }}
          />
        </div>

        {/* Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            type="number"
            placeholder="Ex. 4 days"
            value={days}
            onChange={(e) => {
              setDays(e.target.value);
              handleInputChange("days", e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.budget)}
                className={`border cursor-pointer p-5 rounded-lg my-0 hover:shadow-lg ${
                  formData?.budget === item.budget && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-2xl mt-1">{item.budget}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel List */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travelWith", item.title)}
                className={`border cursor-pointer p-5 rounded-lg my-0 hover:shadow-lg ${
                  formData?.travelWith === item.title &&
                  "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-2xl mt-1">{item.title}</h2>
                <p className="font-medium">People: {item.people}</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="my-10 justify-center flex">
        <Button
          onClick={handleSubmit}
          disabled={loading}
         
        >
          {loading ? "Generating..." : "Generate Trip Itinerary"}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src={LOGO} className="size-12" alt="logo" />
              <h2 className="font-bold text-lg mt-7 ">Sign-in with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-2 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
