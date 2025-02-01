import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";  // Fixed import path

const AdminDashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  return (
    <Layout title="Admin Dashboard - ShopSphere">
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin-info-card p-4">
              <h2 className="admin-title">Admin Information</h2>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{auth?.user?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{auth?.user?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Contact:</span>
                <span className="info-value">{auth?.user?.phone}</span>
              </div>
              <div className="admin-actions">
                <button 
                  className="admin-btn"
                  onClick={() => navigate("/dashboard/admin/create-product")}
                >
                  Create Product
                </button>
                <button 
                  className="admin-btn"
                  onClick={() => navigate("/dashboard/admin/products")}
                >
                  Manage Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
