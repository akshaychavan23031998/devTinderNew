import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-bold text-2xl">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-black">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photo, about } = connection;

        return (
          <div
            key={connection._id}
            className="flex m-4 p-4 rounded-xl bg-base-300 w-[40%] mx-auto"
          >
            <div>
              <img
                alt="photo"
                src={photo}
                className="h-22 w-22 mx-auto rounded-full mb-2"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">{firstName + " " + lastName}</h2>
              <p className="text-sm text-gray-600">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
