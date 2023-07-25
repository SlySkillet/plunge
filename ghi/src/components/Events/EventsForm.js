import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../store/authApi";
import { useNavigate, useParams } from "react-router-dom";

const EventsForm = () => {
  const navigate = useNavigate();

  const { classId, eventId } = useParams();

  const [createOrUpdateEventError, setCreateOrUpdateEventError] = useState();

  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();

  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

  const googleMapsLink = () => {
    if (classDetails.location_address) {
      const address = classDetails.location_address.split(" ").join("+");
      const city = classDetails.location_city;
      const state = classDetails.location_state;
      const zip_code = classDetails.location_zip_code;
      return `https://www.google.com/maps/place/${address},+${city},+${state}+${zip_code}/`;
    }
  };

  const [classDetails, setClassDetails] = useState({
    id: "",
    class_name: "",
    instructor_id: "",
    requirements: "",
    category_id: "",
    description: "",
    price: "",
    featured: "",
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
    location_id: "",
    category_name: "",
    location_name: "",
    location_address: "",
    location_city: "",
    location_state: "",
    location_zip_code: "",
    location_latitude: "",
    location_longitude: "",
  });

  const fetchClassDetails = async () => {
    const url = `${baseUrl}/classes/${classId}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setClassDetails(data);
    }
  };

  const [formData, setFormData] = useState({
    date_time: "",
    capacity: "",
  });

  const fetchFormData = async () => {
    if (eventId) {
      const url = `${baseUrl}/events/${eventId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          date_time: data.date_time,
          capacity: data.capacity,
        });
      }
    }
  };

  useEffect(() => {
    fetchClassDetails();
    fetchFormData();
  }, []);

  const handleFormChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const formatFormData = () => {
    return {
      date_time: formData.date_time,
      capacity: formData.capacity,
      class_id: classId,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (tokenData) {
      if (eventId) {
        const formattedFormData = formatFormData();
        const url = `${baseUrl}/events/${eventId}`;
        const fetchConfig = {
          method: "put",
          body: JSON.stringify(formattedFormData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setFormData({
            date_time: "",
            capacity: "",
          });
          navigate("/dashboard");
        } else {
          setCreateOrUpdateEventError("Update event failed. Please try again.");
        }
      } else {
        const formattedFormData = formatFormData();
        const url = `${baseUrl}/events`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formattedFormData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setFormData({
            date_time: "",
            capacity: "",
          });
          navigate("/dashboard");
        } else {
          setCreateOrUpdateEventError("Create event failed. Please try again.");
        }
      }
    } else {
      if (eventId) {
        setCreateOrUpdateEventError("Please login to edit an event.");
      } else {
        setCreateOrUpdateEventError("Please login to create an event.");
      }
    }
  };

  return (
    <div className="container">
      <div className="offset-2 col-9">
        <div className="row m-4"></div>
        <div className="mb-3">
          <div className="text-left">
            <div>
              {eventId ? <h1>Edit event</h1> : <h1>Create an event</h1>}
            </div>
          </div>
        </div>
        <div
          className={
            classDetails.id === "" ? "d-none" : "d-flex justify-content-center"
          }
        >
          <div className="card mb-3" style={{ width: "359px" }}>
            <h5 className="card-header">
              <strong>{classDetails.class_name}</strong>
            </h5>
            <div className="row card-body">
              <div className="pt-1 col d-flex justify-content-center">
                <img height="88px" src={classDetails.image_1} />
              </div>
              <div className="col" style={{ minWidth: "237px" }}>
                <p className="card-text">
                  <strong>{classDetails.location_name}</strong> <br />
                  <a href={googleMapsLink()} target="_blank">
                    {classDetails.location_address} <br />
                    {classDetails.location_city}, {classDetails.location_state}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            classDetails.id === "" ? "d-flex justify-content-center" : "d-none"
          }
        >
          <div className="card mb-3" style={{ width: "359px" }}>
            <h5 className="card-header" style={{ height: "41px" }}></h5>
            <div className="card-body text-center" style={{ height: "128px" }}>
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder="capacity"
                name="capacity"
                id="capacity"
                type="number"
                max="999"
                required
                className="form-control"
                value={formData.capacity}
                onChange={handleFormChange}
              />
              <label htmlFor="capacity">Maximum attendees</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="date_time"
                name="date_time"
                id="date_time"
                type="datetime-local"
                required
                className="form-control"
                value={formData.date_time}
                onChange={handleFormChange}
              />
              <label htmlFor="date_time">Date & time</label>
            </div>
            <div
              id="errorMessage"
              className={
                createOrUpdateEventError
                  ? "alert alert-danger text-center"
                  : "alert alert-danger text-center d-none"
              }
              role="alert"
            >
              {createOrUpdateEventError}
            </div>
            <div className="modal-footer mb-3">
              <button type="submit" className="btn btn-success">
                {eventId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventsForm;
