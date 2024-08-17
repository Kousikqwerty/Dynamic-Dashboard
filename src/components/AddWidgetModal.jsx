import React, { useState, useEffect } from "react";
import useStore from "../store/store";

const AddWidgetModal = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("CSPM");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { categories, addWidget, removeWidget } = useStore();
  const [widgetStates, setWidgetStates] = useState({});

  useEffect(() => {
    // Initialize widgetStates when selectedCategory changes
    setWidgetStates(
      categories[selectedCategory].widgets.reduce((acc, widget) => {
        acc[widget.id] = true; // Initialize all widgets as checked
        return acc;
      }, {})
    );
  }, [selectedCategory, categories]);

  const handleConfirm = () => {
    if (title) {
      const newWidget = {
        id: `${selectedCategory}-${title.toLowerCase().replace(/\s+/g, "-")}`,
        title,
        text,
      };
      addWidget(selectedCategory, newWidget);

      // After adding, update widgetStates to include the new widget
      setWidgetStates((prevState) => ({
        ...prevState,
        [newWidget.id]: true,
      }));
    }

    // Remove unchecked widgets
    Object.keys(widgetStates).forEach((widgetId) => {
      if (!widgetStates[widgetId]) {
        removeWidget(selectedCategory, widgetId);
      }
    });

    onClose();
  };

  const toggleWidgetCheck = (widgetId) => {
    setWidgetStates({
      ...widgetStates,
      [widgetId]: !widgetStates[widgetId],
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-900 text-white p-4">
          <h3 className="text-lg font-semibold">Add Widget</h3>
          <button
            onClick={onClose}
            className="text-2xl hover:text-gray-300 transition"
          >
            &times;
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-4">
          {["CSPM", "CWPP", "Image", "Ticket"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "border-b-4 border-blue-900 text-blue-900 font-semibold"
                  : "text-gray-600"
              } w-1/4 py-2 hover:text-blue-900 hover:font-semibold transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Widget Inputs */}
        <div className="p-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-900 transition"
            placeholder="Widget Title"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-900 transition"
            placeholder="Widget Text"
          />
        </div>

        {/* Existing Widgets in the Selected Category */}
        <div className="p-4">
          <h4 className="font-semibold mb-2">Existing Widgets:</h4>
          <div className="max-h-48 overflow-y-auto pr-2">
            {categories[selectedCategory].widgets.map((widget) => (
              <div key={widget.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={widgetStates[widget.id]} // Checkbox state
                  onChange={() => toggleWidgetCheck(widget.id)}
                  className="mr-2 h-4 w-4 text-blue-900 focus:ring-blue-500"
                />
                <span>{widget.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm and Cancel Buttons */}
        <div className="p-4 flex justify-end space-x-4 bg-gray-50">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 py-2 px-6 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-900 text-white py-2 px-6 rounded hover:bg-blue-800 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
