import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts, STATUSES } from "../store/productSlilce";

const Products = () => {
  // const [products, setProducts] = useState([]);
  const { data: products, status } = useSelector((state) => state.product);
   console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());

    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);

  const handleProduct = (product) => {
    dispatch(add(product));
  };

  if(status === STATUSES.LOADING){
    return <h2>Loading....</h2>
  }

  if(status === STATUSES.ERROR){
    return <h2>Something went wrong</h2>
  }
  return (
    <div className="productsWrapper">
      {products?.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button className="btn" onClick={() => handleProduct(product)}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
