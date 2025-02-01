import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../styles/Homepage.css";
import { useWishlist } from "../context/wishlist";  // Add this import

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();  // Add this line
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    prices: [],
    ratings: [],
    discounts: []
  });

  const filterGroups = {
    ratings: [
      { value: "4", label: "4★ & above" },
      { value: "3", label: "3★ & above" },
      { value: "2", label: "2★ & above" }
    ],
    discounts: [
      { value: "10", label: "10% or more" },
      { value: "25", label: "25% or more" },
      { value: "50", label: "50% or more" }
    ]
  };

  const handleFilterChange = (group, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [group]: checked 
        ? [...prev[group], value]
        : prev[group].filter(item => item !== value)
    }));
  };

  const isProductVisible = (product) => {
    // Category filter (OR within group)
    const categoryMatch = filters.categories.length === 0 || 
      filters.categories.includes(product.category);

    // Price filter (OR within group)
    const priceMatch = filters.prices.length === 0 ||
      filters.prices.some(range => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });

    // Rating filter (OR within group)
    const ratingMatch = filters.ratings.length === 0 ||
      filters.ratings.some(rating => product.rating >= Number(rating));

    // Discount filter (OR within group)
    const discountMatch = filters.discounts.length === 0 ||
      filters.discounts.some(discount => product.discount >= Number(discount));

    // AND logic across groups
    return categoryMatch && priceMatch && ratingMatch && discountMatch;
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const truncateText = (text, limit = 60) => {
    if (text?.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          {/* Ratings */}
          <div className="filter-group">
            <h4>Ratings</h4>
            {filterGroups.ratings.map((rating) => (
              <div className="filter-item" key={rating.value}>
                <input
                  type="checkbox"
                  name="rating"
                  value={rating.value}
                  onChange={(e) => handleFilterChange('ratings', rating.value, e.target.checked)}
                />
                <label>{rating.label}</label>
              </div>
            ))}
          </div>

          {/* Discounts */}
          <div className="filter-group">
            <h4>Discounts</h4>
            {filterGroups.discounts.map((discount) => (
              <div className="filter-item" key={discount.value}>
                <input
                  type="checkbox"
                  name="discount"
                  value={discount.value}
                  onChange={(e) => handleFilterChange('discounts', discount.value, e.target.checked)}
                />
                <label>{discount.label}</label>
              </div>
            ))}
          </div>

          <button
            className="btn btn-danger"
            onClick={() => setFilters({
              categories: [],
              prices: [],
              ratings: [],
              discounts: []
            })}
          >
            Reset Filters
          </button>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.filter(isProductVisible).map((p) => (
              <div className="card" key={p._id}>
                <div className="image-container">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <button
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(p._id);
                    }}
                  >
                    {isInWishlist(p._id) ? (
                      <AiFillHeart className="heart-icon active" />
                    ) : (
                      <AiOutlineHeart className="heart-icon" />
                    )}
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{truncateText(p.name, 30)}</h5>
                    <h5 className="card-price">
                      {p.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {truncateText(p.description)}
                  </p>
                  <div className="d-flex flex-column gap-2">
                    <button
                      className="btn btn-more-details"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-add-cart"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
