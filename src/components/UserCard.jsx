import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromfeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id} = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL+"/request/send/"+ status + "/" + _id, {}, 
        {withCredentials: true}
      );
      dispatch(removeUserFromfeed(_id));
    }
    catch(err) {
      console.error(err);
    }
  };


  if (!user) return null;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full h-64 overflow-hidden">
        <img
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full object-cover object-top"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <p><strong>about:</strong> {user.about}</p>
        <div className="card-actions flex justify-center mt-auto">
            <button className="btn btn-success" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
            <button className="btn btn-danger ml-2" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
