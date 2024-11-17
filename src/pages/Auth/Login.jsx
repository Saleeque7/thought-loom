import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/Login.jpg";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Helpers/Transition";
import { validateLogin } from "../../helpers/formValidation";
import { authAxios } from "../../utils/api/ApiUrl";
import { loginApi } from "../../utils/api/api";
import { useDispatch } from "react-redux";
import { setUserInfo, setIsAuthenticated } from "../../utils/Redux/userSlice";
import { toast, Slide, Flip } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const formdata = { email, password };
    try {
      if (validateLogin(formdata, setErrors)) {
        setLoading(true);
        const response = await authAxios.post(loginApi, formdata);
        const accessToken = response.data.accessToken;

        if (response.data && response.data.status === "success") {
          toast.success("login successfull", {
            transition: Slide,
            autoClose: 1000,
          });
          setTimeout(() => {
            setLoading(false);
            localStorage.setItem("accessTokenuserKey", accessToken);
            dispatch(setUserInfo(response.data.user));
            dispatch(setIsAuthenticated());
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        setLoading(false);
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 1000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  return (
    <Transition>
      <div className="login min-h-screen grid items-center justify-center px-5 py-3">
        <div className="card flex flex-col md:flex-row border-gray-300 border-solid border-2 rounded-xl overflow-hidden w-full max-w-2xl h-10/12 md:h-/7 ">
          <div
            className="left flex-1 p-16 flex-col space-y-12 flex gap-7 text-white"
            style={{
              backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${LoginImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="space-y-4">
              <h1 className=" text-md sm:text-2xl font-bold font-handwrite">
                THOUGHT LOOM
              </h1>
              <p className="  font-handwrite ">
                Welcome to Thought Loom where ideas weave into stories and
                knowledge shapes perspectives.
              </p>
            </div>
            <div className="text-xs text-center   border rounded-lg p-2 bg-signUpBg">
              <span className="font-handwrite">Don't have an account? </span>
              <Link
                to="/auth/signup"
                className="hover:text-signUpbtn  underline text-black"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-7 p-12">
            <h1 className="text-3xl text-gray-700 mb-2 mt-3 font-serif text-center">
              Login
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                className="border-b border-gray-300 px-5 py-3"
                style={{ marginBottom: "5px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className="border-b border-gray-300 px-5 py-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <div className="flex justify-end items-center">
                {/* <Link to="/forgot-password?access=true">
              <span className="flex text-xs text-gray-500 justify-end">
                Forgot Password?
              </span>
            </Link> */}
                <button
                  className="w-1/2 px-4 py-2 bg-signinbtn font-bold cursor-pointer rounded-lg"
                  type="submit"
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
                    <span className="text-white">Login</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Login;
