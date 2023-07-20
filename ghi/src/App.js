import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ClassDetails from "./components/Classes/ClassDetails";
import ClassesForm from "./components/Classes/ClassesForm";
import EventsForm from "./components/Events/EventsForm";
import Nav from "./Nav";
import Footer from "./Footer";

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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/classes/create" element={<ClassesForm />} />
            <Route path="/classes/:id" element={<ClassDetails />} />
            <Route path="/classes/:id/events/create" element={<EventsForm />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
