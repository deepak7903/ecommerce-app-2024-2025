import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import "../../styles/Orders.css";
import StatusDropdown from "../../components/StatusDropdown";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (newStatus, orderId) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: newStatus
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid orders-container">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="order-card" key={o._id}>
                <table className="table order-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        {auth?.user?.role === 1 ? (
                          <StatusDropdown 
                            status={o?.status} 
                            onChange={(value) => handleStatusChange(value, o._id)}
                          />
                        ) : (
                          o?.status
                        )}
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="order-product" key={p._id}>
                      <div className="product-image-container">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="product-image"
                          alt={p.name}
                        />
                      </div>
                      <div className="product-details">
                        <h5 className="product-name">{p.name}</h5>
                        <p className="product-description">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="product-price">
                          Price: ${p.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
