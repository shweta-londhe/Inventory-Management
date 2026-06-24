/*import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ManagerDashboard() {
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchProducts();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get(
        "/dashboard/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      <Navbar />

      <div className="container-fluid p-4 bg-light min-vh-100">

        <div className="mb-4">
          <h1 className="fw-bold">
            Manager Dashboard
          </h1>

          <p className="text-muted">
            Inventory Monitoring &
            Stock Management
          </p>
        </div>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Products</h6>

                <h2 className="fw-bold text-primary">
                  {stats.totalProducts || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Stock</h6>

                <h2 className="fw-bold text-success">
                  {stats.totalStock || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Low Stock</h6>

                <h2 className="fw-bold text-warning">
                  {stats.lowStockCount || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Out Of Stock</h6>

                <h2 className="fw-bold text-danger">
                  {stats.outOfStockCount || 0}
                </h2>
              </div>
            </div>
          </div>

        </div>


        <div className="row">

          <div className="col-md-6 mb-4">

            <div className="card shadow border-0">

              <div className="card-body">

                <h4 className="text-warning">
                  ⚠ Low Stock Products
                </h4>

                <hr />

                {stats.lowStockProducts
                  ?.length > 0 ? (
                  stats.lowStockProducts.map(
                    (product) => (
                      <div
                        key={product._id}
                        className="d-flex justify-content-between border-bottom py-2"
                      >
                        <span>
                          {product.name}
                        </span>

                        <span className="badge bg-warning text-dark">
                          {product.stock}
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

          <div className="col-md-6 mb-4">

            <div className="card shadow border-0">

              <div className="card-body">

                <h4 className="text-danger">
                  ❌ Out Of Stock Products
                </h4>

                <hr />

                {stats.outOfStockProducts
                  ?.length > 0 ? (
                  stats.outOfStockProducts.map(
                    (product) => (
                      <div
                        key={product._id}
                        className="border-bottom py-2"
                      >
                        {product.name}
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

        <div className="card shadow border-0">

          <div className="card-body">

            <h3 className="mb-4">
              Product Inventory
            </h3>

            <div className="table-responsive">

              <table className="table table-hover">

                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map(
                    (product) => (
                      <tr
                        key={product._id}
                      >
                        <td>
                          {product.name}
                        </td>

                        <td>
                          {
                            product.category
                              ?.name
                          }
                        </td>

                        <td>
                          ₹{product.price}
                        </td>

                        <td>
                          {product.stock}
                        </td>

                        <td>

                          {product.stock ===
                          0 ? (
                            <span className="badge bg-danger">
                              Out Of Stock
                            </span>
                          ) : product.stock <=
                            5 ? (
                            <span className="badge bg-warning text-dark">
                              Low Stock
                            </span>
                          ) : (
                            <span className="badge bg-success">
                              In Stock
                            </span>
                          )}

                        </td>
                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ManagerDashboard;*/

import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

/* ─── design tokens ──────────────────────────────────────────────────────── */
const T = {
  bg:       "#0f172a",
  surface:  "#1e293b",
  surfaceHi:"#263348",
  border:   "rgba(255,255,255,0.07)",
  muted:    "#64748b",
  text:     "#e2e8f0",
  textSub:  "#94a3b8",
  indigo:   ["#6366f1","#4f46e5"],
  emerald:  ["#10b981","#059669"],
  amber:    ["#f59e0b","#d97706"],
  rose:     ["#f43f5e","#e11d48"],
  sky:      ["#0ea5e9","#0284c7"],
};

/* ─── injected global styles ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .mgr-wrap * { box-sizing: border-box; }
  .mgr-wrap { font-family: 'Inter', system-ui, sans-serif; background: ${T.bg}; min-height: 100vh; color: ${T.text}; }

  /* stat cards */
  .mgr-card { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 14px; padding: 20px 22px; transition: transform .22s ease, box-shadow .22s ease, background .22s ease; cursor: default; position: relative; overflow: hidden; }
  .mgr-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
  .mgr-card-indigo:hover  { background: linear-gradient(135deg,${T.indigo[0]},${T.indigo[1]}); }
  .mgr-card-emerald:hover { background: linear-gradient(135deg,${T.emerald[0]},${T.emerald[1]}); }
  .mgr-card-amber:hover   { background: linear-gradient(135deg,${T.amber[0]},${T.amber[1]}); }
  .mgr-card-rose:hover    { background: linear-gradient(135deg,${T.rose[0]},${T.rose[1]}); }
  .mgr-card-sky:hover     { background: linear-gradient(135deg,${T.sky[0]},${T.sky[1]}); }

  .mgr-card-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: ${T.textSub}; margin: 0 0 8px; }
  .mgr-card-value { font-size: 34px; font-weight: 800; margin: 0; line-height: 1; color: #fff; }

  .mgr-icon-box { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }

  /* glass panel */
  .mgr-panel { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 14px; padding: 22px; }

  /* table */
  .mgr-table { width: 100%; border-collapse: collapse; }
  .mgr-table thead tr { background: rgba(255,255,255,0.04); }
  .mgr-table th { padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .9px; color: ${T.muted}; border-bottom: 1px solid ${T.border}; }
  .mgr-table td { padding: 13px 14px; font-size: 13px; color: ${T.textSub}; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .mgr-table tbody tr:hover td { background: rgba(255,255,255,0.03); color: ${T.text}; }
  .mgr-table tbody tr:last-child td { border-bottom: none; }

  /* badges */
  .mgr-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; }
  .mgr-badge-green  { background: rgba(16,185,129,.14); color: #34d399; }
  .mgr-badge-yellow { background: rgba(245,158,11,.14); color: #fbbf24; }
  .mgr-badge-red    { background: rgba(244,63,94,.14);  color: #fb7185; }

  /* alert rows */
  .mgr-alert-row { display: flex; justify-content: space-between; align-items: center; padding: 11px 0; border-bottom: 1px solid ${T.border}; font-size: 13px; color: ${T.textSub}; }
  .mgr-alert-row:last-child { border-bottom: none; }
  .mgr-alert-row span.name { color: ${T.text}; font-weight: 500; }

  /* section header */
  .mgr-section-hd { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .mgr-section-hd-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
  .mgr-section-hd h5 { margin: 0; font-size: 15px; font-weight: 700; color: #fff; }
  .mgr-section-hd p  { margin: 0; font-size: 11px; color: ${T.muted}; }

  /* progress bar */
  .mgr-progress-track { height: 6px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; }
  .mgr-progress-fill  { height: 100%; border-radius: 99px; transition: width 1s ease; }

  /* divider */
  .mgr-divider { border: none; border-top: 1px solid ${T.border}; margin: 16px 0; }

  /* responsive */
  @media (max-width: 768px) {
    .mgr-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
    .mgr-grid-2 { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .mgr-grid-4 { grid-template-columns: 1fr !important; }
  }
`;

/* ─── tiny helpers ───────────────────────────────────────────────────────── */
const fmt = (n) => (n ?? 0).toLocaleString("en-IN");

function SectionHeader({ icon, title, sub, iconBg }) {
  return (
    <div className="mgr-section-hd">
      <div className="mgr-section-hd-icon" style={{ background: iconBg }}>{icon}</div>
      <div>
        <h5>{title}</h5>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, colorClass, iconBg, iconColor }) {
  return (
    <div className={`mgr-card ${colorClass}`}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <p className="mgr-card-label">{label}</p>
          <p className="mgr-card-value">{fmt(value)}</p>
        </div>
        <div className="mgr-icon-box" style={{ background: iconBg, color: iconColor, fontSize: 20 }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
function ManagerDashboard() {
  const [stats, setStats]       = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchProducts();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* derived */
  const totalItems   = stats.totalProducts   || 0;
  const totalStock   = stats.totalStock      || 0;
  const lowCount     = stats.lowStockCount   || 0;
  const outCount     = stats.outOfStockCount || 0;
  const lowProds     = stats.lowStockProducts    || [];
  const outProds     = stats.outOfStockProducts  || [];
  const healthyCount = totalItems - lowCount - outCount;
  const healthPct    = totalItems > 0 ? Math.round((healthyCount / totalItems) * 100) : 0;
  const healthColor  = healthPct >= 70 ? T.emerald[0] : healthPct >= 40 ? T.amber[0] : T.rose[0];
  const healthLabel  = healthPct >= 70 ? "Healthy" : healthPct >= 40 ? "Moderate" : "Critical";

  const stockBadge = (stock) => {
    if (stock === 0)  return <span className="mgr-badge mgr-badge-red"><span style={{width:5,height:5,borderRadius:"50%",background:"#f43f5e",display:"inline-block"}}/>Out of Stock</span>;
    if (stock <= 5)   return <span className="mgr-badge mgr-badge-yellow"><span style={{width:5,height:5,borderRadius:"50%",background:"#f59e0b",display:"inline-block"}}/>Low Stock</span>;
    return             <span className="mgr-badge mgr-badge-green"><span style={{width:5,height:5,borderRadius:"50%",background:"#10b981",display:"inline-block"}}/>In Stock</span>;
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar />

      <div className="mgr-wrap">
        <div style={{ maxWidth: 1320, margin:"0 auto", padding:"28px 20px" }}>

          {/* ── Page header ── */}
          <div style={{
            background: `linear-gradient(135deg, ${T.surface} 0%, rgba(99,102,241,0.10) 60%, ${T.surface} 100%)`,
            border: `1px solid ${T.border}`,
            borderRadius: 18, padding: "24px 28px", marginBottom: 28,
            position:"relative", overflow:"hidden"
          }}>
            {/* ambient glow */}
            <div style={{ position:"absolute", right:40, top:-50, width:200, height:200, borderRadius:"50%", background:`radial-gradient(${T.indigo[0]}20, transparent 70%)`, pointerEvents:"none" }} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
              <div>
                <span style={{ fontSize:11, fontWeight:600, color:T.indigo[0], textTransform:"uppercase", letterSpacing:1.2 }}>Inventory Management</span>
                <h1 style={{ margin:"6px 0 4px", fontSize:24, fontWeight:800, color:"#fff" }}>Manager Dashboard</h1>
                <p style={{ margin:0, fontSize:13, color:T.muted }}>Read-only monitoring · Inventory &amp; Stock Overview</p>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {outCount > 0 && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, fontSize:11, fontWeight:600, background:"rgba(244,63,94,0.10)", color:T.rose[0], border:`1px solid rgba(244,63,94,0.22)` }}>
                    ✕ {outCount} Out of Stock
                  </span>
                )}
                {lowCount > 0 && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, fontSize:11, fontWeight:600, background:"rgba(245,158,11,0.10)", color:T.amber[0], border:`1px solid rgba(245,158,11,0.22)` }}>
                    ⚠ {lowCount} Low Stock
                  </span>
                )}
                <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, fontSize:11, fontWeight:600, background:"rgba(99,102,241,0.10)", color:T.indigo[0], border:`1px solid rgba(99,102,241,0.22)` }}>
                  🔒 Read-only
                </span>
              </div>
            </div>
          </div>

          {/* ── Stat cards ── */}
          <div className="mgr-grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
            <StatCard label="Total Products"  value={totalItems} icon="📦" colorClass="mgr-card-indigo"
              iconBg="rgba(99,102,241,0.15)"  iconColor={T.indigo[0]}  />
            <StatCard label="Total Stock"     value={totalStock} icon="🗃️" colorClass="mgr-card-emerald"
              iconBg="rgba(16,185,129,0.15)"  iconColor={T.emerald[0]} />
            <StatCard label="Low Stock Items" value={lowCount}   icon="⚠️" colorClass="mgr-card-amber"
              iconBg="rgba(245,158,11,0.15)"  iconColor={T.amber[0]}   />
            <StatCard label="Out of Stock"    value={outCount}   icon="🚫" colorClass="mgr-card-rose"
              iconBg="rgba(244,63,94,0.15)"   iconColor={T.rose[0]}    />
          </div>

          {/* ── Health bar ── */}
          <div className="mgr-panel" style={{ marginBottom:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg,${healthColor},${healthColor}aa)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🛡️</div>
                <div>
                  <p style={{ margin:0, fontSize:14, fontWeight:700, color:"#fff" }}>Inventory Health Score</p>
                  <p style={{ margin:0, fontSize:11, color:T.muted }}>{healthyCount} of {totalItems} products in healthy stock</p>
                </div>
              </div>
              <span style={{ fontSize:28, fontWeight:800, color:healthColor }}>{healthPct}%</span>
            </div>
            <div className="mgr-progress-track">
              <div className="mgr-progress-fill" style={{ width:`${healthPct}%`, background:`linear-gradient(90deg,${healthColor},${healthColor}bb)`, boxShadow:`0 0 10px ${healthColor}66` }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:11, color:T.muted }}>0% — Critical</span>
              <span style={{ fontSize:11, color:healthColor, fontWeight:600 }}>● {healthLabel}</span>
              <span style={{ fontSize:11, color:T.muted }}>100% — Optimal</span>
            </div>
          </div>

          {/* ── Low stock + Out of stock panels ── */}
          <div className="mgr-grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>

            {/* Low stock */}
            <div className="mgr-panel">
              <SectionHeader
                icon="⚠️"
                title="Low Stock Products"
                sub={`${lowProds.length} product${lowProds.length !== 1 ? "s" : ""} running critically low`}
                iconBg="rgba(245,158,11,0.15)"
              />
              {lowProds.length > 0 ? (
                lowProds.map((product) => (
                  <div key={product._id} className="mgr-alert-row">
                    <span className="name">{product.name}</span>
                    <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:12, color:T.muted }}>{product.stock} left</span>
                      <span className="mgr-badge mgr-badge-yellow">
                        <span style={{width:5,height:5,borderRadius:"50%",background:"#f59e0b",display:"inline-block"}}/>
                        Low
                      </span>
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding:"24px 0", textAlign:"center", color:T.muted, fontSize:13 }}>
                  ✅ No low stock products right now
                </div>
              )}
            </div>

            {/* Out of stock */}
            <div className="mgr-panel">
              <SectionHeader
                icon="🚫"
                title="Out of Stock Products"
                sub={`${outProds.length} product${outProds.length !== 1 ? "s" : ""} need immediate restocking`}
                iconBg="rgba(244,63,94,0.15)"
              />
              {outProds.length > 0 ? (
                outProds.map((product) => (
                  <div key={product._id} className="mgr-alert-row">
                    <span className="name">{product.name}</span>
                    <span className="mgr-badge mgr-badge-red">
                      <span style={{width:5,height:5,borderRadius:"50%",background:"#f43f5e",display:"inline-block"}}/>
                      Out of Stock
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding:"24px 0", textAlign:"center", color:T.muted, fontSize:13 }}>
                  ✅ All products are available
                </div>
              )}
            </div>

          </div>

          {/* ── Products table ── */}
          <div className="mgr-panel">
            <SectionHeader
              icon="📋"
              title="Product Inventory"
              sub={`${products.length} total products across all categories`}
              iconBg={`linear-gradient(135deg,${T.sky[0]},${T.sky[1]})`}
            />
            <div style={{ overflowX:"auto" }}>
              <table className="mgr-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign:"center", padding:"40px 0", color:T.muted }}>
                        No products found
                      </td>
                    </tr>
                  ) : products.map((product, i) => (
                    <tr key={product._id}>
                      <td style={{ color:T.muted, fontSize:11 }}>{String(i + 1).padStart(2, "0")}</td>
                      <td style={{ color:"#f1f5f9", fontWeight:500 }}>{product.name}</td>
                      <td>
                        <span style={{ padding:"3px 9px", background:"rgba(99,102,241,0.12)", color:T.indigo[0], borderRadius:5, fontSize:11, fontWeight:500 }}>
                          {product.category?.name || "—"}
                        </span>
                      </td>
                      <td style={{ color:T.emerald[0], fontWeight:600 }}>₹{fmt(product.price)}</td>
                      <td style={{ fontWeight:600, color: product.stock === 0 ? T.rose[0] : product.stock <= 5 ? T.amber[0] : T.text }}>
                        {fmt(product.stock)}
                      </td>
                      <td>{stockBadge(product.stock)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* footer */}
          <div style={{ marginTop:28, paddingTop:16, borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <span style={{ fontSize:11, color:T.muted }}>Inventory Management System · Manager View</span>
            <span style={{ fontSize:11, color:T.muted }}>Read-only access · No edit permissions</span>
          </div>

        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
