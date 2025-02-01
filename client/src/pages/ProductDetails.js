import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6 main-product-image">
          <div className="image-container">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="product-image"
              alt={product.name}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="col-md-6 product-details-info">
          <h2 className="mb-4">{product.name}</h2>
          <div className="product-price mb-3">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <p className="mb-3"><strong>Category:</strong> {product?.category?.name}</p>
          <p className="mb-4">{product.description}</p>
          <button className="btn btn-primary">
            <i className="fas fa-shopping-cart me-2"></i>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="row container similar-products">
        <h3 className="mb-4">Similar Products</h3>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="row">
          {relatedProducts?.map((p) => (
            <div className="col-md-3 mb-4" key={p._id}>
              <div className="card similar-product-card">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top similar-product-image"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text product-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
