import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] =
    useState("");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    try {
      await API.post("/products", {
        name,
        description,
        price,
        stock,
        category,
      });

      alert("Product Added Successfully");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      fetchProducts();

      alert("Product Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">
        <h2>Product Management</h2>

        <button
          className="btn btn-dark"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>
      </div>

      <div className="card shadow p-4 mb-5">

        <h4 className="mb-3">
          Add Product
        </h4>

        <input
          className="form-control mb-3"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <select
          className="form-select mb-3"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary"
          onClick={addProduct}
        >
          Add Product
        </button>

      </div>

      <div className="row">

        {products.map((product) => (
          <div
            className="col-md-4 mb-4"
            key={product._id}
          >
            <div className="card shadow h-100">
              <div className="card-body">

                <h4>
                  {product.name}
                </h4>

                <p>
                  {product.description}
                </p>

                <p>
                  <strong>Price:</strong>
                  {" "}
                  ₹{product.price}
                </p>

                <p>
                  <strong>Stock:</strong>
                  {" "}
                  {product.stock}
                </p>

                <p>
                  <strong>Category:</strong>
                  {" "}
                  {product.category?.name}
                </p>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deleteProduct(
                      product._id
                    )
                  }
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Products;