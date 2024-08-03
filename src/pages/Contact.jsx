import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createContact,
  deleteContact,
  isPopupOpen,
  updateContact, // Add an update action if you don't have one already
} from "../redux/contactSlice";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    status: "",
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const contacts = useSelector((state) => state.contact.contactData);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("contacts", contacts);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setContactData({
      first_name: "",
      last_name: "",
      status: "",
      id: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateContact(contactData));
    } else {
      const newContact = {
        ...contactData,
        id: Math.floor(Math.random() * 100000 + 1),
      };
      dispatch(createContact(newContact));
    }

    setContactData({
      first_name: "",
      last_name: "",
      status: "",
      id: null,
    });
    closeModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (data) => {
    setContactData(data);
    setIsEditing(true);
    openModal();
  };

  return (
    <>
      <div className="bg-white p-4 rounded-[20px] w-[90%] my-4 mx-auto h-auto">
        <button
          onClick={openModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Create New Contact
        </button>
        {contacts.length === 0 && (
          <div className="bg-white p-4 rounded-[20px] w-[90%] my-4 mx-auto h-auto">
            <h1 className="text-3xl font-bold text-center">
              No Contacts Found
            </h1>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isEditing ? "Edit Contact" : "Create New Contact"}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-1">
                    <div className="col-span-2">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type first name"
                        required
                        value={contactData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type last name"
                        required
                        value={contactData.last_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-1 sm:col-span-1">
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        required
                        value={contactData.status}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white flex items-center m-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {isEditing ? "Update Contact" : "Add new Contact"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-center rounded-[50%] bg-blue-300 p-[50px] w-40 m-auto text-[24px] font-bold text-white mb-3">
                {contact.first_name[0].toUpperCase() +
                  contact.last_name[0].toUpperCase()}
              </div>
              <h5 className="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">
                First Name : {contact.first_name}
              </h5>
              <h5 className="mb-2 text-[18px]  font-bold tracking-tight text-gray-900 dark:text-white">
                Last Name : {contact.last_name}
              </h5>
              <p
                className={`mb-2 text-[18px]  font-bold tracking-tight text-gray-900 dark:text-white `}
              >
                Status :{" "}
                <span
                  className={`${
                    contact.status === "active" ? "bg-green-200" : "bg-red-200"
                  } rounded-lg px-2 `}
                >
                  {contact.status}
                </span>
              </p>
              <button
                className="bg-green-800 text-white px-3 py-2 rounded-lg mr-5 hover:bg-green-500"
                onClick={() => handleEdit(contact)}
              >
                Edit
              </button>
              <button
                className="bg-red-700 text-white px-3 py-2 rounded-lg hover:bg-red-500"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contact;
