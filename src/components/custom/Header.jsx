import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import LOGO from "./../../assets/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc"; // Google icon
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import axios from "axios";

const Header = () => {
  // Fetching user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [loading, setLoading] = useState(false); // State for login button

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload(); // Reload page after logout
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
        window.location.reload()
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp), //uhu
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    console.log(user); // Log user details on render
  }, [user]);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Logo and Navigation */}
      <a href="/" className="flex items-center gap-2 text-2xl font-bold">
        <img src={LOGO} alt="Company Logo" className="h-10 w-10" />
        Tour
      </a>

      {/* User Actions */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger aria-label="User Menu">
                <img
                  src={user?.picture}
                  className="h-[40px] w-[40px] rounded-full"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="p-2 bg-white shadow-lg rounded-lg text-sm">
                <div className="flex flex-col items-start">
                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Dialog for Sign In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src={LOGO} className="h-12" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign-in with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-2 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                {loading ? "Signing In..." : "Sign In with Google"}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
