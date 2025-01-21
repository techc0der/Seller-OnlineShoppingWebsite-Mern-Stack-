import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const navigate = useNavigate();
    const [productname, setproductname] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [img, setimg] = useState('');
    const [stock, setstock] = useState('');
    const [size, setsize] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const productData = {
        name: productname,
        price: parseFloat(price),
        description,
        category,
        img, // Base64 string
        stock,
        size,
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setimg(reader.result); // Set the Base64 string
            reader.readAsDataURL(file);
        }
    };

    const addproduct = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        await fetch('https://backend-onlineshoppingwebsite-mern-stack.onrender.com/product/seller/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'Product is saved') {
                    // Reset form fields after success
                    setproductname('');
                    setprice('');
                    setdescription('');
                    setcategory('');
                    setimg('');
                    setstock('');
                    setsize('');

                    // Show success notification
                    setNotification({ message: 'Product is saved!', type: 'success' });

                    // Hide notification after 3 seconds
                    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
                } else if(data.msg === 'Product is not saved'){
                    // Show failure notification
                    setNotification({ message: 'Failed to save product.', type: 'error' });
                    
                    // Hide notification after 3 seconds
                    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
                }
                console.log(data.msg);
            })
            .catch(console.error);
    };

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-[800px] p-10 my-10 bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>
                <form onSubmit={addproduct} className="space-y-4">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="product-name"
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="e.g., Boat Headphone"
                            onChange={(e) => setproductname(e.target.value)}
                            value={productname}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="e.g., Best product with premium build quality"
                            onChange={(e) => setdescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            className="w-full p-3 mt-1 border rounded-lg"
                            onChange={(e) => setcategory(e.target.value)}
                            value={category}
                            required
                        >
                            <option value="">Choose Category</option>
                            <option value="Modern Sofa">Modern Sofa</option>
                            <option value="Dining Table">Dining Table</option>
                            <option value="Office Chair">Office Chair</option>
                            <option value="Wooden Bed">Wooden Bed</option>
                            <option value="Coffee Table">Coffee Table</option>
                            <option value="Recliner Sofa">Recliner Sofa</option>
                            <option value="Wardrobe">Wardrobe</option>
                            <option value="Bookshelf">Bookshelf</option>
                            <option value="Shoe Rack">Shoe Rack</option>
                            <option value="TV Stand">TV Stand</option>
                        </select>
                    </div>

                    {/* Size */}
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                        <input
                            type="text"
                            id="size"
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="e.g., Medium, Large, 6x4 ft"
                            onChange={(e) => setsize(e.target.value)}
                            value={size}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="e.g., 55.2"
                            onChange={(e) => setprice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="e.g., 100"
                            onChange={(e) => setstock(e.target.value)}
                            value={stock}
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            className="w-full p-3 mt-1 border rounded-lg"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 mt-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>

            {/* Notification */}
            {notification.message && (
                <div
                    className={`fixed top-5 right-5 p-3 rounded-md ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white transition-all transform duration-300 ease-in-out ${notification.message ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default Addproduct;
