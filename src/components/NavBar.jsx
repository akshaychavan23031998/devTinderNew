// navBar.jsx
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {

  const User = useSelector((store) => store.user)
  // console.log(User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const res = await axios.post(BASE_URL+"/logout", {}, {
        withCredentials: true
      });
      dispatch(removeUser());
      navigate("/login");
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/feed"} className="btn btn-ghost text-xl">Dev_Tinder 👩‍💻🚀</Link>
      </div>
      {User && <div className="flex gap-2 mx-5">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
              alt="User"
              src={User.photo}
            />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default NavBar;
