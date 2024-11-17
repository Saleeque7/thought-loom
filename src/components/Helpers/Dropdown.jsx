import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";

const DropdownComponent = ({ errors, subTitle, setSubTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const preference = [
    "Movies Insights",
    "Sports Insights",
    "Exploring the Universe",
    "Political Perspectives",
    "Tech Innovations",
    "Financial Literacy",
    "Mental Wellness",
    "Personal Development",
    "Sustainable Living",
    "Cultural Experiences",
    "Online Learning",
    "Entrepreneurship",
    "Creative Arts",
    "Health & Nutrition",
  ];

  const filteredPreference = subTitle
    ? preference.filter((item) =>
        item.toLowerCase().includes(subTitle.toLowerCase())
      )
    : preference;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSubTitle(value);
      setIsOpen(true);
    }
  };

  const handleSelect = (item) => {
    setSubTitle(item);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSubTitle("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex items-center border-b-2 border-gray-300"
      >
        <input
          type="text"
          placeholder="Subtitle of your article"
          value={subTitle}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-full px-4 py-2 text-lg font-handwrite focus:outline-none"
        />

        {subTitle && (
          <IoMdClose
            size={20}
            className="text-gray-500 cursor-pointer mr-2"
            onClick={handleClear}
          />
        )}
        
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-gray-500"
        >
          {isOpen ? (
            <IoMdArrowDropup size={24} />
          ) : (
            <IoMdArrowDropdown size={24} />
          )}
        </div>
      </motion.div>
      {errors.subTitle && <p className="text-red-500">{errors.subTitle}</p>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bg-white border border-gray-200 shadow-lg rounded-md mt-1 w-full z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPreference.length > 0 ? (
              filteredPreference.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => handleSelect(item)}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No matches found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownComponent;
