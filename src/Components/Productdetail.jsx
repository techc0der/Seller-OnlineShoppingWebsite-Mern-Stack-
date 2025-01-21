import React, { useEffect, useState } from 'react';
import { Navigate ,Link} from 'react-router-dom';

const Productdetail = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Get the product from localStorage
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!productData) {
      // If no product is found in localStorage, redirect to the home page or show an error
      window.location.href = '/'; // You can replace this with a redirection logic or error handling
    } else {
      setProduct(productData); // Set the product data to state
    }
  }, []);


  if (!product) {
    return <div>Loading...</div>; // Show loading state until the product is fetched from localStorage
  }

  return (
    <div className="z-10 bg-white/30 backdrop-blur-md flex justify-center w-screen">
      <div className="flex justify-center m-10 w-[100rem] gap-10 mb-52 relative">
        {/* Close Button */}
        <Link to='/myproduct'>
          <button
            className="absolute top-4 right-4 bg-transparent border-2 border-black text-black p-2 rounded-full w-8 h-8 flex justify-center items-center hover:bg-slate-300 hover:text-gray-800 transition-all ease-in-out duration-200 transform hover:scale-105"
          >
            <span className="text-2xl font-semibold">&times;</span> {/* The close '×' symbol */}
          </button>
        </Link>


        {/* Image Section */}
        <div className="w-[50%] flex justify-center mt-10">
          <img src={product.img} alt={product.name} className="h-[600px] rounded-3xl" />
        </div>

        {/* Product Details Section */}
        <div className="w-[50%] flex flex-col justify-center items-start gap-1">
          <h1 className="text-6xl py-20">{product.name}</h1>

          <p className="text-xl mb-4 w-[80%]"><strong>Description:</strong> {product.description}</p>
          {/* Product Size */}
          <p className="text-xl mb-2"><strong>Size:</strong> {product.size}</p>

          {/* Product Price */}
          <p className="text-xl mb-2"><strong>Price:</strong> ₹{product.price}</p>

          {/* Product Category */}
          <p className="text-xl mb-2"><strong>Category:</strong> {product.category}</p>

          {/* Product Stock */}
          {product.stock === 0 ? (
            <div className="bg-slate-400 text-white p-2 rounded mt-4">
              <strong>Out of Stock</strong>
            </div>
          ) : (
            <div className='' >
              <p className="text-xl mb-4"><strong>Stock Availability:</strong> {product.stock}</p>
              <div className="bg-yellow-300 w-[50%] text-center text-slate-700 p-2 rounded mt-4 hover:bg-yellow-400 ">
                <strong>Add to Cart</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Productdetail;
