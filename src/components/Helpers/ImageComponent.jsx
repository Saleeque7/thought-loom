import React, { useState, useEffect } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";

export default function ImageUpload({ errors, image, setImage }) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image && typeof image === "object") {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(image);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };


  return (
    <div className="mb-6 relative">
      {!image && !imagePreview && (
        <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
          <FaCamera className="text-gray-500 text-2xl" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      )}
      {errors.image && <p className="text-red-500">{errors.image}</p>}
      {imagePreview && (
        <div className="relative inline-block max-w-2xl">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-0 bg-red-500 text-white p-1 rounded-full"
            style={{ transform: "translate(-50%, -0%)" }}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
}
