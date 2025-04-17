import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  // http://localhost:7777/request/review/accepted/67fe7b800a189a093636880a
  const reviewReqest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res);

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="text-bold flex m-10 justify-center text-2xl">No Connection Request Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-black">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photo, about } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center m-4 p-4 rounded-xl bg-base-300 w-[40%] mx-auto"
          >
            <div>
              <img
                alt="photo"
                src={photo}
                className="h-22 w-22 mx-auto rounded-full mb-2"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">
                {firstName + " " + lastName}
              </h2>
              <p className="text-sm text-gray-600">{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewReqest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewReqest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

//accepted rejected
