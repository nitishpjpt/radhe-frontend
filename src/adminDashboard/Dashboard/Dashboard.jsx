// import React, { useState } from "react";
// import { FaHome, FaBox, FaTags, FaChartBar, FaUsers, FaCog, FaBell, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const Dashboard = () => {
//   const [products, setProducts] = useState([
//     { id: 1, title: "Wireless Charger", price: "$50", description: "Fast charging pad for all devices." },
//     { id: 2, title: "Gaming Mouse", price: "$30", description: "High precision gaming mouse with RGB lights." },
//     { id: 3, title: "Mechanical Keyboard", price: "$80", description: "RGB mechanical keyboard with blue switches." },
//   ]);

//   const handleDelete = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   const handleEdit = (id) => {
//     alert(`Edit product with ID: ${id}`);
//   };

//   const handleAddProduct = () => {
//     const newProduct = { id: Date.now(), title: "New Product", price: "$100", description: "New product description." };
//     setProducts([...products, newProduct]);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-100 p-5 shadow-md">
//         <h2 className="text-xl font-bold text-gray-700 mb-5">Dashboard</h2>
//         <ul className="space-y-2">
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaHome />
//             <span>Dashboard</span>
//           </li>
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaBox />
//             <span>Products</span>
//           </li>
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaTags />
//             <span>Categories</span>
//           </li>
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaChartBar />
//             <span>Sales</span>
//           </li>
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaUsers />
//             <span>Customers</span>
//           </li>
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaBell />
//             <span>Notifications</span>
//           </li>
//           <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer">
//             <FaCog />
//             <span>Settings</span>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-50">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-2xl font-semibold">Product Management</h2>
//           <button
//             className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             onClick={handleAddProduct}
//           >
//             <FaPlus />
//             <span>Add Product</span>
//           </button>
//         </div>

//         {/* Product List */}
//         <div className="bg-white p-4 rounded-md shadow-md">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2 text-left">Title</th>
//                 <th className="p-2 text-left">Price</th>
//                 <th className="p-2 text-left">Description</th>
//                 <th className="p-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id} className="border-b">
//                   <td className="p-2">{product.title}</td>
//                   <td className="p-2">{product.price}</td>
//                   <td className="p-2">{product.description}</td>
//                   <td className="p-2 flex justify-center space-x-3">
//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
//                       onClick={() => handleEdit(product.id)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                       onClick={() => handleDelete(product.id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
