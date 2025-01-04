import React ,{lazy , Suspense} from "react";
import {
  getInitials,
  stringToColor,
  dateFormatter,
} from "../../helpers/Helper";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
const Empty =  lazy(()=>import ("../Lottie/Empty"))

export default React.memo(function ArticleList({ articles, user }) {
  const navigate = useNavigate();
  const handleLike = (e) => {
    e.stopPropagation();
  };

  if (!articles || articles.length === 0) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-[50vh] flex flex-col items-center justify-center mx-auto my-8">
          <div className="mt-6">
            <Empty/>
          </div>
          <div className="text-center mt-10">
            <h2 className="text-xl font-semibold text-gray-700">
              No Articles Available
            </h2>
            <p className="text-gray-500">You can create your own article.</p>
            <div className="flex justify-center mt-4">
              <div
                className="flex items-center space-x-2 group hover:text-gray-900 cursor-pointer"
                onClick={() => navigate(user ? "/write" : "/auth/signup")}
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
    );
  }
  return (
    <div className="max-w-5xl mx-auto my-8 ">
      {articles.map(
        (article) =>
          article?.author?._id !== user?._id && (
            <React.Fragment key={article._id}>
              <div
                className="p-6 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-xl md:space-y-5"
                onClick={() =>
                  navigate(user ? `/article/${article._id}` : "/auth/signup")
                }
              >
                <div className="flex">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 mr-3 flex items-center justify-center rounded-full"
                      style={{
                        backgroundColor: stringToColor(
                          article?.author?.name || "Unknown"
                        ),
                      }}
                    >
                      <span className="text-white font-bold">
                        {getInitials(article?.author?.name)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {article?.author?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Published on {dateFormatter(article.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-bold font-heading mb-2 text-icons">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-md leading-relaxed font-customSans">
                      {article.overView.split(" ").length > 40
                        ? `${article.overView
                            .split(" ")
                            .slice(0, 40)
                            .join(" ")}...`
                        : article.overView}{" "}
                      {article.overView.split(" ").length > 40 && (
                        <Link
                          to={user ? `/article/${article._id}` : "/auth/signup"}
                        >
                          <button className="text-gray-100 hover:text-icons hover:underline ml-1">
                            more
                          </button>
                        </Link>
                      )}
                    </p>
                  </div>

                  <div className="w-32 h-32 md:w-48 md:h-32 overflow-hidden rounded-md shadow-sm">
                    <img
                      src={article?.image?.location}
                      alt="Article"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1"
                  >
                    <BiLike className="h-5 w-5 hover:text-blue-500 text-gray-500" />
                    <span className="text-sm">Like</span>
                  </button>

                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1"
                  >
                    <BiDislike className="h-5 w-5 hover:text-blue-500 text-gray-500" />
                    <span className="text-sm">Dislike</span>
                  </button>
                </div>
              </div>
              <hr className="my-4" />
            </React.Fragment>
          )
      )}
    </div>
  );
});
