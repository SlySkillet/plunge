import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../store/authApi";
import { useNavigate, useParams } from "react-router-dom";

const ProfileForm = () => {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();

  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

  const [updateProfileError, setUpdateProfileError] = useState();

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

  const handleFormChange = async (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "phone") {
      const cleanPhoneNumber = value.replace(/-| |[(]|[)]/g, "");
      let formattedPhoneNumber = formatPhoneNumber(cleanPhoneNumber);
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else if (name === "mock_credit_card") {
      const cleanCreditCardNumber = value.replace(/-/g, "");
      console.log(cleanCreditCardNumber);
      let formattedCreditCardNumber = formatCreditCardNumber(
        cleanCreditCardNumber
      );
      console.log(formattedCreditCardNumber);
      setFormData({ ...formData, [name]: formattedCreditCardNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchProfileData = async () => {
    if (tokenData) {
      const url = `${baseUrl}/account/${tokenData.account.id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          first_name: tokenData.account.first_name,
          last_name: tokenData.account.last_name,
          email: tokenData.account.email,
          username: tokenData.account.username,
          avatar: data.avatar,
          phone: formatPhoneNumber(data.phone_number),
          biography: data.biography,
          interests: data.interests,
          location_id: data.location_id,
          mock_credit_card: formatCreditCardNumber(data.mock_credit_card),
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
    const url = `${baseUrl}/locations`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchCategories();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchProfileData();
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
      account_id: tokenData.account.id,
      avatar: formData.avatar,
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
      console.log(formattedFormData);
      const url = `${baseUrl}/account_details/${tokenData.account.id}`;
      const fetchConfig = {
        method: "put",
        body: JSON.stringify(formattedFormData),
        headers: {
          "Content-Type": "application/json",
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
                  <h1>Edit my profile</h1>
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
                      required
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
                  <div className="form-floating mb-3">
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
                    <label htmlFor="location_id">Address</label>
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
