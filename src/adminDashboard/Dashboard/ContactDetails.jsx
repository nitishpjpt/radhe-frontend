import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]); // State to store contact details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(""); // State to handle errors
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [itemsPerPage] = useState(10); // Items per page

  // Fetch contact details from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/contact`
        );
        setContacts(response.data); // Set the fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching contact details:", error);
        setError("Failed to fetch contact details. Please try again later.");
        setLoading(false); // Set loading to false
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Display loading skeleton
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center bg-red-100 p-4 rounded-lg">
          <span className="text-red-600">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Contact Form Submissions Details
      </h1>

      {/* Search Bar */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Search by name, email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-2/6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Message
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Submitted At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((contact) => (
              <tr
                key={contact._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-gray-700">
                  {contact.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {contact.email}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {contact.message}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredContacts.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
