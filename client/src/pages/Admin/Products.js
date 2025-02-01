import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // handle delete
  const handleDelete = async (pid) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/product/delete-product/${pid}`);
      if (data?.success) {
        toast.success("Product deleted successfully");
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting product");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="admin-title text-center mb-4">All Products List</h1>
            <div className="row">
              {products?.map((p) => (
                <div key={p._id} className="col-md-4 mb-4">
                  <div className="product-card">
                    <div className="product-image-container">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="product-image"
                        alt={p.name}
                      />
                    </div>
                    <div className="info-item">
                      <h5>{p.name}</h5>
                      <p>{p.description.substring(0, 30)}...</p>
                      <p>Price: ${p.price}</p>
                      <div className="d-flex gap-2">
                        <button 
                          className="admin-btn"
                          onClick={() => navigate(`/dashboard/admin/product/${p.slug}`)}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-btn"
                          onClick={() => handleDelete(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
