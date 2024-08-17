import React, { useState } from "react";
import { FaSyncAlt, FaEllipsisV, FaClock, FaChevronDown } from "react-icons/fa";
import useStore from "../store/store";
import AddWidgetModal from "./AddWidgetModal";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { categories, removeWidget } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const filterWidgets = (widgets) => {
    if (!searchQuery) return widgets;
    return widgets.filter(
      (widget) =>
        widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        widget.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">CNAPP Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={openModal}
              className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 shadow-lg hover:bg-blue-700 transition"
            >
              + Add Widget
            </button>
            <button className="flex items-center bg-gray-100 text-gray-600 rounded-lg p-2 shadow hover:bg-gray-200 transition">
              <FaSyncAlt />
            </button>
            <button className="flex items-center bg-gray-100 text-gray-600 rounded-lg p-2 shadow hover:bg-gray-200 transition">
              <FaEllipsisV />
            </button>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 shadow-lg font-semibold hover:bg-blue-700 transition"
              >
                <FaClock className="mr-2" />
                Last 2 days
                <FaChevronDown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul className="py-1">
                    <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                      Last 24 hours
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                      Last 7 days
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                      Last 30 days
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {Object.entries(categories).map(([key, category]) => {
          const widgetsWithPlaceholders = filterWidgets([...category.widgets]);
          while (widgetsWithPlaceholders.length < 3) {
            widgetsWithPlaceholders.push({
              id: `placeholder-${widgetsWithPlaceholders.length}`,
              title: "",
              text: "",
              isPlaceholder: true,
            });
          }

          return (
            <div key={key} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {widgetsWithPlaceholders.map((widget) =>
                  widget.isPlaceholder ? (
                    <button
                      key={widget.id}
                      onClick={openModal}
                      className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 bg-white shadow-sm hover:bg-gray-50 transition"
                    >
                      <div className="text-center text-gray-400 font-semibold">
                        + Add Widget
                      </div>
                    </button>
                  ) : (
                    <div
                      key={widget.id}
                      className="relative rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {widget.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{widget.text}</p>
                      <button
                        onClick={() => removeWidget(key, widget.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition"
                      >
                        &times;
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}

        {isModalOpen && <AddWidgetModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default Dashboard;
