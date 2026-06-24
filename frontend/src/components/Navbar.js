import { Link, useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();

const role = localStorage.getItem("role");

const logout = () => {
localStorage.clear();
navigate("/");
};

return ( <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow"> <div className="container">
    <Link
      className="navbar-brand fw-bold"
      to={
        role === "admin"
          ? "/admin"
          : "/manager"
      }
    >
      Inventory Management
    </Link>

    <div>

      {role === "admin" && (
        <>
          <Link
            className="btn btn-outline-light me-2"
            to="/admin"
          >
            Dashboard
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/categories"
          >
            Categories
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/products"
          >
            Products
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/inventory"
          >
            Inventory
          </Link>
        </>
      )}

      {role === "storeManager" && (
        <>
          <Link
            className="btn btn-outline-info me-2"
            to="/manager"
          >
            Dashboard
          </Link>

        </>
      )}

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  </div>
</nav>

);
}

export default Navbar;
