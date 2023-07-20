import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import './App.css';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Nav from './Nav'
import ClassesList from './components/Classes/Classes_Carousels/Class_Card';
import MainPage from './components/Classes/MainPage/Main_Page';
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Nav from "./Nav";
import Footer from "./Footer";

function App() {
  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

	return (
		<AuthProvider baseUrl={baseUrl}>
			<BrowserRouter>
      <Nav />
				<div className="container">
					<Routes>
						<Route path="/login" element={<LoginForm />} />
						<Route path="/signup" element={<SignupForm />} />
						<Route path="/classes" element={<ClassesList />} />
						<Route path="/MainPage" element={<MainPage />} />
					</Routes>
				</div>
			</BrowserRouter>
			{/* <div>
  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      {/* <div>
        <ErrorNotification error={error} />
        <Construct info={launchInfo} />
      </div> */}
    </AuthProvider>
  );
}

export default App;
