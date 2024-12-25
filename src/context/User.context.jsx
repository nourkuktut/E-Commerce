import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
  }

  // async function forgotPassword({ email }) {
  //   const loadingToastId = toast.loading(
  //     <div className="flex items-center">
  //       <svg
  //         className="animate-spin h-5 w-5 text-primary-500 mr-3"
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="none"
  //         viewBox="0 0 24 24"
  //       >
  //         <circle
  //           className="opacity-25"
  //           cx="12"
  //           cy="12"
  //           r="10"
  //           stroke="currentColor"
  //           strokeWidth="4"
  //         ></circle>
  //         <path
  //           className="opacity-75"
  //           fill="currentColor"
  //           d="M4 12a8 8 0 018-8v8H4z"
  //         ></path>
  //       </svg>
  //       <span> please wait...</span>
  //     </div>
  //   );

  //   try {
  //     const options = {
  //       url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
  //       method: "POST",
  //       headers: {
  //         token,
  //       },
  //       data: {
  //         email,
  //       },
  //     };

  //     let { data } = await axios.request(options);
  //     console.log(data);
  //     if (data.status == "success") {
  //       toast.success(
  //         <div className="flex items-center">
  //           <div>
  //             <p className="text-lg font-bold">🎉success!</p>
  //             {/* <p className="text-sm">
  //               Email .
  //             </p> */}
  //           </div>
  //         </div>,
  //         {
  //           position: "bottom-right",
  //           autoClose: 4000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     toast.error("error");
  //     console.log(error);
  //   } finally {
  //     toast.dismiss(loadingToastId);
  //   }
  // }

  return (
    <UserContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
