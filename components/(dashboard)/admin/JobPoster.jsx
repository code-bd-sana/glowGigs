'use client'
import { useGetAllJobPosterQuery, useUpdateStatusMutation } from "@/features/EmployeeApi";
import { useDeleteUserMutation } from "@/features/UserApi";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2'

export default function JobPoster() {
  const { data, isLoading, error, refetch } = useGetAllJobPosterQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [posterToEdit, setPosterToEdit] = useState(null);

  // Filter data based on search term and status
  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(poster => 
          poster.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          poster.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          poster.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          poster._id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter(poster => 
          poster.status?.toLowerCase() === statusFilter.toLowerCase()
        );
      }
      
      setFilteredData(filtered);
    }
  }, [data, searchTerm, statusFilter]);

  // Calculate pagination values
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
const [updateStatus, {isLoading:UpdateLoading, error:UpdateError} ]=   useUpdateStatusMutation();
const [deleteUser, {isLoading: deleteLoading, error:UpdateDeleteError} ]=   useDeleteUserMutation();

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle status filter change
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };


  const deleteUserHandle = async(id)=>{
    try {
     await deleteUser (id).unwrap()
     refetch()
  
        
        // You can also show a toast notification
        toast.success(`Poster  deleted successfully!`)
       
    } catch (error) {
      console.log(error, "--> THis is your error")
      toast.error(error?.data?.message)
    }
  }

  // Delete functionality with SweetAlert
  const handleDeleteClick = (poster) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${poster.fullName} from ${poster.companyName}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fff",
      color: "#333",
    }).then((result) => {
      if (result.isConfirmed) {
        // Log the ID to console
        console.log("Deleting poster with ID:", poster._id);
        console.log("Poster details:", poster);
        
        // Here you would typically call your delete API
        // await deletePoster(poster._id).unwrap();
        
        // Show success message
        deleteUserHandle (poster?._id)
       
      }
    });
  };

  // Edit functionality
  const handleEditClick = (poster) => {
    setPosterToEdit(poster);
    setShowEditModal(true);
  };

  const handleUpdateStatus =async() => {
    if (posterToEdit) {
      const newStatus = posterToEdit.status === "active" ? "suspended" : "active";
      const updatedPoster = {
        ...posterToEdit,
        status: newStatus
      };
      
      // Log to console
      console.log("Updating poster status:", {
        id: posterToEdit._id,
        currentStatus: posterToEdit.status,
        newStatus: newStatus,
        fullData: updatedPoster
      });

      const data = {
        id: posterToEdit._id,
        status:newStatus
      }
      

      await updateStatus(data).unwrap();
      // Here you would typically call your update API
      // await updatePosterStatus(posterToEdit._id, newStatus).unwrap();
      refetch()
      
      // Show success message
      toast.success(`Status updated to ${newStatus} for ${posterToEdit.fullName}!`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      setShowEditModal(false);
      setPosterToEdit(null);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setPosterToEdit(null);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg">Loading job posters...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-red-500">Error loading job posters</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <ToastContainer />
      
      {/* Edit Status Modal */}
      {showEditModal && posterToEdit && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Poster Status</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Update status for <strong>{posterToEdit.fullName}</strong> from{" "}
                <span className={`font-semibold ${
                  posterToEdit.status === "active" ? "text-green-600" : "text-red-600"
                }`}>
                  {posterToEdit.status}
                </span>{" "}
                to{" "}
                <span className={`font-semibold ${
                  posterToEdit.status === "active" ? "text-red-600" : "text-green-600"
                }`}>
                  {posterToEdit.status === "active" ? "suspended" : "active"}
                </span>
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Poster Details:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>ID:</div>
                  <div className="font-mono text-xs">{posterToEdit._id}</div>
                  
                  <div>Name:</div>
                  <div>{posterToEdit.fullName}</div>
                  
                  <div>Company:</div>
                  <div>{posterToEdit.companyName}</div>
                  
                  <div>Email:</div>
                  <div>{posterToEdit.email}</div>
                  
                  <div>Current Status:</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      posterToEdit.status === "active" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-red-100 text-red-600"
                    }`}>
                      {posterToEdit.status}
                    </span>
                  </div>
                  
                  <div>New Status:</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      posterToEdit.status === "active" 
                        ? "bg-red-100 text-red-600" 
                        : "bg-green-100 text-green-600"
                    }`}>
                      {posterToEdit.status === "active" ? "suspended" : "active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 text-sm font-medium text-white bg-[#2199E8] hover:bg-blue-700 rounded-md transition-colors"
              >
          {    UpdateLoading ? "Loading..." : "Update Status"  }
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h6 className="text-lg font-semibold">Manage Job Posters</h6>
        <Link
          href="/dashboard/create-job-post"
          className="bg-[#2199E8] cursor-pointer text-white text-sm px-4 py-2 rounded"
        >
          + Add New Poster
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center mb-4 gap-3">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, ID, email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 
              1.415-1.415l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 
              5 5 0 0 1 0 10z"
            />
          </svg>
        </div>
        <div className="flex gap-2 items-center">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-[#475569] font-medium ">
            <tr>
              <th className="py-3 px-4">Poster / Company</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Posted Jobs</th>
  
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((poster) => (
                <tr
                  key={poster._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-[#000000]">
                      {poster.fullName}
                    </div>
                    <div className="text-xs text-gray-500">{poster.companyName}</div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div>{poster.email}</div>
                    <div className="text-xs text-gray-500">{poster.phoneNumber}</div>
                  </td>
                  <td className="py-4 px-4 text-center">{poster.postedJob || 0}</td>
             
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      poster.plan === 'bronze' ? 'bg-amber-100 text-amber-600' :
                      poster.plan === 'free' ? 'bg-gray-100 text-gray-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {poster.plan || 'free'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        poster.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {poster.status || "active"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm space-x-2">
                    <Link href={`/dashboard/job-posters/${poster._id}`}>
                      <button className="text-[#EF4444] hover:underline">
                        Info
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleEditClick(poster)}
                      className="text-indigo-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(poster)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  No job posters found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-[#000000] gap-3">
        <span>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} posters
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>

          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1 rounded border ${
                currentPage === pageNumber
                  ? "bg-[#2199E8] text-white border-[#2199E8]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}