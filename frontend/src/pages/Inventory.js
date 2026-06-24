import { useEffect, useState } from "react";
import API from "../services/api";

function Inventory() {
  const [products, setProducts] =
    useState([]);

  const [logs, setLogs] =
    useState([]);

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [action, setAction] =
    useState("IN");

  useEffect(() => {
    fetchProducts();
    fetchLogs();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        "/products"
      );

      setProducts(
        res.data.products || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await API.get(
        "/inventory/logs"
      );

      setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateInventory =
    async () => {
      try {
        const endpoint =
          action === "IN"
            ? "/inventory/stock-in"
            : "/inventory/stock-out";

        const res =
          await API.post(
            endpoint,
            {
              productId,
              quantity,
            }
          );

        alert(res.data.message);

        setQuantity("");

        fetchProducts();
        fetchLogs();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Operation Failed"
        );
      }
    };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Inventory Management
      </h2>

      <div className="card shadow p-4 mb-5">

        <h4 className="mb-3">
          Update Stock
        </h4>

        <div className="mb-3">
          <label>
            Select Product
          </label>

          <select
            className="form-select"
            value={productId}
            onChange={(e) =>
              setProductId(
                e.target.value
              )
            }
          >
            <option value="">
              Select Product
            </option>

            {products.map(
              (product) => (
                <option
                  key={product._id}
                  value={
                    product._id
                  }
                >
                  {product.name}
                  {" | Stock: "}
                  {product.stock}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-3">
          <label>
            Action
          </label>

          <select
            className="form-select"
            value={action}
            onChange={(e) =>
              setAction(
                e.target.value
              )
            }
          >
            <option value="IN">
              Stock In
            </option>

            <option value="OUT">
              Stock Out
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label>
            Quantity
          </label>

          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={
            updateInventory
          }
        >
          Update Inventory
        </button>

      </div>

      <div className="card shadow p-4">

        <h4 className="mb-3">
          Inventory Activity
        </h4>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Updated By</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>
                  {
                    log.product
                      ?.name
                  }
                </td>

                <td>
                  {
                    log.transactionType
                  }
                </td>

                <td>
                  {log.quantity}
                </td>

                <td>
                  {
                    log.updatedBy
                      ?.name
                  }
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;