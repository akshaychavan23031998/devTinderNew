// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import {BASE_URL} from "../utils/constants";

// const Login = () => {
//   const [emailId, setEmailId] = useState("akshay@gmail.com");
//   const [password, setPassword] = useState("akshay15#OR");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(BASE_URL + "/login", {
//         emailId,
//         password,
//       }, {withCredentials: true});
//       console.log("Res from handleLogin ==>> ",res.data);
//       dispatch(addUser(res.data));
//       return navigate("/feed");
//     } catch (e) {
//       console.log("Login Failed", e);
//     }
//   };

//   return (
//     <div className="flex justify-center mt-[5%]">
//       <div className="card bg-base-300 w-96 shadow-sm">
//         <div className="card-body">
//           <h2 className="card-title flex justify-center">Login</h2>
//           <div>
//             <label className="input validator mt-3">
//               <svg
//                 className="h-[1em] opacity-50"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <g
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                   strokeWidth="2.5"
//                   fill="none"
//                   stroke="currentColor"
//                 >
//                   <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//                 </g>
//               </svg>
//               <input
//                 type="email"
//                 value={emailId}
//                 onChange={(e) => setEmailId(e.target.value)}
//                 placeholder="mail@site.com"
//                 required
//               />
//             </label>
//             <div className="validator-hint hidden">
//               Enter valid email address
//             </div>

//             <label className="input validator mt-5">
//               <svg
//                 className="h-[1em] opacity-50"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <g
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                   strokeWidth="2.5"
//                   fill="none"
//                   stroke="currentColor"
//                 >
//                   <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
//                   <circle
//                     cx="16.5"
//                     cy="7.5"
//                     r=".5"
//                     fill="currentColor"
//                   ></circle>
//                 </g>
//               </svg>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 minLength="8"
//                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//                 title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
//               />
//             </label>
//             <p className="validator-hint hidden">
//               Must be more than 8 characters, including
//               <br />
//               At least one number
//               <br />
//               At least one lowercase letter
//               <br />
//               At least one uppercase letter
//             </p>
//           </div>
//           <div className="card-actions justify-center mt-3">
//             <button className="btn btn-primary" onClick={handleLogin}>Login</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("akshay15#OR");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg(""); // Clear previous error

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.response && error.response.status === 401) {
        setErrorMsg(error.response.data);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center mt-[5%]">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>

          {/* Error message from API */}
          {errorMsg && (
            <div className="text-red-500 text-sm text-center mb-2">
              {errorMsg}
            </div>
          )}

          {/* Email Input */}
          <label className="input validator mt-3">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          {/* Password Input */}
          <label className="input validator mt-5">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must include number, lowercase & uppercase letter"
            />
          </label>
          <p className="validator-hint hidden text-xs mt-1">
            Must be more than 8 characters, including:
            <br />
            At least one number, one lowercase and one uppercase letter
          </p>

          {/* Button */}
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
