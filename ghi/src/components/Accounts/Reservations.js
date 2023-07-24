import { useState, useEffect } from "react";
import { useGetTokenQuery, useLogoutMutation } from "../../store/authApi";
import { useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function Reservations() {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();

  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  const fetchData = async () => {
    if (tokenData) {
      const url = `${baseUrl}/student/reservations/${tokenData.account.id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        let currentTimestamp = new Date(0);
        currentTimestamp.setUTCSeconds(Math.floor(Date.now() / 1000));
        let past = [];
        let upcoming = [];
        for (let reservation of data) {
          if (reservation.status != false) {
            if (new Date(reservation.date_time) > currentTimestamp) {
              upcoming.push(reservation);
            } else {
              past.push(reservation);
            }
          }
        }
        setUpcomingReservations(upcoming);
        setPastReservations(past);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [tokenData]);

  useEffect(() => {
    fetchData();
  }, []);

  const googleMapsLink = (address, city, state, zip_code) => {
    address = address.split(" ").join("+");
    return `https://www.google.com/maps/place/${address},+${city},+${state}+${zip_code}/`;
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = dayNames[date.getDay()];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let ampm = "AM";
    if (hour > 12) {
      hour -= 12;
      ampm = "PM";
    }
    return `${dayOfWeek}, ${month}/${day}/${year} - ${hour}:${minute} ${ampm}`;
  };

  const handleWithdraw = async (e, id) => {
    console.log("handle withdraw ran");
    console.log(id);
    e.preventDefault();
    const data = {};
    data.status = false;
    const url = `${baseUrl}/reservations/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchData();
    }
  };

  return (
    <div className="container mt-5">
      <div className="offset-1 col-10">
        <div className="row m-4">
          <div className="text-center">
            <h1>My Reservations</h1>
          </div>
          {tokenData ? (
            <div className="text-center">
              <div className="m-4">
                <div className="mb-4">
                  <h3 className="d-flex m-3">Upcoming</h3>
                  <div
                    className={
                      upcomingReservations
                        ? "d-none"
                        : "d-flex justify-content-center"
                    }
                  >
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  </div>
                  <div
                    className={
                      upcomingReservations
                        ? "d-flex justify-content-center"
                        : "d-none"
                    }
                  >
                    <table className="table table-striped m-3">
                      <thead>
                        <tr>
                          <th>Class Name</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Instructor</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingReservations &&
                          upcomingReservations.map(
                            (upcomingReservation, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <a
                                      href={`/classes/${upcomingReservation.class_id}`}
                                    >
                                      {upcomingReservation.class_name}
                                    </a>
                                  </td>
                                  <td>
                                    {formatDateTime(
                                      upcomingReservation.date_time
                                    )}
                                  </td>
                                  <td>
                                    <a
                                      href={googleMapsLink(
                                        upcomingReservation.address,
                                        upcomingReservation.city,
                                        upcomingReservation.state,
                                        upcomingReservation.zip_code
                                      )}
                                      target="_blank"
                                    >
                                      {upcomingReservation.location_name}
                                    </a>
                                  </td>
                                  <td>
                                    {upcomingReservation.instructor_first_name}{" "}
                                    {upcomingReservation.instructor_last_name}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={(e) =>
                                        handleWithdraw(
                                          e,
                                          upcomingReservation.id
                                        )
                                      }
                                    >
                                      Withdraw
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="d-flex m-3">Past</h3>
                  <div
                    className={
                      upcomingReservations
                        ? "d-none"
                        : "d-flex justify-content-center"
                    }
                  >
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  </div>
                  <div
                    className={
                      upcomingReservations
                        ? "d-flex justify-content-center"
                        : "d-none"
                    }
                  >
                    <table className="table table-striped m-3">
                      <thead>
                        <tr>
                          <th>Class Name</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Instructor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastReservations &&
                          pastReservations.map((pastReservation, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <a
                                    href={`/classes/${pastReservation.class_id}`}
                                  >
                                    {pastReservation.class_name}
                                  </a>
                                </td>
                                <td>
                                  {formatDateTime(pastReservation.date_time)}
                                </td>
                                <td>
                                  <a
                                    href={googleMapsLink(
                                      pastReservation.address,
                                      pastReservation.city,
                                      pastReservation.state,
                                      pastReservation.zip_code
                                    )}
                                    target="_blank"
                                  >
                                    {pastReservation.location_name}
                                  </a>
                                </td>
                                <td>
                                  {pastReservation.instructor_first_name}{" "}
                                  {pastReservation.instructor_last_name}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <br />
            </div>
          ) : (
            <div
              id="errorMessage"
              className="alert alert-warning text-center m-4"
              role="alert"
            >
              Please log in to view your events
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservations;
