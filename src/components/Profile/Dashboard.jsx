import { useState } from "react";
import ProfileArticle from "./ProfileArticles";
import { FiEdit2 } from "react-icons/fi";
import { getInitials, stringToColor } from "../../helpers/Helper";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../utils/Redux/userSlice";
import ConfirmationModal from "../Helpers/ConfirmationModal";



export default function Dashboard({user}) {
  const [isdelete, setIsdelete] = useState(false);
  const [isConfirm , setIsConfirm] = useState(false);
  const [taskNameToDelete, setTaskNameTodelete] = useState(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleEdit=()=>{
    console.log("hii");
    
  }

  


  return (
    <>
    <div className="flex flex-col md:flex-row justify-center items-start p-2 w-full md:space-x-16 ">
      <div className="p-2 min-h-screen  w-full sm:w-3/4 md:w-3/5 lg:w-7/12 xl:w-2/5">
        <div className="sticky top-0 pt-2 z-50 bg-white bg-opacity-100">
          <h1 className="text-xl font-handwrite p-2">Articles</h1>
          <hr className="border-t-2 border-dashed border-gray-300" />
        </div>

        <ProfileArticle
        setIsdelete={setIsdelete}
        setTaskNameTodelete={setTaskNameTodelete}
        isConfirm={isConfirm}
        
      />
      </div>
      <div className=" md:p-2  h-auto md:min-h-screen w-full  sm:w-2/2 md:w-2/5 lg:w-5/12 xl:w-1/3 space-y-8">
        <div className="flex flex-col md:sticky md:top-5 md:z-50 space-y-6 bg-white bg-opacity-100">
          <div className="flex  items-center">
            <div
              className="w-16 h-16 mr-3 flex items-center justify-center rounded-full "
              style={{
                backgroundColor: stringToColor("midhuna" || "Unknown"),
              }}
            >
              <span className="text-white text-3xl font-bold">
                {getInitials(user.name)}
              </span>
            </div>
            <div>
              <p className="text-3xl font-semibold text-gray-900">
                {user.name}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="font-semibold">Email:</label>
              <p>{user.email}</p>
            </div>

            <div>
              <label className="font-semibold">Mobile:</label>
              <p>{user.phone}</p>
            </div>

            <div className="flex items-center">
              <label className="font-semibold">Password:</label>
              <p className="ml-2">{"••••••••"}</p>

              <button
                className="ml-4 text-blue-500 hover:text-blue-700 focus:outline-none"
                aria-label="Edit password"
              >
                <FiEdit2 onClick={handleEdit}/>
              </button>
            </div>
            <div className="flex items-center">
              <button
                className="ml-2 flex items-center text-red-500 hover:text-red-700 focus:outline-none"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LuLogOut className="mr-1" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
 
      </div>
    </div>
      <ConfirmationModal
        isOpen={isdelete}
        onClose={() => setIsdelete(false)}
        onConfirm={()=>setIsConfirm(true)}
        title="Remove Article Confirmation"
        message={
          <span >
            Are you sure you want to delete{" "}
            <strong className="text-red-500">{taskNameToDelete}</strong> article?
          </span>
          
        }
        className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
      />
      </>
  );
}
