import React, { useState, useContext } from 'react';
import Cookies from "js-cookie";
import { active } from '../Context/context';
import { useNavigate } from 'react-router-dom';

const Editproduct = ({ editproduct, seteditproduct }) => {
    const navigate = useNavigate();
    //const {seteditproduct,editproduct} = useContext(active);
    const [productname, setproductname] = useState(editproduct.name);
    const [price, setprice] = useState(editproduct.price);
    const [description, setdescription] = useState(editproduct.description);
    const [category, setcategory] = useState(editproduct.category);
    const [img, setimg] = useState(editproduct.img);
    const [stock, setstock] = useState(editproduct.stock);
    const [size, setsize] = useState(editproduct.size);
    const [id, setid] = useState(editproduct._id);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setimg(reader.result); // Set the Base64 string
            reader.readAsDataURL(file);
        }
    };

    const Editproduct = async (e) => {
        e.preventDefault();
        const productData = {};
        if (editproduct.name !== productname) productData.name = productname;
        if (editproduct.price !== parseFloat(price)) productData.price = parseFloat(price);
        if (editproduct.description !== description) productData.description = description;
        if (editproduct.category !== category) productData.category = category;
        if (editproduct.img !== img) productData.img = img; // Assuming Base64 string comparison
        if (editproduct.stock !== stock) productData.stock = stock;
        if (editproduct.size !== size) productData.size = size;
        productData.id = id
        console.log(editproduct.price, '  ', price);
        console.log(productData);
        const token = Cookies.get('token');
        await fetch('https://backend-onlineshoppingwebsite-mern-stack.onrender.com/product/seller/editproduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'product is updated') {
                    // Reset form fields after success]
                    // Show success notification
                    setNotification({ message: 'Product is updated', type: 'success' });

                    // Hide notification after 3 seconds
                    setTimeout(() => {
                        setNotification({ message: '', type: '' })
                        navigate('/myproduct');
                    }, 3000);
                } else {
                    // Show failure notification
                    setNotification({ message: data.msg, type: 'error' });

                    // Hide notification after 3 seconds
                    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
                }
            })
            .catch(console.error);
    };

    const handleClose = () => {
        // You can add your custom close logic here, for example, going back to the home page or closing a modal
        navigate('/myproduct');
    };

    return (
        <div className="flex justify-center min-h-screen relative">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-transparent border-2 border-black text-black p-2 rounded-full w-8 h-8 flex justify-center items-center hover:bg-slate-300 hover:text-gray-800 transition-all ease-in-out duration-200 transform hover:scale-105"
            >
                <span className="text-2xl font-semibold">&times;</span> {/* The close '×' symbol */}
            </button>
            <div className="w-[800px] p-10 my-10 bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
                <form onSubmit={Editproduct} className="space-y-4">
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
                            value={price}
                            onChange={(e) => setprice(e.target.value)}
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
                            value={stock}
                            onChange={(e) => setstock(e.target.value)}
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
                            //value={editproduct.img}
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 mt-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                        >
                            Edit Product
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

export default Editproduct;
