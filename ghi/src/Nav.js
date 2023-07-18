import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from "./store/authApi";

function Nav() {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();
  const [logout, logoutResult] = useLogoutMutation();

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
          <NavLink to="/login">
            <button className="btn btn-success">Login</button>
          </NavLink>
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
