// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./src/components/hero/hero";
import Navbar from "./src/components/navbar/navbar";
import Location from "./src/components/location/location";
import Cardv3 from "./src/components/cardverical3/cardv3";
import Catcard from "./src/components/catcard/catcard";
import Ads from "./src/components/ads/ads";
import Footer from "./src/components/footer/f";
import Store from "./src/components/store/Store";
import Cardh from "./src/components/cardh/cardh";
import Description from "./src/components/discrip/discription";
import Cardv2 from "./src/components/cardverical2/cardv2";
import Signup from "./src/components/signup/signup";
import Login from "./src/components/login/login";
import UpBooking from "./src/components/upbooking/upbooking";
import AddItem from "./src/components/add-item/add";
import Chat from "./src/components/chat/chat";
import FAQ from "./src/components/faq/faq";
import Review from "./src/components/review/review";
import Checkout from "./src/components/checkout/checkout";
import Notify from "./src/components/notofication/notify";
import Terms from "./src/components/guide/terms";
import CancellationPolicy from "./src/components/guide/cancellation";
import Policy from "./src/components/guide/policy";
import UpdateItem from "./src/components/update-item/update";
import { LoginProvider } from "./src/context/LoginContext"; // Import LoginContext
import ProtectedRoute from "./src/components/protectedRoute"; // Import ProtectedRoute
import Profile from "./src/components/profie/profile";
import SavedCardv3 from "./src/components/savedCardv3/saveCardv3";
import MyRentals from "./src/components/my-rentals/myrentals";

const App = () => {
  return (
    <LoginProvider>
      {/* Wrap the app with LoginProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Location />
                <Cardv3 />
                <Catcard />
                <Ads />
                <Footer />
              </>
            }
          />
          {/* Protected Route */}
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Store />
                <Location />
                <Cardh />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/description/:title"
            element={
              <>
                <Location />
                <Description />
                <Cardv2 />
                <Footer />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<UpdateItem />} />

          {/* Protected Route */}
          <Route
            path="/upbooking"
            element={
              <>
                <UpBooking />
                <Footer />
              </>
            }
          />

          <Route
            path="/my-rentals"
            element={
              <>
                <MyRentals />
                <Footer />
              </>
            }
          />

          <Route
            path="/terms"
            element={
              <>
                <Terms />
                <Footer />
              </>
            }
          />
          <Route
            path="/cancellation"
            element={
              <>
                <CancellationPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/policy"
            element={
              <>
                <Policy />
                <Footer />
              </>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <FAQ />
                <Footer />
              </>
            }
          />
          <Route
            path="/review"
            element={
              <>
                <Review />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route
            path="/notify"
            element={
              <>
                <Notify />
                <Footer />
              </>
            }
          />
          <Route
            path="/add-item"
            element={
              <>
                <AddItem />
                <Footer />
              </>
            }
          />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/saved"
            element={
              <>
                <Location />
                <SavedCardv3 />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Profile />
              </>
            }
          />
        </Routes>
      </Router>
    </LoginProvider>
  );
};

export default App;
