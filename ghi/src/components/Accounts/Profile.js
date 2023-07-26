import { useState, useEffect } from "react";
import { useGetTokenQuery, useLogoutMutation } from "../../store/authApi";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";

function Profile() {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();

  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

  const [profileDetails, setProfileDetails] = useState({
    id: "",
    account_id: "",
    avatar: "",
    phone_number: "",
    biography: "",
    mock_credit_card: "",
    interests: "",
    location_id: "",
    interest_name: "",
    location_name: "",
    location_address: "",
    location_city: "",
    location_state: "",
    location_zip_code: "",
    location_latitude: "",
    location_longitude: "",
  });

  const fetchData = async () => {
    if (tokenData) {
      const url = `${baseUrl}/account/${tokenData.account.id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProfileDetails(data);
      }
    } else {
      setProfileDetails({
        id: "",
        account_id: "",
        avatar: "",
        phone_number: "",
        biography: "",
        mock_credit_card: "",
        interests: "",
        location_id: "",
        interest_name: "",
        location_name: "",
        location_address: "",
        location_city: "",
        location_state: "",
        location_zip_code: "",
        location_latitude: "",
        location_longitude: "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [tokenData]);

  useEffect(() => {
    fetchData();
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    const formattedPhoneNumber = String(phoneNumber).split("");
    formattedPhoneNumber.splice(0, 0, "(");
    formattedPhoneNumber.splice(4, 0, ") ");
    formattedPhoneNumber.splice(8, 0, "-");
    return formattedPhoneNumber;
  };

  const formatCreditCardNumber = (creditCardNumber) => {
    const lastFour = creditCardNumber.slice(-4);
    return `*${lastFour}`;
  };

  const googleMapsLink = () => {
    if (profileDetails.location_address) {
      const address = profileDetails.location_address.split(" ").join("+");
      const city = profileDetails.location_city;
      const state = profileDetails.location_state;
      const zip_code = profileDetails.location_zip_code;
      return `https://www.google.com/maps/place/${address},+${city},+${state}+${zip_code}/`;
    }
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    navigate("/profile/edit");
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
            <div className="row mt-3 mx-1">
              <div style={{ textAlign: "right" }}>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col m-3" style={{ maxWidth: "200px" }}>
                <div className="mb-4">
                  <img
                    className="rounded-circle"
                    height="150px"
                    src={profileDetails.avatar}
                  ></img>
                </div>
                <div>
                  <h3 className="pb-0 mb-0">
                    {tokenData.account.first_name} {tokenData.account.last_name}
                  </h3>
                  <p>@{tokenData.account.username}</p>
                </div>
              </div>
              <div className="col m-3">
                <div>
                  <div className="card mb-3" style={{ minWidth: "487px" }}>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Contact Info
                      </h6>
                      <div className="row mx-1">
                        <div className="ps-1 pe-0" style={{ maxWidth: "98px" }}>
                          <h6 className="card-text m-1">Email</h6>
                        </div>
                        <div className="col">
                          <p className="card-text m-1">
                            {tokenData.account.email}
                          </p>
                        </div>
                      </div>
                      <div className="row mx-1">
                        <div className="ps-1 pe-0" style={{ maxWidth: "98px" }}>
                          <h6 className="card-text m-1">Phone</h6>
                        </div>
                        <div className="col">
                          <p type="tel" className="card-text m-1">
                            {formatPhoneNumber(profileDetails.phone_number)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3" style={{ minWidth: "487px" }}>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Personal Info
                      </h6>
                      <div className="row mx-1">
                        <div className="ps-1 pe-0" style={{ maxWidth: "98px" }}>
                          <h6 className="card-text m-1">Interests</h6>
                        </div>
                        <div className="col">
                          <p className="card-text m-1">
                            {profileDetails.interest_name}
                          </p>
                        </div>
                      </div>
                      <div className="row mx-1">
                        <div className="ps-1 pe-0" style={{ maxWidth: "98px" }}>
                          <h6 className="card-text m-1">Biography</h6>
                        </div>
                        <div className="col">
                          <p className="card-text m-1">
                            {profileDetails.biography}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3" style={{ minWidth: "487px" }}>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Payment Info
                      </h6>
                      <div className="row mx-1">
                        <div className="ps-1 pe-0" style={{ maxWidth: "98px" }}>
                          <h6 className="card-text m-1">Credit Card</h6>
                        </div>
                        <div className="col">
                          <p className="card-text m-1">
                            {formatCreditCardNumber(
                              profileDetails.mock_credit_card
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="row mx-1">
                        <div className="ps-1 pe-0" style={{ maxWidth: "98px" }}>
                          <h6 className="card-text m-1">Address</h6>
                        </div>
                        <div className="col">
                          <p className="card-text m-1">
                            <a href={googleMapsLink()} target="_blank">
                              {profileDetails.location_name}:{" "}
                              {profileDetails.location_city},{" "}
                              {profileDetails.location_state}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            id="errorMessage"
            className="alert alert-danger text-center mt-4 mx-4"
            role="alert"
          >
            Please login to view your profile.
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
