import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async () => {
    if (!name) return;

    try {
      await API.post("/categories", {
        name,
      });

      setName("");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">
        <h2>Category Management</h2>

        <button
          className="btn btn-dark"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>
      </div>

      <div className="card shadow p-4">

        <div className="input-group mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={addCategory}
          >
            Add Category
          </button>

        </div>

        <ul className="list-group">

          {categories.map((cat) => (
            <li
              key={cat._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {cat.name}

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  deleteCategory(cat._id)
                }
              >
                Delete
              </button>

            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}

export default Categories;
