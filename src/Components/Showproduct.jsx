import React, { useState, useContext } from 'react'
import { active } from '../Context/context'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Showproduct = ({ editproduct, seteditproduct }) => {
  const navigate = useNavigate();
  const { myproduct, setmyproduct } = useContext(active);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [price, setprice] = useState();
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [search, setsearch] = useState('');
  const [Er, setEr] = useState('');
  const [der, setder] = useState(false);

  const filterSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (price) params.set('price', price);
    if (rating) params.set('rating', rating);
    if (category != 'all category' && category) params.set('category', category);
    if (search) params.set('search', search);
    console.log(params.toString());
    fetch(`https://backend-onlineshoppingwebsite-mern-stack.onrender.com/product/filter/seller?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Pass the token in Authorization header
      }
    })
      .then(response => response.json())
      .then(data => {
        setmyproduct(data)
        console.log(data);
      })
      .catch(err => console.log(err))
  };
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const ondelete = async (productid) => {
    const deleteproduct = new URLSearchParams();
    if (productid) deleteproduct.set('product_id', productid);
    const token = Cookies.get('token');
    try {
      const response = await fetch(`https://backend-onlineshoppingwebsite-mern-stack.onrender.com/product/seller/delete?${deleteproduct.toString()}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Pass the token in Authorization header
        }
      });
      const data = await response.json();
      if (data.msg == 'Product deleted successfully') {
        navigate('/myproduct');
      } else {
        console.error('Error:', data.msg);
      }
      //console.log(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
  

  const handleProductClick = (product) => {
    // Save product to localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Update the product details in context (if needed)
    //updateProductDetails(product);
  };

  const editproductfun = (product) => {
    navigate('/editproduct');
    seteditproduct(product);
  }

  return (
    <nav className='flex justify-center w-100vw ' >
      <div className='w-[100rem] px-[6vw] relative flex mb-28'>
        <div className='flex justify-between w-full relative '>
          {/* Filter Button */}
          <button
            className="fixed top-28 left-6 bg-[#3b5d50] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2f483e] transition-all"
            onClick={toggleFilter}
          >
            Filter
          </button>

          {/* Filter Table */}
          <div
            className={`fixed z-10 w-64 ml-10 bg-white shadow-lg rounded-lg transform overflow-hidden ${isFilterOpen ? "max-h-screen" : "max-h-0"} transition-all duration-500 ease-in-out`}
            id="filter_table"
          >
            <form className="p-4 flex flex-col gap-4" onSubmit={filterSubmit}>
              <h1 className="text-xl font-semibold text-gray-800 border-b pb-3">Filters</h1>

              {/* Rating Filter */}
              <div className="flex flex-col gap-2" id="Rating_f ">
                <label htmlFor="rating" className="text-md text-gray-700">Rating</label>
                <div className='flex justify-between items-center'>
                  <select
                    name="rating"
                    id="rating"
                    defaultValue=""
                    className="p-2  bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">Select Rating</option>
                    <option value="1" className="text-black">1 Star</option>
                    <option value="2" className="text-black">2 Star</option>
                    <option value="3" className="text-black">3 Star</option>
                    <option value="4" className="text-black">4 Star</option>
                    <option value="5" className="text-black">5 Star</option>
                  </select>
                  <input
                    type="text"
                    className='text-end border w-10 h-5 p-1 rounded-md'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>

              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col gap-2" id="price_range">
                <div className='flex justify-between text-md text-gray-700'>

                  <h1 className="text-md text-gray-700">Price Range</h1>
                  <input
                    type="text"
                    className='text-end border w-20 rounded-md'
                    value={`₹ ${price}`}
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
                <input
                  type="range"
                  id="price"
                  name="price"
                  min="1"
                  max="1000000"
                  step="100"
                  onChange={(e) => setprice(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3b5d50]"
                />
                <div className="flex justify-between w-full text-sm text-gray-500">
                  <span>₹1</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col gap-2" id="Category_f">
                <label htmlFor="category" className="text-md text-gray-700">Category</label>
                <select
                  name="category"
                  id="category"
                  defaultValue="hello"
                  onChange={(e) => setCategory(e.target.value)}

                  className="p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
                >
                  <option value="" disabled className="text-gray-400">Select Category</option>
                  <option value="Modern Sofa" className="text-black">Modern Sofa</option>
                  <option value="Dining Table" className="text-black">Dining Table</option>
                  <option value="Office Chair" className="text-black">Office Chair</option>
                  <option value="Wooden Bed" className="text-black">Wooden Bed</option>
                  <option value="Coffee Table" className="text-black">Coffee Table</option>
                  <option value="Recliner Sofa" className="text-black">Recliner Sofa</option>
                  <option value="Wardrobe" className="text-black">Wardrobe</option>
                  <option value="Bookshelf" className="text-black">Bookshelf</option>
                  <option value="Shoe Rack" className="text-black">Shoe Rack</option>
                  <option value="TV Stand" className="text-black">TV Stand</option>
                  <option value="all category" className="text-black">All Category</option>

                </select>
              </div>

              {/* Apply Filter Button */}
              <button
                className="bg-[#3b5d50] w-fit text-white py-2 px-5 rounded-full hover:bg-[#2e4a3b] transition-colors duration-300"
                onClick={filterSubmit}
              >
                Apply Filters
              </button>

              {/* Close Button */}
              <button
                className="text-sm text-gray-500 hover:text-gray-800 mt-4 self-end"
                onClick={toggleFilter}
              >
                Close
              </button>
            </form>
          </div>
          <div className='w-full flex flex-col py-10 '>

            <form className='w-100% flex justify-center' onSubmit={filterSubmit}>

              <input type="text" className='p-3 w-1/3  placeholder-text-slate-400 border-2 border-gray-300 rounded-lg bg-transparent' placeholder="Enter Product name" onChange={(e) => setsearch(e.target.value)} />
            </form>
            {!der ?
              <div className=' flex flex-wrap justify-center mt-16 gap-5'>
                {
                  myproduct.map((product, index) => (
                    <div key={index} className=' w-60 mx-5 p-5 rounded-xl flex flex-col items-center gap-1 overflow-hidden relative' id='product'>
                      {product.rating && product.rating.length > 0 &&
                        <div className='absolute bg-blue-100 right-0 z-[1] top-20
    rounded-full px-2 text-blue-900'>
                          Rating: {product.rating}
                        </div>
                      }
                      <img src={product.img} className='rounded-2xl w-[80%] ' id="product_image" alt="" />

                      <h1 className='text-xl font-medium text-center mt-5'>{product.name}</h1>
                      <h1 className='text-2xl font-bold'>₹{product.price}</h1>
                      <div className='flex w-full justify-between'>

                        <button className="p-2 w-14 rounded-xl border border-slate-400 text-slate-700 hover:bg-indigo-100 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 active:bg-indigo-300" id="add_button" onClick={() => editproductfun(product)}>
                          Edit
                        </button>
                        <Link to='/productdetail' >
                          <button className="p-2 w-14 rounded-xl border border-slate-400 text-slate-700 hover:bg-green-100 hover:border-green-700 hover:text-green-700 active:bg-green-300 transition-all duration-300" onClick={() => handleProductClick(product)}>
                            View
                          </button>
                        </Link>
                        <button className="p-2 w-14 rounded-xl border border-slate-400 text-slate-700 hover:bg-red-100 hover:border-red-600 hover:text-red-600 transition-all duration-300 active:bg-red-300" onClick={() => ondelete(product._id)}>
                          Delete
                        </button>

                      </div>
                      <div className="absolute bottom-0 bg-[#DCE5E4]" id="hidden-bg"></div>
                    </div>
                  ))
                }
              </div> :
              <div className='flex w-full mt-48 justify-center items-center'>
                <h1 className='text-5xl font-semibold break-words w-[350px] text-center leading-snug text-emerald-800'>{Er}</h1>
              </div>
            }

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Showproduct