import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './components/create-trip';
import Headers from './components/custom/Header'
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path:'/view-trip/:tripId',
    element: <ViewTrip/>,
  },
  {
    path:'/my-trips',
    element: <MyTrips/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Headers/>
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
