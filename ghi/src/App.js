import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import MainPage from "./components/Classes/MainPage/Main_Page";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ClassDetails from "./components/Classes/ClassDetails";
import ClassesForm from "./components/Classes/ClassesForm";
import EventsForm from "./components/Events/EventsForm";
import Reservations from "./components/Accounts/Reservations";
import ProfileForm from "./components/Accounts/ProfileForm";
import Profile from "./components/Accounts/Profile";
import Dashboard from "./components/Accounts/Dashboard";
import Nav from "./Nav";
import Footer from "./Footer";
import UpcomingClasses from "./components/Classes/Classes";
import AllUpcomingClasses from "./components/Classes/AllUpcomingClasses";
import BrowseCategories from "./components/Categories/Categories";
import Category from "./components/Categories/Category";

function App() {
  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/classes/create" element={<ClassesForm />} />
            <Route path="/classes/:classId/edit" element={<ClassesForm />} />
            <Route path="/classes/:classId" element={<ClassDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/classes/:classId/events/create"
              element={<EventsForm />}
            />
            <Route
              path="/classes/:classId/events/:eventId/edit"
              element={<EventsForm />}
            />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/profile/edit" element={<ProfileForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upcoming" element={<UpcomingClasses />} />
            <Route path="/all-upcoming" element={<AllUpcomingClasses />} />
            <Route path="/browse-categories" element={<BrowseCategories />} />
            <Route path="categories/:Id" element={<Category />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
