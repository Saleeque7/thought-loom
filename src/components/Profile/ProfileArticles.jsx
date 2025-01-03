import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { getArticlesApi, deleteArticleApi } from "../../utils/api/api";
import { userAxiosInstance } from "../../utils/api/Interceptors";
import { dateFormatter } from "../../helpers/Helper";
import { MdDeleteOutline } from "react-icons/md";
import { toast, Slide } from "react-toastify";
import { FaEdit } from "react-icons/fa";
const Empty = React.lazy(() => import("../Lottie/Empty"));

export default function ProfileArticle({
  setIsdelete,
  setTaskNameTodelete,
  isConfirm,
}) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [idToDelete, setIdTodelete] = useState(null);

  useEffect(() => {
    const fetchArtictles = async () => {
      try {
        const response = await userAxiosInstance.get(
          `${getArticlesApi}?Head=my_articles`
        );
        console.log(response.data.articles, "articles");

        if (response.data && response.data.status === "success") {
          setArticles(response.data.articles);
        }
      } catch (error) {
        console.error(error, "error in submitting form");
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          console.log(" error message:", message);
          console.log("An unexpected error occurred.", error.response.data);
        }
      }
    };
    fetchArtictles();
  }, []);

  useEffect(() => {
    const deleteArticles = async () => {
      try {
        const res = await userAxiosInstance.delete(
          `${deleteArticleApi}/${idToDelete}`
        );
        if (res.data) {
          toast.success("success", {
            transition: Slide,
            autoClose: 1000,
          });
          setArticles((prevArticles) =>
            prevArticles.filter((article) => article._id !== idToDelete)
          );
          setIsdelete(false);
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };
    if (isConfirm) {
      deleteArticles();
    }
  }, [isConfirm]);

  const handleDelete = (id, name) => {
    setIsdelete(true);
    setIdTodelete(id);
    setTaskNameTodelete(name);
  };

  return (
    <>
      {!articles || articles.length === 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className=" flex flex-col items-center justify-center mx-auto">
            <div className="mt-6">
              <Empty />
            </div>
            <div className="text-center mt-10">
              <h2 className="text-xl font-semibold text-gray-700">
                No Articles Available
              </h2>
              <p className="text-gray-500">You can create your own article.</p>
              <div className="flex justify-center mt-4">
                <div
                  className="flex items-center space-x-2 group hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate( "/write" )}
                >
                  <FaEdit
                    size={22}
                    className="text-gray-500 group-hover:text-icons"
                  />
                  <span className="text-gray-500 group-hover:text-icons">
                    Write
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      ) : (
        <div className="max-w-5xl mx-auto my-8 cursor-pointer ">
          {articles.map((article) => (
            <React.Fragment key={article._id}>
              <div
                className="p-6 text-gray-800 relative"
                onClick={() => navigate(`/article/${article._id}`)}
              >
                <div className="flex">
                  <div className="flex items-center">
                    <div>
                      <p className="text-xs text-gray-500">
                        {" "}
                        Published on {dateFormatter(article.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    <div className="mt-4">
                      <h2 className="text-xl font-bold font-heading mb-2 mr-2 text-icons">
                        {article.title}
                      </h2>
                      <div className="text-gray-500 text-sm md:text-md leading-relaxed font-customSans">
                        {article.overView.split(" ").length > 10
                          ? `${article.overView
                              .split(" ")
                              .slice(0, 10)
                              .join(" ")}...`
                          : article.overView}{" "}
                        {article.overView.split(" ").length > 10 && (
                          <Link to={`/article/${article._id}`}>
                            <button className="text-gray-100 hover:text-icons hover:underline ml-1">
                              more
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-16 h-16 md:w-24 md:h-24 mt-6 md:mt-0 overflow-hidden rounded-md shadow-sm">
                      <img
                        src={article?.image?.location}
                        alt="Article"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 flex space-x-4">
                <div
                  onClick={() => navigate(`/edit-article/${article._id}`)}
                  className="flex items-center justify-center cursor-pointer"
                >
                  <CiEdit className="text-gray-500 hover:text-icons" />
                </div>
                <div
                  onClick={() => handleDelete(article._id, article.title)}
                  className="flex items-center justify-center cursor-pointer"
                >
                  <MdDeleteOutline className="text-gray-500 hover:text-icons" />
                </div>
              </div>

              <hr className="my-4" />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}
