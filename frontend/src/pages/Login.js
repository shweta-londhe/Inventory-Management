import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
e.preventDefault();
try {
  const res = await API.post("/auth/login", {
    email,
    password,
  });

  const role = res.data.role;

console.log("Role from API:", role);

localStorage.setItem("token", res.data.token);
localStorage.setItem("role", role);

alert("Login Successful");

if (role?.toLowerCase() === "admin") {
  navigate("/admin");
}
else if (role?.toLowerCase() === "storemanager") {
  navigate("/manager");
}
else {
  console.log("Unknown Role:", role);
}

} catch (error) {
  console.log(error);

  alert(
    error.response?.data?.message ||
    "Login Failed"
  );
}

};

return ( <div className="container">
  <div
    className="row justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >

    <div className="col-md-4">

      <div className="card shadow-lg border-0">

        <div className="card-body p-4">

          <h2 className="text-center mb-4">
            Inventory Management
          </h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>

  </div>

</div>

);
}

export default Login;
