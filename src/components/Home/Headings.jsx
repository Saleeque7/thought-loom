import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ArticleList from "./Artcles";
import { userAxiosInstance } from "../../utils/api/Interceptors";
import { getArticlesApi, exploreApi } from "../../utils/api/api";
import { userAxios } from "../../utils/api/ApiUrl";
import { useNavigate } from "react-router-dom";

export default function Headings({ user, modalOpen }) {
  const navigate  =  useNavigate()
  let preference = [];
  let axiosCall;
  let api;
  const landingPreference = [
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
  if (!user) {
    preference = landingPreference;
    axiosCall = userAxios;
    api = exploreApi;
  } else {
    preference = user?.articlePreference || [];
    axiosCall = userAxiosInstance;
    api = getArticlesApi;
  }

  const [active, setActive] = useState("For you");
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(6);
  const [articles, setArticles] = useState([]);
  const fixedItems = startIndex < 1 ? 2 : 1;

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 500) {
        setItemsToShow(3);
      } else if (window.innerWidth < 750) {
        setItemsToShow(4);
      } else if (window.innerWidth < 980) {
        setItemsToShow(5);
      } else {
        setItemsToShow(6);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  useEffect(() => {
    const fetchArtictles = async () => {
      try {
        const response = await axiosCall.get(`${api}?Head=${active}`);
        console.log(response.data.articles, "articles");

        if (response.data && response.data.status === "success") {
          setArticles(response.data.articles);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          console.log(" error message:", message);
          console.log("An unexpected error occurred.", error.response.data);
        }
      }
    };
    fetchArtictles();
  }, [active]);

  const handleNext = () => {
    if (startIndex + itemsToShow - fixedItems < preference.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <div className=" pt-5 flex justify-center w-full overflow-hidden  sticky top-0 bg-white z-50">
        <div className="flex items-center space-x-0 md:space-x-4 max-w-screen-lg">
          <div
            className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
              startIndex === 0 && "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => (user ? handlePrev() : navigate("/auth/signup"))}
          >
            <IoIosArrowBack />
          </div>

          <div className="flex flex-row items-center space-x-4 truncate sm:space-x-20 md:space-x-16 overflow-hidden mx-5 w-auto md:min-w-[300px] lg:min-w-[950px]">
            {startIndex < 1 && (
              <>
                {user && (
                  <div className="cursor-pointer text-gray-700 hover:bg-gray-200 rounded-full p-1">
                    <FaPlus onClick={modalOpen} />
                  </div>
                )}

                <div
                  className={`cursor-pointer text-gray-500 ${
                    active === "For you" ? "border-b-2 border-black" : ""
                  }`}
                  onClick={() => setActive("For you")}
                >
                  <span
                    className={`${
                      active === "For you" ? "text-icons font-semibold" : ""
                    }`}
                  >
                    For you
                  </span>
                </div>
              </>
            )}

            {preference
              .slice(startIndex, startIndex + itemsToShow - fixedItems)
              .map((item, index) => (
                <div
                  key={index}
                  className={`flex content-center text-gray-500 cursor-pointer ${
                    active === item ? "border-b-2 border-black" : ""
                  }`}
                  onClick={() =>
                    user ? setActive(item) : navigate("/auth/signup")
                  }
                >
                  <span
                    className={`${
                      active === item ? "text-icons font-semibold" : ""
                    }`}
                  >
                    {item}
                  </span>
                </div>
              ))}
          </div>

          <div
            className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
              startIndex + itemsToShow - fixedItems >= preference.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => (user ? handleNext() : navigate("/auth/signup"))}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>

      <div className="min-h-screen ">
        <ArticleList articles={articles} user={user} />
      </div>

      <style>{`
  /* Responsive adjustments */


  /* Scrollbar hiding for smoother appearance */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Screen-specific adjustments */
  @media (max-width: 640px) {
    .space-x-8 {
      gap: 1rem;
    }
  }
`}</style>
    </>
  );
}
