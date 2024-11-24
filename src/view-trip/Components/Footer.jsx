import React from 'react';
import LOGO from './../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 w-full h-auto p-4 pb-3 pr-0">
      <div className="max-w-screen-xl mx-auto flex flex-wrap ">
        {/* Logo and Brand */}
        <div className="flex-1 mb-8">
          <div className="flex gap-2 items-center flex-row ">
            <img src={LOGO} alt="Travel Guide" className="w-14 h-14" />
            <h2>Tours</h2>
          </div>
          <p className="text-sm mt-2">Explore the world, one destination at a time.</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 mb-1">
          <h3 className="text-2xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/#" className="text-gray-200 hover:text-white">Destinations</a></li>
            <li><a href="/#" className="text-gray-200 hover:text-white">Tours</a></li>
            <li><a href="/#" className="text-gray-200 hover:text-white">Blog</a></li>
            <li><a href="/#" className="text-gray-200 hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex-1 mb-0">
          <h3 className="text-2xl font-semibold mb-2 ">Follow Us</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-gray-200 hover:text-white flex items-center space-x-2 text-xl">
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
            <a href="#" className="text-gray-200 hover:text-white flex items-center space-x-2 text-xl">
              <i className="fab fa-twitter"></i>
              <span>Twitter</span>
            </a>
            <a href="#" className="text-gray-200 hover:text-white flex items-center space-x-2 text-xl">
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-2 text-sm ">
        <p>&copy; 2024 Travel Guide. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
