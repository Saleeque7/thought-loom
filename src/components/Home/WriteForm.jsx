import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import DropdownComponent from "../Helpers/Dropdown";
import ImageUpload from "../Helpers/ImageComponent";
import { AiTwotoneSmile } from "react-icons/ai";
import { validateArticle } from "../../helpers/formValidation";
import {
  userAxiosInstance,
  userformAxiosInstance,
} from "../../utils/api/Interceptors";
import {
  createArticleApi,
  getArticlesApi,
  editarticleByIdApi,
} from "../../utils/api/api";
import { Slide, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default React.memo(function WriteForm({ isWrite, form, user }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { title, subTitle, content, image };
    if (!validateArticle(formData, setErrors)) return;

    setLoading(true);
    const data = new FormData();
    data.append("title", title);
    data.append("subTitle", subTitle);
    data.append("content", content);
    if (image && typeof image !== "string") data.append("file", image);

    const apiUrl = id ? `${editarticleByIdApi}/${id}` : createArticleApi;
    const apiMethod = id ? "put" : "post";

    try {
      const res = await userformAxiosInstance[apiMethod](apiUrl, data);
      if (res.data && res.data.status === "success") {
        toast.success(
          id ? "Article updated successfully" : "Article created successfully",
          {
            transition: Slide,
            autoClose: 1000,
          }
        );
        clearForm();
        setTimeout(() => navigate(id ? "/profile" : "/"), 2000);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setSubTitle("");
    setContent("");
    setImage(null);
    setErrors({});
  };

  const handleApiError = (error) => {
    console.error(error, "error in submitting form");
    if (error.response?.data?.message) {
      toast.error(error.response.data.message, {
        transition: Flip,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        const res = await userAxiosInstance.get(`${getArticlesApi}/${id}`);
        if (res.data?.status === "success") {
          const article = res.data.articles[0];
          setTitle(article.title);
          setSubTitle(article.subTitle);
          setContent(article.overView);
          setImage(article.image.location);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) fetchArticleById();
  }, [id]);

  return (
    <>
      <div className="min-h-screen">
        <div className="sticky top-0 z-50 shadow-sm">
          <Header page={form} user={user} />
        </div>
        <div className="flex flex-col items-center justify-center p-6 space-y-2">
          <div className="flex items-center space-x-4">
            <AiTwotoneSmile className="text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-handwrite font-semibold text-gray-700">
              {!isWrite ? "Edit Your Story..." : "Start Your Story..."}
            </h1>
          </div>
          <p className="text-gray-500 mt-2 text-center">
            {!isWrite
              ? "Make changes to your article and update it."
              : "Share your thoughts, ideas, and creativity with the world!"}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center p-6">
          <div className="bg-white rounded-lg w-full md:w-3/4 lg:w-2/3 p-6 min-h-screen">
            <form className="space-y-10" onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Title of your article"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-b-2 border-gray-300 px-4 py-2 text-2xl font-handwrite focus:outline-none"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              <DropdownComponent
                errors={errors}
                subTitle={subTitle}
                setSubTitle={setSubTitle}
              />

              {/* <div className="mb-6">
                <div className="rounded-lg border border-gray-300 shadow-md">
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "blockQuote",
                        "insertTable",
                        "imageUpload",
                        "mediaEmbed",
                        "|",
                        "undo",
                        "redo",
                      ],
                      heading: {
                        options: [
                          {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                          },
                          {
                            model: "heading1",
                            view: "h1",
                            title: "Heading 1",
                            class: "ck-heading_heading1",
                          },
                          {
                            model: "heading2",
                            view: "h2",
                            title: "Heading 2",
                            class: "ck-heading_heading2",
                          },
                          {
                            model: "heading3",
                            view: "h3",
                            title: "Heading 3",
                            class: "ck-heading_heading3",
                          },
                        ],
                      },
                      image: {
                        toolbar: [
                          "imageTextAlternative",
                          "imageStyle:full",
                          "imageStyle:side",
                        ],
                      },
                      simpleUpload: {
                        uploadUrl: "/api/upload-image", // Adjust with your actual API
                        headers: {
                          Authorization: "Bearer <your-token>", // Adjust with your actual token if required
                        },
                      },
                    }}
                  />
                </div>
                {errors.content && (
                  <p className="text-red-500 mt-2">{errors.content}</p>
                )}
              </div> */}
              <div className="mb-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your article..."
                  className="w-full h-72 border border-gray-300 p-4 rounded-md font-handwrite resize-none focus:outline-none"
                />
                {errors.content && (
                  <p className="text-red-500">{errors.content}</p>
                )}
              </div>

              <ImageUpload errors={errors} image={image} setImage={setImage} />
              <div className="flex justify-center md:justify-end items-center">
                <button
                  type="submit"
                  className="bg-green-400 text-white  py-2 w-full  rounded-md"
                  disabled={loading}
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
                    <span>{!isWrite ? "Update Article" : "Publish"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
})
