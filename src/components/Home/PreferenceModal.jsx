import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { preferenceapi } from "../../utils/api/api";
import { userAxiosInstance } from "../../utils/api/Interceptors";
import { toast, Slide, Flip } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../utils/Redux/userSlice";


const PreferenceModal = ({ showModal, setShowModal , selectedPreferences , setSelectedPreferences }) => {
  const dispatch = useDispatch();
  const [preferenceInput, setPreferenceInput] = useState("");
  const [loading, setLoading] = useState(false);
  const preferencesList = [
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

  const handleAddPreference = () => {
    if (preferenceInput ) {
      setSelectedPreferences([...selectedPreferences, preferenceInput]);
      setPreferenceInput("");
    }
  };

  const handleRemovePreference = (index) => {
    const updatedPreferences = selectedPreferences.filter(
      (_, i) => i !== index
    );
    setSelectedPreferences(updatedPreferences);
  };

  const savePreferences = async () => {
    setLoading(true);
    try {
      const response = await userAxiosInstance.post(preferenceapi, {
        preferences: selectedPreferences,
      });

      console.log(response.data);
      if (response.data && response.data.status === "success") {
        toast.success(response.data.status, {
          transition: Slide,
          autoClose: 1000,
        });
        console.log(response.data.user);
        
        dispatch(setUserInfo(response.data.user));
        setTimeout(() => {
          setLoading(false);
          setShowModal(false);
        },2000);
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 1000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8 w-11/12 max-w-2xl max-h-full space-y-10">
          <IoMdClose
              className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer "
              onClick={() => setShowModal(false)}
            />
            
            <h2 className="text-xl font-semibold text-center mb-4">
              Please Select Your Top 5 Preferences
            </h2>
            <div className="mb-4">
              <input
                type="text"
                value={preferenceInput}
                onChange={(e) => setPreferenceInput(e.target.value)}
                placeholder="Select a preference"
                className="w-full p-2 border rounded-lg mb-2 outline-none"
              />
              <button
                onClick={handleAddPreference}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                disabled={ !preferenceInput}
              >
                Add Preference
              </button>
            </div>
            <div className="flex flex-wrap gap-2 ">
              {selectedPreferences.map((preference, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-3 py-1 rounded-lg"
                >
                  <span>{preference}</span>
                  <IoMdClose
                    className="ml-2 cursor-pointer text-red-500"
                    onClick={() => handleRemovePreference(index)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 overflow-y-auto max-h-64">
              {preferencesList
                .filter((pref) => !selectedPreferences.includes(pref))
                .map((preference, index) => (
                  <button
                    key={index}
                    onClick={() => setPreferenceInput(preference)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    {preference}
                  </button>
                ))}
            </div>
            <button
              onClick={savePreferences}
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg"
                disabled={selectedPreferences.length < 5 || loading}
            >
                    {loading ? (
                    <div className="inline-flex items-center">
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-2 text-white animate-spin dark:text-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                      <span className="text-white text-sm ">Loading...</span>
                    </div>
                  ) : (
                    <span>Confirm Preferences</span>
                  )}
              
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PreferenceModal;
