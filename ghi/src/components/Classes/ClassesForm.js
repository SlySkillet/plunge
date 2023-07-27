import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../store/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const ClassesForm = () => {
  const navigate = useNavigate();
  const { classId } = useParams();

  const [createOrUpdateClassError, setCreateOrUpdateClassError] = useState();
  const [createOrUpdateClassStatus, setCreateOrUpdateClassStatus] = useState({
    status: "uninitiated",
  });
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

  // Location Modal: states and functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [locationData, setLocationData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const [createLocationError, setCreateLocationError] = useState();

  const handleLocationFormChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLocationData({ ...locationData, [name]: value });
  };

  const createLocation = async (event) => {
    event.preventDefault();
    const location = { ...locationData, user_id: tokenData.account.id };
    const url = `${baseUrl}/api/locations`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchLocations();
      handleClose();
      setLocationData({
        name: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
      });
      setCreateLocationError("");
    } else {
      setCreateLocationError("Please fill in all the fields.");
    }
  };

  const { data: tokenData } = useGetTokenQuery();
  const baseUrl = process.env.REACT_APP_API_HOST;

  const [formData, setFormData] = useState({
    class_name: "",
    requirements: "",
    category_id: "",
    description: "",
    price: "",
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
    location_id: "",
  });

  const handleFormChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const fetchFormData = async () => {
    if (classId) {
      const url = `${baseUrl}/api/classes/${classId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setClassDetails(data);
        setFormData({
          class_name: data.class_name,
          requirements: data.requirements,
          category_id: data.category_id,
          description: data.description,
          price: data.price,
          image_1: data.image_1,
          image_2: data.image_2,
          image_3: data.image_3,
          image_4: data.image_4,
          location_id: data.location_id,
        });
      }
    }
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const url = `${baseUrl}/api/categories`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    }
  };

  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    if (tokenData) {
      const url = `${baseUrl}/api/locations/${tokenData.account.id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    }
  };

  useEffect(() => {
    fetchFormData();
    fetchCategories();
    fetchLocations();
  }, [tokenData]);

  useEffect(() => {
    fetchFormData();
    fetchCategories();
    fetchLocations();
  }, []);

  const formatFormData = () => {
    return {
      class_name: formData.class_name,
      instructor_id: classId
        ? classDetails.instructor_id
        : tokenData.account.id,
      requirements: formData.requirements,
      category_id: formData.category_id,
      description: formData.description,
      price: formData.price,
      featured: classId ? classDetails.featured : false,
      image_1: formData.image_1,
      image_2: formData.image_2,
      image_3: formData.image_3,
      image_4: formData.image_4,
      location_id: formData.location_id,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (tokenData) {
      if (classId) {
        const formattedFormData = formatFormData();
        const url = `${baseUrl}/api/classes/${classId}`;
        const fetchConfig = {
          method: "put",
          body: JSON.stringify(formattedFormData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setCreateOrUpdateClassError();
          setCreateOrUpdateClassStatus({ status: "success" });
          navigate("/dashboard");
        } else {
          setCreateOrUpdateClassError("Edit class failed. Please try again.");
        }
      } else {
        const formattedFormData = formatFormData();
        const url = `${baseUrl}/api/classes`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formattedFormData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setCreateOrUpdateClassError();
          const data = await response.json();
          setClassDetails(data);
          setCreateOrUpdateClassStatus({ status: "success" });
        } else {
          setCreateOrUpdateClassError("Create class failed. Please try again.");
        }
      }
    } else {
      if (classId) {
        setCreateOrUpdateClassError("Please login to edit a class.");
      } else {
        setCreateOrUpdateClassError("Please login to create a class.");
      }
    }
  };

  const handleSetUpEventClick = async (event) => {
    event.preventDefault();
    setFormData({
      class_name: "",
      requirements: "",
      category_id: "",
      description: "",
      price: "",
      image_1: "",
      image_2: "",
      image_3: "",
      image_4: "",
      location_id: "",
    });
    navigate(`/classes/${classDetails.id}/events/create`);
  };

  return (
    <div className="container">
      <div className="offset-2 col-9">
        <div className="row m-4"></div>
        <div className="row mb-3">
          <div className="text-left">
            <div>
              {classId ? (
                <h1>Edit {formData.class_name}</h1>
              ) : (
                <h1>Create a class</h1>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-floating mb-3">
                <input
                  placeholder="class_name"
                  name="class_name"
                  id="class_name"
                  type="text"
                  maxLength="100"
                  required
                  className="form-control"
                  value={formData.class_name}
                  onChange={handleFormChange}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  placeholder="requirements"
                  name="requirements"
                  id="requirements"
                  type="text"
                  required
                  className="form-control"
                  value={formData.requirements}
                  onChange={handleFormChange}
                />
                <label htmlFor="requirements">Requirements</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={formData.category_id}
                  onChange={handleFormChange}
                  required
                  id="category_id"
                  name="category_id"
                  className="form-select"
                >
                  <option hidden value="">
                    Select a category
                  </option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="category_id">Category</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  placeholder="description"
                  name="description"
                  id="description"
                  required
                  className="form-control"
                  value={formData.description}
                  onChange={handleFormChange}
                  style={{ height: "100px" }}
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  placeholder="Price"
                  name="price"
                  id="price"
                  type="number"
                  max="999"
                  required
                  className="form-control"
                  value={formData.price}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  placeholder="image_1"
                  name="image_1"
                  id="image_1"
                  type="url"
                  maxLength="100"
                  required
                  className="form-control"
                  value={formData.image_1}
                  onChange={handleFormChange}
                />
                <label htmlFor="image_1">Add an image</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  placeholder="image_2"
                  name="image_2"
                  id="image_2"
                  type="url"
                  maxLength="100"
                  className="form-control"
                  value={formData.image_2}
                  onChange={handleFormChange}
                />
                <label htmlFor="image_2">Add an image (optional)</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  placeholder="image_3"
                  name="image_3"
                  id="image_3"
                  type="url"
                  maxLength="100"
                  className="form-control"
                  value={formData.image_3}
                  onChange={handleFormChange}
                />
                <label htmlFor="image_3">Add an image (optional)</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  placeholder="image_4"
                  name="image_4"
                  id="image_4"
                  type="url"
                  maxLength="100"
                  className="form-control"
                  value={formData.image_4}
                  onChange={handleFormChange}
                />
                <label htmlFor="image_4">Add an image (optional)</label>
              </div>
              <div className="form-floating mb-3 d-flex">
                <select
                  value={formData.location_id}
                  onChange={handleFormChange}
                  required
                  id="location_id"
                  name="location_id"
                  className="form-select"
                >
                  <option hidden value="">
                    Select a location
                  </option>
                  {locations &&
                    locations.map((location) => {
                      return (
                        <option key={location.id} value={location.id}>
                          {location.name}: {location.city}, {location.state}
                        </option>
                      );
                    })}
                </select>
                <label htmlFor="location_id">Location</label>&nbsp;&nbsp;
                <Button
                  variant="btn btn-sm btn-outline-primary align-text-bottom col-2"
                  onClick={handleShow}
                  style={{ minWidth: "175px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  &nbsp;&nbsp; Add a location
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add a Location</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <div className="form-floating mb-3">
                        <input
                          placeholder="name"
                          name="name"
                          type="text"
                          required
                          className="form-control"
                          value={locationData.name}
                          onChange={handleLocationFormChange}
                        />
                        <label>Location nickname</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          placeholder="address"
                          name="address"
                          type="text"
                          required
                          className="form-control"
                          value={locationData.address}
                          onChange={handleLocationFormChange}
                        />
                        <label>Street address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          placeholder="city"
                          name="city"
                          type="text"
                          required
                          className="form-control"
                          value={locationData.city}
                          onChange={handleLocationFormChange}
                        />
                        <label>City</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select
                          value={locationData.state}
                          onChange={handleLocationFormChange}
                          required
                          id="state"
                          name="state"
                          className="form-select"
                        >
                          <option value="">Select your state</option>
                          <option value="AK">AK</option>
                          <option value="AL">AL</option>
                          <option value="AR">AR</option>
                          <option value="AZ">AZ</option>
                          <option value="CA">CA</option>
                          <option value="CO">CO</option>
                          <option value="CT">CT</option>
                          <option value="DC">DC</option>
                          <option value="DE">DE</option>
                          <option value="FL">FL</option>
                          <option value="GA">GA</option>
                          <option value="HI">HI</option>
                          <option value="IA">IA</option>
                          <option value="ID">ID</option>
                          <option value="IL">IL</option>
                          <option value="IN">IN</option>
                          <option value="KS">KS</option>
                          <option value="KY">KY</option>
                          <option value="LA">LA</option>
                          <option value="MA">MA</option>
                          <option value="MD">MD</option>
                          <option value="ME">ME</option>
                          <option value="MI">MI</option>
                          <option value="MN">MN</option>
                          <option value="MO">MO</option>
                          <option value="MS">MS</option>
                          <option value="MT">MT</option>
                          <option value="NC">NC</option>
                          <option value="ND">ND</option>
                          <option value="NE">NE</option>
                          <option value="NH">NH</option>
                          <option value="NJ">NJ</option>
                          <option value="NM">NM</option>
                          <option value="NV">NV</option>
                          <option value="NY">NY</option>
                          <option value="OH">OH</option>
                          <option value="OK">OK</option>
                          <option value="OR">OR</option>
                          <option value="PA">PA</option>
                          <option value="RI">RI</option>
                          <option value="SC">SC</option>
                          <option value="SD">SD</option>
                          <option value="TN">TN</option>
                          <option value="TX">TX</option>
                          <option value="UT">UT</option>
                          <option value="VA">VA</option>
                          <option value="VT">VT</option>
                          <option value="WA">WA</option>
                          <option value="WI">WI</option>
                          <option value="WV">WV</option>
                          <option value="WY">WY</option>
                        </select>
                        <label>State</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          placeholder="zip_code"
                          name="zip_code"
                          type="number"
                          required
                          className="form-control"
                          value={locationData.zip_code}
                          onChange={handleLocationFormChange}
                        />
                        <label>Zip code</label>
                      </div>
                    </form>
                    <div
                      id="errorMessage"
                      className={
                        createLocationError
                          ? "alert alert-danger text-center"
                          : "alert alert-danger text-center d-none"
                      }
                      role="alert"
                    >
                      {createLocationError}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={createLocation}>
                      Add Location
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div
                id="errorMessage"
                className={
                  createOrUpdateClassError
                    ? "alert alert-danger text-center"
                    : "alert alert-danger text-center d-none"
                }
                role="alert"
              >
                {createOrUpdateClassError}
              </div>
            </div>
            <div
              id="successMessage"
              className={
                createOrUpdateClassStatus.status == "success"
                  ? "alert alert-success text-center"
                  : "alert alert-success text-center d-none"
              }
              role="alert"
            >
              Success!
            </div>
            <div
              className={
                createOrUpdateClassStatus.status === "uninitiated"
                  ? "modal-footer mb-3"
                  : "modal-footer mb-3 d-none"
              }
            >
              <button type="submit" className="btn btn-success">
                {classId ? "Update" : "Create"}
              </button>
            </div>
            <div
              className={
                createOrUpdateClassStatus.status === "success"
                  ? "modal-footer mb-3"
                  : "modal-footer mb-3 d-none"
              }
              onClick={handleSetUpEventClick}
            >
              <button className="btn btn-success">Set up an event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClassesForm;
