import { useLoginMutation, useLogoutMutation } from "./store/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [login, loginResult] = useLoginMutation();
  const [logout, logoutResult] = useLogoutMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    e.target.reset();
  };

  if (loginResult.isSuccess) {
    navigate("/");
  } else if (loginResult.isError) {
    // We need to update this to actually present the login error to the user
    // and prompt retry
    setErrorMessage(loginResult.error);
    navigate("/");
  }

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
