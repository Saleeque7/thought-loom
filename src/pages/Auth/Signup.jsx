import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import signupImage from "../../assets/Login.jpg";
import logo from "../../assets/logo.png";
import { Transition } from "../../components/Helpers/Transition";
import { authAxios } from "../../utils/api/ApiUrl";
import { validateForm } from "../../helpers/formValidation";
import { registerApi } from "../../utils/api/api";
import { toast, Flip, Slide } from "react-toastify";
import { setUserInfo, setIsAuthenticated } from "../../utils/Redux/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    try {
      if (validateForm(formData, confirmPassword, setErrors)) {
        const response = await authAxios.post(registerApi, formData);
        const accessToken = response.data.accessToken;

        if (
          response.data &&
          response.data.status === "success" &&
          accessToken
        ) {
          toast.success("registration successfull", {
            transition: Slide,
            autoClose: 1000,
          });

          setTimeout(() => {
            setLoading(false);
            localStorage.setItem("accessTokenuserKey", accessToken);
            dispatch(setUserInfo(response.data.user));
            dispatch(setIsAuthenticated());
            navigate("/", { replace: true });
          }, 2000);
        }
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

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  return (
    <Transition>
      <div className="h-screen flex flex-col  md:flex-row  md:overflow-hidden">
        <div
          className="w-full md:w-2/5 h-full flex flex-col  p-32 text-white relative "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${signupImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute top-0 left-1 md:top-1 md:left-2">
            <img
              src={logo}
              alt="Company Logo"
              className="h-16 w-auto max-w-[200px] md:h-24 md:max-w-[250px] lg:h-24 lg:max-w-[250px] xl:h-24 xl:max-w-[220px]"
            />
          </div>
        </div>
        <div className="w-full lg:w-3/5  h-full flex items-center  md:justify-center bg-white p-2 md:p-8">
          <div className="flex flex-col justify-center pt-10 md:items-center w-full max-w-2xl min-h-screen">
            <div className="flex flex-col items-center space-y-2 mb-6 sm:mb-8 px-4 ">
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-800 text-center">
                Join Thought Loom
              </h2>
              <span className="text-sm sm:text-base font-handwrite text-center text-gray-600">
                Discover Stories You’ll Love. Share Yours with the World.
              </span>
              <span className="text-xs sm:text-sm text-gray-800 text-center">
                Already have an account?{" "}
                <Link
                  to="/auth/signin"
                  className="text-icons hover:text-gray-500 hover:underline"
                >
                  Sign in
                </Link>
              </span>
            </div>

            <form
              className="w-full p-4 md:p-10  space-y-4 md:space-y-6  "
              onSubmit={handleSubmit}
            >
              <div className="flex space-x-6">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full border  border-gray-300 rounded-md p-2"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  placeholder="Email Address"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  placeholder="Phone Number"
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {isPasswordVisible ? <HiEyeOff /> : <HiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  confirm Password
                </label>
                <div className="relative">
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    placeholder="confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {isConfirmPasswordVisible ? <HiEyeOff /> : <HiEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {isEmpty(errors) && (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md transition duration-300 hover:bg-black hover:border-2 hover:border-transparent hover:bg-gradient-to-r hover:from-black hover:via-gray-700 hover:to-black hover:border-gray-100"
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
                    "Join"
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Signup;
