import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  useGetTokenQuery,
  useLoginMutation,
  useLogoutMutation,
} from "./store/authApi";

function Nav() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();
  const [login, loginResult] = useLoginMutation();
  const [logout, logoutResult] = useLogoutMutation();

  //   const loginModal = new bootstrap.Modal(
  //     document.getElementById("exampleModal"),
  //     {
  //       keyboard: false,
  //     }
  //   );
  //   const loginModal = document.getElementById("exampleModal");

  //   function handleCloseModal() {
  //     document.getElementById("exampleModal").classList.remove("show", "d-block");
  //     document
  //       .querySelectorAll(".modal-backdrop")
  //       .forEach((el) => el.classList.remove("modal-backdrop"));
  //   }

  //   function handleCloseModal() {
  //     const myModal = document.getElementById("exampleModal");
  //     myModal.classList.remove("show");
  //     myModal.classList.remove("fade");
  //   }

  const showLoginModal = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    handleCloseModal();
    e.target.reset();
  };

  return (
    <nav className="navbar bg-light navbar-light navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Plunge
        </NavLink>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="dropdown">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Browse By
          </button>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <NavLink>by Location</NavLink>
            </li>
            <li className="nav-item">
              <NavLink>by Category</NavLink>
            </li>
            <li className="nav-item">
              <NavLink>by Upcoming</NavLink>
            </li>
          </ul>
        </div>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <div id="login" className={tokenData ? "d-none" : ""}>
          <button
            className="btn btn-success"
            // data-bs-toggle="modal"
            // data-bs-target="#exampleModal"
            onClick={showLoginModal}
          >
            Login
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Login
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Username:</label>
                      <input
                        name="username"
                        type="text"
                        required
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password:</label>
                      <input
                        name="password"
                        type="password"
                        required
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    id="submit"
                    onClick={handleSubmit}
                    className="btn btn-success"
                    data-bs-dismiss={tokenData ? "modal" : ""}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="logout" className={tokenData ? "" : "d-none"}>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
