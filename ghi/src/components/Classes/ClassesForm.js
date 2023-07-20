import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../store/authApi";
import { useNavigate } from "react-router-dom";

const ClassesForm = () => {
  const navigate = useNavigate();

  const [createClassError, setCreateClassError] = useState();
  const [createClassStatus, setCreateClassStatus] = useState({
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

  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();
  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

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

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const url = `${baseUrl}/categories`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    }
  };

  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const url = `${baseUrl}/locations`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (tokenData) {
      const formattedFormData = {
        class_name: formData.class_name,
        instructor_id: tokenData.account.id,
        requirements: formData.requirements,
        category_id: formData.category_id,
        description: formData.description,
        price: formData.price,
        image_1: formData.image_1,
        image_2: formData.image_2,
        image_3: formData.image_3,
        image_4: formData.image_4,
        location_id: formData.location_id,
      };
      const url = `${baseUrl}/classes`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(formattedFormData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setCreateClassError();
        const data = await response.json();
        setClassDetails(data);
        setCreateClassStatus({ status: "success" });
      } else {
        setCreateClassError("Create class failed. Please try again.");
      }
    } else {
      setCreateClassError("Please login to create a class.");
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
              <h1>Create a class</h1>
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
                  <option selected>Select a category</option>
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
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
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
              <div className="form-floating mb-3">
                <select
                  value={formData.location_id}
                  onChange={handleFormChange}
                  required
                  id="location_id"
                  name="location_id"
                  className="form-select"
                >
                  <option selected>Select a location</option>
                  {locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.name}: {location.city}, {location.state}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="location_id">Location</label>
              </div>
              <div
                id="errorMessage"
                className={
                  createClassError
                    ? "alert alert-danger text-center"
                    : "alert alert-danger text-center d-none"
                }
                role="alert"
              >
                {createClassError}
              </div>
            </div>
            <div
              id="successMessage"
              className={
                createClassStatus.status == "success"
                  ? "alert alert-success text-center"
                  : "alert alert-success text-center d-none"
              }
              role="alert"
            >
              Success!
            </div>
            {/* NOTE: need to find a better way to right-align the button.
            Currently using "modal-footer" class, which isn't really
            appropriate for this use-case. */}
            <div
              className={
                createClassStatus.status === "uninitiated"
                  ? "modal-footer mb-3"
                  : "modal-footer mb-3 d-none"
              }
            >
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
            <div
              className={
                createClassStatus.status === "success"
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
