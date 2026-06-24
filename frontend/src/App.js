import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";



import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/manager"
          element={<ManagerDashboard />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;