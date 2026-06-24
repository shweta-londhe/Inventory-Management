import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/dashboard/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Inventory Management Dashboard
          </h1>

          <p className="text-muted">
            Manage Products, Categories and Inventory
          </p>
        </div>

        {/* Statistics Cards */}

        <div className="row mb-4">

          <div className="col-md-3 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Total Products</h5>
                <h2>{stats.totalProducts || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Total Categories</h5>
                <h2>{stats.totalCategories || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Total Stock</h5>
                <h2>{stats.totalStock || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Low Stock</h5>
                <h2>{stats.lowStockCount || 0}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Second Row */}

        <div className="row mb-5">

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5>Out Of Stock</h5>
                <h2>{stats.outOfStockCount || 0}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Buttons */}

        <div className="text-center mb-5">

          <button
            className="btn btn-primary me-3"
            onClick={() =>
              navigate("/categories")
            }
          >
            Categories
          </button>

          <button
            className="btn btn-success me-3"
            onClick={() =>
              navigate("/products")
            }
          >
            Products
          </button>

          <button
            className="btn btn-dark"
            onClick={() =>
              navigate("/inventory")
            }
          >
            Inventory
          </button>

        </div>

        {/* Low Stock Products */}

        <div className="row">

          <div className="col-md-6 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h4 className="mb-3">
                  ⚠ Low Stock Products
                </h4>

                {stats.lowStockProducts?.length >
                0 ? (
                  stats.lowStockProducts.map(
                    (product) => (
                      <div
                        key={product._id}
                        className="border-bottom py-2"
                      >
                        <strong>
                          {product.name}
                        </strong>

                        <span className="ms-2 text-danger">
                          ({product.stock} left)
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No Low Stock Products
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* Out Of Stock Products */}

          <div className="col-md-6 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h4 className="mb-3">
                  ❌ Out Of Stock Products
                </h4>

                {stats.outOfStockProducts
                  ?.length > 0 ? (
                  stats.outOfStockProducts.map(
                    (product) => (
                      <div
                        key={product._id}
                        className="border-bottom py-2"
                      >
                        <strong>
                          {product.name}
                        </strong>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No Out Of Stock Products
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;