import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/user";
import { toast } from "react-toastify";

function RegisterUser() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onCancel = () => {
    navigate("/login");
  };

  const isValidEmail = () => {
    return email.includes("@");
  };

  const onRegister = async () => {
    console.log("onRegister");

    // client side validation
    if (Name.length === 0) {
      toast.warning("enter name");
    } else if (email.length === 0) {
      toast.warning("enter email");
    } else if (!isValidEmail()) {
      toast.warning("Email is not valid");
    } else if (password.length === 0) {
      toast.warning("enter password");
    } else if (confirmPassword.length === 0) {
      toast.warning("confirm password");
    } else if (password !== confirmPassword) {
      toast.warning("password does not match");
    } else {
      // make the API call and receive the result
      const result = await register(Name, email, password);
      if (result["status"] === "success") {
        toast.success("successfully registered a user");
        navigate("/login");
      } else {
        toast.error("Failed to register the user");
      }
    }
  };

  return (
    <div class="signup-window">
      <div class="signup-header">
        <h2 className="page-title">Register</h2>
        <h2>Create New Account</h2>
        <p>Sign up today on Medico and enjoy shopping!</p>

        <div className="row mt-5" class="signup-form">
          <div className="col-2"></div>

          <div className="col">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="">Name</label>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="">Password</label>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="">Confirm Password</label>
                      <input
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        type="password"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="mb-3" class="login-link">
                      Already have account ? <Link to="/login">Login here</Link>
                    </div>

                    <button class="signup-btn" onClick={onRegister}>
                      Register
                    </button>
                    <button class="signup-cancel" onClick={onCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
