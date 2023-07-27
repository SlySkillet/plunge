import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../store/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const ProfileForm = () => {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();

  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

  const [updateProfileError, setUpdateProfileError] = useState();
  const [profileSetupStatus, setProfileSetupStatus] = useState({ status: "" });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    avatar: "",
    phone: "",
    biography: "",
    interests: "",
    location_id: "",
    mock_credit_card: "",
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
    const url = `${baseUrl}/locations`;
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
  const handleFormChange = async (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "phone") {
      const cleanPhoneNumber = value.replace(/-| |[(]|[)]/g, "");
      let formattedPhoneNumber = formatPhoneNumber(cleanPhoneNumber);
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else if (name === "mock_credit_card") {
      const cleanCreditCardNumber = value.replace(/-/g, "");
      let formattedCreditCardNumber = formatCreditCardNumber(
        cleanCreditCardNumber
      );
      setFormData({ ...formData, [name]: formattedCreditCardNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchProfileData = async () => {
    if (tokenData) {
      const url = `${baseUrl}/account`;
      const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          first_name: tokenData.account.first_name,
          last_name: tokenData.account.last_name,
          email: tokenData.account.email,
          username: tokenData.account.username,
          avatar:
            data.avatar ===
            "https://www.seekpng.com/png/full/143-1435868_headshot-silhouette-person-placeholder.png"
              ? ""
              : data.avatar,
          phone: data.phone_number ? formatPhoneNumber(data.phone_number) : "",
          biography: data.biography ? data.biography : "",
          interests: data.interests ? data.interests : "",
          location_id: data.location_id ? data.location_id : "",
          mock_credit_card: data.mock_credit_card
            ? formatCreditCardNumber(data.mock_credit_card)
            : "",
        });
        setProfileSetupStatus({
          status: data.phone_number ? "finished" : "in progress",
        });
      }
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        avatar: "",
        phone: "",
        biography: "",
        interests: "",
        location_id: "",
        mock_credit_card: "",
      });
    }
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
    if (tokenData) {
      const url = `${baseUrl}/locations/${tokenData.account.id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchCategories();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchProfileData();
    fetchLocations();
  }, [tokenData]);

  const formatPhoneNumber = (phoneNumber) => {
    const phoneNumberStr = String(phoneNumber);

    if (phoneNumberStr.length === 0) {
      return "";
    } else if (phoneNumberStr.length <= 3) {
      return "(" + phoneNumberStr;
    } else if (phoneNumberStr.length > 3 && phoneNumberStr.length <= 6) {
      return "(" + phoneNumberStr.slice(0, 3) + ") " + phoneNumberStr.slice(3);
    } else if (phoneNumberStr.length > 6) {
      return (
        "(" +
        phoneNumberStr.slice(0, 3) +
        ") " +
        phoneNumberStr.slice(3, 6) +
        "-" +
        phoneNumberStr.slice(6)
      );
    }
  };

  const formatCreditCardNumber = (creditCardNumber) => {
    const creditCardNumberStr = String(creditCardNumber);
    if (creditCardNumberStr.length <= 4) {
      return creditCardNumberStr;
    } else if (
      creditCardNumberStr.length > 4 &&
      creditCardNumberStr.length <= 8
    ) {
      return (
        creditCardNumberStr.slice(0, 4) + "-" + creditCardNumberStr.slice(4)
      );
    } else if (
      creditCardNumberStr.length > 8 &&
      creditCardNumberStr.length <= 12
    ) {
      return (
        creditCardNumberStr.slice(0, 4) +
        "-" +
        creditCardNumberStr.slice(4, 8) +
        "-" +
        creditCardNumberStr.slice(8)
      );
    } else if (creditCardNumberStr.length > 12) {
      return (
        creditCardNumberStr.slice(0, 4) +
        "-" +
        creditCardNumberStr.slice(4, 8) +
        "-" +
        creditCardNumberStr.slice(8, 12) +
        "-" +
        creditCardNumberStr.slice(12)
      );
    }
  };

  const formatFormData = () => {
    return {
      avatar: formData.avatar
        ? formData.avatar
        : "https://www.seekpng.com/png/full/143-1435868_headshot-silhouette-person-placeholder.png",
      phone_number: Number(formData.phone.replace(/-| |[(]|[)]/g, "")),
      biography: formData.biography,
      mock_credit_card: formData.mock_credit_card.replace(/-/g, ""),
      interests: formData.interests,
      location_id: formData.location_id,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (tokenData) {
      const formattedFormData = formatFormData();
      const url = `${baseUrl}/account_details`;
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
        setUpdateProfileError();
        navigate("/profile");
      } else {
        setUpdateProfileError("Edit class failed. Please try again.");
      }
    } else {
      setUpdateProfileError("Please login to edit a profile.");
    }
  };

  return (
    <div className="container">
      <div className="offset-2 col-9">
        {tokenIsLoading ? (
          <div className="mt-5 text-center">
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : tokenData ? (
          <>
            <div className="row m-4"></div>
            <div className="row mb-3">
              <div className="text-left">
                <div>
                  <h1>
                    {profileSetupStatus.status === "finished"
                      ? "Edit my profile"
                      : "Set up my profile"}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="first_name"
                      name="first_name"
                      id="first_name"
                      type="text"
                      maxLength="100"
                      disabled
                      className="form-control"
                      value={formData.first_name}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="last_name"
                      name="last_name"
                      id="last_name"
                      type="text"
                      maxLength="100"
                      disabled
                      className="form-control"
                      value={formData.last_name}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="email"
                      name="email"
                      id="email"
                      type="email"
                      maxLength="100"
                      disabled
                      className="form-control"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="username"
                      name="username"
                      id="username"
                      type="text"
                      maxLength="100"
                      disabled
                      className="form-control"
                      value={formData.username}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="avatar"
                      name="avatar"
                      id="avatar"
                      type="url"
                      maxLength="100"
                      className="form-control"
                      value={formData.avatar}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="avatar">Avatar</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="phone"
                      name="phone"
                      id="phone"
                      type="tel"
                      required
                      className="form-control"
                      maxLength="14"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      placeholder="biography"
                      name="biography"
                      id="biography"
                      required
                      className="form-control"
                      value={formData.biography}
                      onChange={handleFormChange}
                      style={{ height: "100px" }}
                    />
                    <label htmlFor="biography">About me</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      value={formData.interests}
                      onChange={handleFormChange}
                      required
                      id="interests"
                      name="interests"
                      className="form-select"
                    >
                      <option hidden value="">
                        Tell us what you're interested in
                      </option>
                      {categories.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="interests">Interests</label>
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
                        Select your location
                      </option>
                      {locations.map((location) => {
                        return (
                          <option key={location.id} value={location.id}>
                            {location.name}: {location.city}, {location.state}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="location_id">Address</label>&nbsp;&nbsp;
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
                  <div className="form-floating mb-3">
                    <input
                      placeholder="mock_credit_card"
                      name="mock_credit_card"
                      required
                      className="form-control"
                      maxLength="19"
                      value={formData.mock_credit_card}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="mock_credit_card">Credit Card #</label>
                  </div>
                  <div
                    id="errorMessage"
                    className={
                      updateProfileError
                        ? "alert alert-danger text-center"
                        : "alert alert-danger text-center d-none"
                    }
                    role="alert"
                  >
                    {updateProfileError}
                  </div>
                </div>
                {/* NOTE: need to find a better way to right-align the button.
            Currently using "modal-footer" class, which isn't really
            appropriate for this use-case. */}
                <div className="modal-footer mb-3">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div
            id="errorMessage"
            className="alert alert-danger text-center mt-4 mx-4"
            role="alert"
          >
            Please login to edit your profile.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
